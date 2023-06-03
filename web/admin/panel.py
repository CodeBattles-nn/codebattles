import string

from flask import render_template, redirect, request

from app import app
from database import get_connection


@app.route("/admin")
def admin_panel():
    connection = get_connection()
    cursor = connection.cursor()

    cursor.execute("SELECT id, name, started FROM champs ")

    champs = cursor.fetchall()
    champs = list(map(lambda x: [*x], champs))

    return render_template("admin/panel.html", champs=champs)


@app.route("/admin/champ/<champ_id>")
def settings(champ_id):
    connection = get_connection()
    cur = connection.cursor()

    cur.execute("SELECT * FROM champs WHERE id == ?", (str(champ_id),))

    fetch = cur.fetchone()  # Can be None
    problems_ids_temp = fetch[3:]
    problems_ids = []

    sql = "SELECT * FROM problems WHERE id LIKE -1 "

    strs = string.ascii_uppercase

    for task in problems_ids_temp:
        if task is not None:
            problems_ids.append(task)
            sql += "OR id == ? "

    cur.execute(sql, tuple(problems_ids))

    tasks_dict = dict.fromkeys(problems_ids)

    x = list(cur.fetchall())

    tasks = []

    for i, task in enumerate(x):
        id = task[0]
        name = task[1]
        tasks_dict[id] = task
        tasks.append((strs[problems_ids.index(id)], id, name))

    tasks.sort()

    print()

    return render_template("admin/settings.html", tasks=tasks, id=fetch[0], name=fetch[1])


@app.route("/admin/champ/<champ_id>", methods=['POST'])
def settings_post(champ_id):
    connection = get_connection()
    cur = connection.cursor()

    form = request.form
    problem = form['problem']
    problem_id = form['problem_id']

    if problem_id == "":
        return redirect(f"/admin/champ/{champ_id}")
    problem_id = int(problem_id)

    print(problem, problem_id)

    cur.execute(f"""UPDATE champs SET {problem} = {problem_id} WHERE id = {champ_id}""")
    connection.commit()

    return redirect(f"/admin/champ/{champ_id}")
