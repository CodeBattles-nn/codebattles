import json
import sqlite3

import requests as requests
from flask import redirect, request

from app import *
from decorators import login_required, get_user_id


@app.route("/send", methods=['POST'])
@login_required
@get_user_id
def send_prog(user_id, uid):
    meta = {
        "champ_id": user_id,
        "user_id": uid,
        "problem": request.form['problem']
    }

    data = {
        "meta": json.dumps(meta),
        "source": request.form['src'],
        "compiler": request.form['cars'],
        "tests": [
            {
                "in": "5\n1",
                "out": "6"
            },
            {
                "in": "5\n13",
                "out": "18"
            },
            {
                "in": "1000000\n1000000",
                "out": "2000000"
            },
            {
                "in": "-1\n1",
                "out": "0"
            },
            {
                "in": "50\n10",
                "out": "60"
            }]
    }

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
