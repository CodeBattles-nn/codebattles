import string

from app import app
from database import get_connection
from decorators import teacher_required


@app.route("/api/teacher/champs")
@teacher_required
def get_champs_route():
    connection = get_connection()
    cursor = connection.cursor()

    cursor.execute("SELECT id, name, started FROM champs ")

    champs = cursor.fetchall()
    champs = list(map(lambda x: [*x], champs))
    champs = list(map(lambda x: dict(id=x[0], name=x[1], start_dt=x[2]), champs))

    return champs


@app.route("/api/teacher/champs/<champ_id>")
@teacher_required
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

    for i, task in enumerate(x):
        id = task[0]
        name = task[1]
        tasks_dict[id] = task
        tasks.append(dict(letter=strs[problems_ids.index(id)], id=id, name=name))

    return dict(tasks=tasks, id=fetch[0], name=fetch[1])
