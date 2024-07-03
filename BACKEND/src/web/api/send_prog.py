import datetime
import json
import string

import requests

import env
from app import app
from database import get_connection
from decorators import get_user_id, api_login_required
from decorators.validation import json_validate
from web.validation_form.api import SendProgramForm


@app.route("/api/send", methods=['POST'])
@api_login_required
@get_user_id
@json_validate(SendProgramForm)
def api_send_prog(user_id, uid, data: SendProgramForm):
    connection = get_connection()
    cur = connection.cursor()

    f_lang = data.cars.data
    f_code = data.src.data
    problem_letter_form = data.problem.data

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

    for i in x:
        _id = i[0]
        problem_letter = strs[problems_ids.index(_id)]
        if problem_letter_form == problem_letter:
            problem_ = i

    tests = problem_[5]
    tests = json.loads(tests)
    tests = list(map(lambda z: {"in": z[0], "out": z[1]}, tests))

    print(problem_)

    cur.execute(
        f'''
        INSERT INTO champSends_{user_id}
        (problem_name, problem_id, user_id, send_time, state, program, problem_letter, lang)
        VALUES(%s, %s, %s, %s, %s, %s, %s, %s);
        ''',
        (
            problem_[1], problem_[0], uid, datetime.datetime.now(),
            "Тестируется", f_code,
            problem_letter_form,
            f_lang)
    )
    cur.execute(
        f"SELECT currval(pg_get_serial_sequence('champSends_{user_id}','id'));")

    inserted_id = cur.fetchone()[0]

    meta = {
        "champ_id": user_id,
        "user_id": uid,
        "problem": problem_letter_form,
        "id": inserted_id,
    }

    payload = {
        "meta": json.dumps(meta),
        "source": f_code,
        "compiler": f_lang,
        "tests": tests,
    }

    connection.commit()

    cur.execute(
        f"SELECT address FROM servers WHERE id = %s and enabled = true",
        (f_lang,))

    server_addr = cur.fetchone()
    server_addr = server_addr[0]
    print()

    requests.post(f"http://{server_addr}:{env.CHECKER_PORT}/api/v1/test",
                  json=payload)
    return {"success": True}
