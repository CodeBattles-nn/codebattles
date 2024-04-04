import json
import string

import psycopg2
from flask import request, abort
from psycopg2.extras import RealDictCursor

from app import app
from database import get_connection
from decorators import redis_conn
from web import JSON_MIMETYPE


@app.route("/api/teacher/champs/<champ_id>/stats")
@redis_conn
def get_stats_teacher_api(champ_id, r):
    redis_cache = r.get(f"r-champ-{champ_id}-stats")
    if redis_cache is not None:
        response = app.response_class(
            response=redis_cache,
            status=200,
            mimetype=JSON_MIMETYPE
        )
        print("redis")
        return response

    connection = get_connection()
    cur = connection.cursor()

    cur.execute("SELECT * FROM champs WHERE id = %s", (str(champ_id),))

    fetch = cur.fetchone()  # Can be None
    problems_ids_temp = fetch[3:]
    problems_counts = 0

    for i in problems_ids_temp:
        if i is not None:
            problems_counts += 1
        else:
            break

    strs = string.ascii_uppercase

    print(problems_counts)

    cur.execute(f"""
        SELECT u.*, MAX(s.send_time) AS send_time
        FROM champusers_{champ_id} u
        LEFT JOIN champsends_{champ_id} s ON u.id = s.user_id
        GROUP BY u.id
        ORDER BY score DESC, send_time ASC;
    """)

    fetch = cur.fetchall()  # Can be None

    users = []

    for i, usr in enumerate(fetch):
        user_id = usr[0]
        score = usr[15]
        last_send = usr[16]
        last_send = None if last_send is None else last_send.strftime("%m/%d/%Y, %H:%M:%S")

        nickname = usr[3]
        problems_score = usr[4:problems_counts + 4]

        # problems_score = list(map(lambda s: (s, "")[s is None], problems_score))

        users.append(
            {
                'position': i + 1,
                'name': nickname,
                'user_id': user_id,
                'score': score,
                'problems_score': problems_score,
                'last_send': last_send
            }
        )

        print()

    resp_string = dict(success=True, cols=strs[:problems_counts], users=users)

    r.set(f"r-champ-{champ_id}-stats", json.dumps(resp_string))
    return resp_string


@app.route("/api/teacher/champs/<champ_id>/stats/search")
def get_stats_teacher_api_get_by_task_and_user(champ_id):
    args = request.args
    user_id, problem_letter = args["user_id"], args["problem"]

    conn = get_connection()
    cursor = conn.cursor(cursor_factory=RealDictCursor)

    try:
        cursor.execute(f"""
           SELECT *
        FROM champsends_{champ_id}
        WHERE problem_letter = '{problem_letter}'
          AND user_id = {user_id}
        ORDER BY score DESC, send_time DESC
        LIMIT 1
    
        """, (problem_letter))
    except psycopg2.errors.UndefinedTable:
        abort(404)

    res = cursor.fetchone()

    if res is None:
        abort(404)

    tests = []
    result = []
    try:
        result = json.loads(res["description"])
    except TypeError:
        pass

    for i, test in enumerate(result):
        message = test['msg']
        out = test['out']

        if message == "WRONG_ANSWER":
            out = """ВЫВОД СКРЫТ"""

        to_add = {'id': i + 1, 'time': test['time'], 'msg': message, 'out': out}
        tests.append(to_add)

    return {**{"tests": tests}, **res}
