import json
import sqlite3
import string
import datetime

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

    cur.execute(
        '''
        INSERT INTO champSends__1
        (problem_name, problem_id, user_id, send_time, state, program, problem_letter)
        VALUES(?, ?, ?, ?, ?, ?, ?); 
        ''',
        (problem_[1], problem_[0], uid, datetime.datetime.now(), "Тестируется", request.form['src'], problem_letter_form)
    )
    cur.execute('SELECT last_insert_rowid()')

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

    requests.post("http://127.0.0.1:7070/api/v1/test", json=data)
    return redirect("/sends")


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

    result_str = json.dumps(data['results'], indent=2)

    print(result_str)

    cur.execute(
        f"UPDATE champSends__{meta['champ_id']} SET score = ?,state = 'Протестировано', description = ?  WHERE id == ?;",
        (round((correct_count / all_count) * 100), result_str, meta['id']))

    con.commit()

    return "OK"
