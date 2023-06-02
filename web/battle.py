import string
import json

from flask import render_template, abort

from app import app
from database import get_connection
from decorators import login_required, get_user_id
from utils import fix_new_line, get_table_color_class_by_score


@app.route("/problems")
@login_required
@get_user_id
def problems(user_id, uid):
    connection = get_connection()
    cur = connection.cursor()

    cur.execute("SELECT * FROM champs WHERE id == ?", (str(user_id),))

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

    cur.execute(f"SELECT * FROM champUsers__{user_id} WHERE id == ?", (uid,))

    fetch = cur.fetchone()  # Can be None

    score = fetch[4:4 + len(problems_ids)]

    for i, task in enumerate(x):
        id = task[0]
        name = task[1]
        tasks_dict[id] = task
        tasks.append((strs[problems_ids.index(id)], name, get_table_color_class_by_score(score[i])))

    tasks.sort()

    print()

    return render_template("problems.html", problems=tasks)


@app.route("/problem/<letter>")
@login_required
def problem(letter, user_id):
    connection = get_connection()
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

    tasks_dict = dict.fromkeys(problems_ids)

    x = list(cur.fetchall())

    tasks = [
        # ('A', "Искуственный Интелект"),
        # ('B', "Футбол"),
        # ('C', "Магазин"),

    ]

    problem_ = None

    for i in x:
        id = i[0]
        problem_letter = strs[problems_ids.index(id)]
        if letter == problem_letter:
            problem_ = i

    print()

    examples = (
        ("12\n13", "25"),
        ("3\n2", "5"),
    )

    if problem_ is None:
        abort(404)

    _pr_id, _pr_name, _pr_desc, _pr_in, _pr_out, _pr_tests, _pr_examples = problem_

    _pr_examples = fix_new_line(json.loads(_pr_examples))

    return render_template("index.html", problem_name=_pr_name, problem_description=_pr_desc,
                           problem_letter=letter, in_data=_pr_in, out_data=_pr_out, examples=_pr_examples)


@app.route("/stats")
@login_required
@get_user_id
def statistics(user_id, uid):
    connection = get_connection()
    cur = connection.cursor()

    cur.execute("SELECT * FROM champs WHERE id == ?", (str(user_id),))

    fetch = cur.fetchone()  # Can be None
    problems_ids_temp = fetch[3:]
    problems_counts = 0

    for i in problems_ids_temp:
        if i is not None:
            problems_counts += 1
        else:
            break

    strs = string.ascii_uppercase

    print(problems_counts)

    cur.execute(f"SELECT * FROM champUsers__{user_id} ORDER BY score DESC")

    fetch = cur.fetchall()  # Can be None

    users = []

    for i, usr in enumerate(fetch):
        score = usr[-1]
        nickname = usr[3]
        problems_score = usr[4:problems_counts + 4]
        problems_score = map(lambda s: (s, "")[s is None], problems_score)

        users.append((i + 1, nickname, score, problems_score, ("", "table-primary")[uid == usr[0]]))

    return render_template("stats.html", cols=strs[:problems_counts], users=users)
