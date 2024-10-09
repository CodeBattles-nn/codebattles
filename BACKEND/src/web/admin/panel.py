import random
import string

from flask import render_template, redirect, request

from app import app
from database import get_connection
from database.createTables import get_query_users_table, get_query_sends_table
from decorators import admin_required


@app.route("/admin")
@admin_required
def admin_panel():
    connection = get_connection()
    cursor = connection.cursor()

    cursor.execute("SELECT id, name, started FROM champs ")

    champs = cursor.fetchall()
    champs = list(map(lambda x: [*x], champs))

    return render_template("admin/panel.html", champs=champs)


@app.route("/admin/champ/<int:champ_id>")
@admin_required
def settings(champ_id):
    connection = get_connection()
    cur = connection.cursor()

    cur.execute("SELECT * FROM champs WHERE id = %s", (str(champ_id),))

    fetch = cur.fetchone()  # Can be None
    problems_ids_temp = fetch[3:]
    problems_ids = []

    sql = "SELECT * FROM problems WHERE id = -1 "

    strs = string.ascii_uppercase

    for task in problems_ids_temp:
        if task is not None:
            problems_ids.append(task)
            sql += "OR id = %s "

    cur.execute(sql, tuple(problems_ids))

    tasks_dict = dict.fromkeys(problems_ids)

    x = list(cur.fetchall())

    tasks = []

    for i, task in enumerate(x):
        task_id = task[0]
        name = task[1]
        tasks_dict[task_id] = task
        tasks.append((strs[problems_ids.index(task_id)], task_id, name))

    tasks.sort()

    print()

    return render_template(
        "admin/settings.html", tasks=tasks, id=fetch[0], name=fetch[1]
    )


@app.route("/admin/champ/<int:champ_id>", methods=["POST"])
@admin_required
def settings_post(champ_id):
    connection = get_connection()
    cur = connection.cursor()

    form = request.form
    problem = form["problem"]
    problem_id = form["problem_id"]

    if problem_id == "":
        return redirect(f"/admin/champ/{champ_id}")
    problem_id = int(problem_id)

    print(problem, problem_id)

    cur.execute(f"""UPDATE champs SET {problem} = {problem_id} WHERE id = {champ_id}""")

    connection.commit()

    return redirect(f"/admin/champ/{champ_id}")


@app.route("/admin/create/")
@admin_required
def create_champ():
    return render_template("admin/create.html")


@app.route("/admin/create/", methods=["POST"])
@admin_required
def create_champ_post():
    name = request.form["name"]

    connection = get_connection()
    cur = connection.cursor()

    cur.execute("INSERT INTO champs (name) VALUES (%s)", (name,))

    connection.commit()

    cur.execute("SELECT currval(pg_get_serial_sequence('champs','id'));")
    champ_id = cur.fetchone()[0]

    cur.execute(get_query_users_table(champ_id))
    cur.execute(get_query_sends_table(champ_id))

    connection.commit()

    return redirect("/admin")


@app.route("/admin/champ/<int:champ_id>/add_users")
@admin_required
def create_users_in_champ(champ_id):
    return render_template("admin/add_users.html")


@app.route("/admin/champ/<int:champ_id>/add_users", methods=["POST"])
@admin_required
def create_users_in_champ_post(champ_id):
    users = request.form["users"].split("\r\n")

    connection = get_connection()
    cursor = connection.cursor()

    for name in users:
        # login = translit(name, 'ru', reversed=True)
        # login = login.replace(" ", "")
        # login = login.replace("'", "")
        # if len(login) > 7:
        #     login = login[:6]
        #
        # login = f"{login}{random.randint(10, 99)}"
        #
        # password = get_random_string(8)

        login = "".join(map(str, [random.randint(0, 9) for _ in range(5)]))
        password = "".join(map(str, [random.randint(0, 9) for _ in range(5)]))

        cursor.execute(
            f"INSERT INTO champUsers_{champ_id} (login, password, name)"
            f" VALUES (%s, %s, %s)",
            (login, password, name),
        )

    connection.commit()

    return redirect(f"/admin/champ/{champ_id}/users")


@app.route("/admin/champ/<int:champ_id>/users")
@admin_required
def users_route(champ_id):
    connection = get_connection()
    cur = connection.cursor()

    cur.execute(f"SELECT name, login, password FROM champUsers_{champ_id}")

    users = cur.fetchall()

    return render_template("admin/users.html", users=users, id=champ_id)
