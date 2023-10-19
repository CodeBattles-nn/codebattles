import json

from app import app
from database import get_connection
from decorators import get_user_id, api_login_required


@app.route("/api/sends")
@api_login_required
@get_user_id
def api_sends(user_id, uid):
    connection = get_connection()
    cur = connection.cursor()

    cur.execute(f"SELECT * FROM champSends_{user_id} WHERE user_id = %s ORDER BY send_time DESC", (uid,))

    db_sends = cur.fetchall()

    to_render = []

    for send in db_sends:
        id, letter, name, problem_id, pr_user_id, send_time, state, result, program, score, lang = send

        to_render.append(
            dict(id=id, letter=letter, name=name, send_time=send_time, state=state, score=(score, "")[score is None],
                 program_checked=result is not None))

    print()

    return dict(success=True, sends=to_render)


@app.route("/api/send/<send_id>")
@api_login_required
def api_send_viewer(send_id, user_id):
    connection = get_connection()
    cur = connection.cursor()

    cur.execute(f"SELECT * FROM champSends_{user_id} WHERE id = %s", (send_id,))

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

        to_add = dict(id=i + 1, time=test['time'], msg=message, out=out)
        to_render.append(to_add)

    connection.close()

    print()

    return dict(success=True, tests=to_render, lang=lang, program=prog)
