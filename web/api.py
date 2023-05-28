import json
import sqlite3
import string

import requests as requests
from flask import redirect, request

from app import *
from decorators import login_required, get_user_id
from utils import fix_new_line


@app.route("/send", methods=['POST'])
@login_required
@get_user_id
def send_prog(user_id, uid):
    connection = sqlite3.connect(".db")
    cur = connection.cursor()

    cur.execute("SELECT * FROM champs WHERE id == ?", (str(user_id),))

    fetch = cur.fetchone()  # Can be None
    problems_ids_temp = fetch[3:]
    problems_ids = []

    sql = "SELECT * FROM problems WHERE id LIKE -1 "

    strs = string.ascii_uppercase

    for i in problems_ids_temp:
        if i is not None:
            problems_ids.append(i)
            sql += "OR id == ? "

    cur.execute(sql, tuple(problems_ids))

    x = list(cur.fetchall())

    problem_ = None

    for i in x:
        id = i[0]
        problem_letter = strs[problems_ids.index(id)]
        if request.form['problem'] == problem_letter:
            problem_ = i

    tests = problem_[5]
    tests = json.loads(tests)
    tests = list(map(lambda z: {"in": z[0], "out": z[1]}, tests))

    print(problem_)

    meta = {
        "champ_id": user_id,
        "user_id": uid,
        "problem": request.form['problem']
    }

    data = {
        "meta": json.dumps(meta),
        "source": request.form['src'],
        "compiler": request.form['cars'],
        "tests": tests
    }

#     cur.executemany('''INSERT INTO champSends__1 (problem_name, problem_id, user_id, send_time, state)
# VALUES("A. Dwwdwd", 1, 1, "2023-05-28 19:37:15", "waiting"); SELECT last_insert_rowid();''',
#                     (problem_[1], problem_[0], uid, "_", "Тестируется")
#
#                     )

    requests.post("http://127.0.0.1:7070/api/v1/test", json=data)
    return redirect("/problems")


@app.route("/api/check_system_callback", methods=['POST'])
def check_system():
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

    con = sqlite3.connect(".db")
    cur = con.cursor()

    cur.execute(f"UPDATE champUsers__{meta['champ_id']} SET {meta['problem'][0]} = ? WHERE id == ?;",
                (round((correct_count / all_count) * 100), meta["user_id"]))
    con.commit()

    return "OK"
