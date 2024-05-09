import string

from flask import request, redirect

from app import app
from database import get_connection
from database.createTables import get_query_users_table, get_query_sends_table
from decorators import teacher_required


@app.route("/api/teacher/champs")
@teacher_required
def get_champs_route():
    connection = get_connection()
    cursor = connection.cursor()

    cursor.execute("SELECT id, name, started FROM champs ")

    champs = cursor.fetchall()
    champs = list(map(lambda x: [*x], champs))
    champs = list(
        map(lambda x: {'id': x[0], 'name': x[1], 'start_dt': x[2]}, champs))

    return champs


@app.route("/api/teacher/champs", methods=['POST'])
@teacher_required
def create_champ_post_teacher():
    name = request.json['name']

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


@app.route("/api/teacher/champs/<int:champ_id>")
@teacher_required
# @ValidateParameters
def get_champs_byid_route(champ_id):
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

    for task in x:
        _id = task[0]
        name = task[1]
        tasks_dict[_id] = task
        tasks.append(
            {'letter': strs[problems_ids.index(_id)], 'id': _id, 'name': name})

    return {'tasks': tasks, 'id': fetch[0], 'name': fetch[1]}


@app.route("/api/teacher/champs/<int:champ_id>", methods=['POST'])
@teacher_required
def settings_post_teacher_api(champ_id):
    connection = get_connection()
    cur = connection.cursor()

    form = request.json
    problem = form['problem']
    problem_id = form['problem_id']

    cur.execute(
        f"""SELECT id FROM problems WHERE id={problem_id}""")

    prefetched_problem = cur.fetchone()

    print(prefetched_problem)

    if problem_id == "" or prefetched_problem is None:
        return {"success": "false"}, 400
    problem_id = int(problem_id)

    print(problem, problem_id)

    cur.execute(
        f"""UPDATE champs SET {problem} = {problem_id} WHERE id = {champ_id}""")

    connection.commit()

    return {"success": "true"}
