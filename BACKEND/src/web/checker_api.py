import json
import string
import datetime

import requests as requests
from flask import redirect

from app import *
from database import get_connection
from decorators import login_required, get_user_id, redis_conn
import env


@app.route("/send", methods=['POST'])
@login_required
@get_user_id
def send_prog(user_id, uid):
    connection = get_connection()
    cur = connection.cursor()

    cur.execute("SELECT * FROM champs WHERE id = %s", (str(user_id),))

    fetch = cur.fetchone()  # Can be None
    problems_ids_temp = fetch[3:]
    problems_ids = []

    sql = "SELECT * FROM problems WHERE id = -1 "

    strs = string.ascii_uppercase

    for i in problems_ids_temp:
        if i is not None:
            problems_ids.append(i)
            sql += "OR id = %s "

    cur.execute(sql, tuple(problems_ids))

    x = list(cur.fetchall())

    problem_ = None
    problem_letter_form = request.form['problem']

    for i in x:
        id = i[0]
        problem_letter = strs[problems_ids.index(id)]
        if problem_letter_form == problem_letter:
            problem_ = i

    tests = problem_[5]
    tests = json.loads(tests)
    tests = list(map(lambda z: {"in": z[0], "out": z[1]}, tests))

    print(problem_)

    f_lang = request.form['cars']
    f_code = request.form['src']

    cur.execute(
        f'''
        INSERT INTO champSends_{user_id}
        (problem_name, problem_id, user_id, send_time, state, program, problem_letter, lang)
        VALUES(%s, %s, %s, %s, %s, %s, %s, %s); 
        ''',
        (
            problem_[1], problem_[0], uid, datetime.datetime.now(), "Тестируется", f_code,
            problem_letter_form,
            f_lang)
    )
    cur.execute(f"SELECT currval(pg_get_serial_sequence('champSends_{user_id}','id'));")

    inserted_id = cur.fetchone()[0]

    meta = {
        "champ_id": user_id,
        "user_id": uid,
        "problem": request.form['problem'],
        "id": inserted_id,
    }

    data = {
        "meta": json.dumps(meta),
        "source": request.form['src'],
        "compiler": request.form['cars'],
        "tests": tests,
    }

    connection.commit()

    print(cur.fetchone())

    cur.execute(f"SELECT address FROM servers WHERE id = {request.form['cars']}")

    server_addr = cur.fetchone()[0]

    print()

    requests.post(f"http://{server_addr}:{env.CHECKER_PORT}/api/v1/test", json=data)
    return redirect("/sends")


@app.route("/api/check_system_callback", methods=['POST'])
@redis_conn
def check_system(r):
    data = request.json
    print(data)
    all_count = 0
    correct_count = 0
    for results in data['results']:
        all_count += 1
        if results['success']:
            correct_count += 1

    meta = json.loads(data['meta'])

    print(round((correct_count / all_count) * 100))

    champ_id = meta['champ_id']
    user_id = meta["user_id"]

    con = get_connection()
    cur = con.cursor()

    points = (round((correct_count / all_count) * 100))

    cur.execute(
        f"UPDATE champUsers_{champ_id} SET {meta['problem'][0]} = {points} \
        WHERE id = {user_id} AND ({meta['problem'][0]} < {points} OR {meta['problem'][0]} IS NULL)")

    result_str = json.dumps(data['results'], indent=2)

    print(result_str)

    cur.execute(
        f"UPDATE champSends_{champ_id} SET score = %s,state = 'Протестировано', description = %s  WHERE id = %s;",
        (round((correct_count / all_count) * 100), result_str, meta['id']))

    con.commit()

    r.delete(f"r-champ-{champ_id}-stats", f"r-champ-{champ_id}-sends-user-{user_id}")

    return "OK"
