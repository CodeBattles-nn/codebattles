import json
import sqlite3

from flask import render_template, make_response

from app import app
from decorators import login_required, get_user_id


@app.route("/sends")
@login_required
@get_user_id
def sends(user_id, uid):
    connection = sqlite3.connect(".db")
    cur = connection.cursor()

    cur.execute(f"SELECT * FROM champSends__{user_id} WHERE user_id == ? ORDER BY send_time DESC", (uid,))

    db_sends = cur.fetchall()

    to_render = []

    for send in db_sends:
        id, letter, name, problem_id, pr_user_id, send_time, state, result, program, score = send

        to_render.append((id, letter, name, send_time, state, (score, "")[score is None], result is not None))

    print()

    return render_template("sends.html", sends=to_render)


@app.route("/send/<send_id>")
@login_required
def send_viewer(send_id, user_id):
    connection = sqlite3.connect(".db")
    cur = connection.cursor()

    cur.execute(f"SELECT * FROM champSends__{user_id} WHERE id == ?", (send_id,))

    data = cur.fetchone()

    tests = data[7].replace("\\n", "\n")

    to_render = []

    response = make_response(tests, 200)
    response.mimetype = "text/plain"

    print(tests)

    return response
