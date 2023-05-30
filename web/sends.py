import json
import sqlite3

from flask import render_template, make_response

from app import app
from decorators import login_required, get_user_id
from utils import get_table_color_class_by_test_message


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
        id, letter, name, problem_id, pr_user_id, send_time, state, result, program, score, lang = send

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

    result = json.loads(data[7])
    lang = data[10]
    prog = data[8]

    to_render = []

    for i, test in enumerate(result):
        message = test['msg']
        out = test['out']

        if message == "WRONG_ANSWER":
            out = """ВЫВОД СКРЫТ"""

        to_add = (i + 1, test['time'], message, out, get_table_color_class_by_test_message(message))
        to_render.append(to_add)

    connection.close()

    return render_template("send_view.html", tests=to_render, lang=lang, program=prog)
