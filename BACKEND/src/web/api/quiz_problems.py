import json
import re
import string

from flask import abort

from app import app
from database import get_connection
from decorators import get_user_id, api_login_required, redis_conn
from utils import fix_new_line, get_table_color_class_by_score, LETTER_REGEX

JSON_MIMETYPE = "application/json"


@app.route("/api/problem/<letter>/quiz")
@api_login_required
def get_quiz(letter, user_id):
    # if not re.fullmatch(LETTER_REGEX, letter):
    #     return abort(404)

    connection = get_connection()
    cur = connection.cursor()

    cur.execute("SELECT * FROM champs WHERE id = %s", (str(user_id),))

    fetch = cur.fetchone()  # Can be None
    problems_ids_temp = fetch[3:]
    problems_ids = []

    sql = "SELECT * FROM problems WHERE id = -1 "

    strs = string.ascii_uppercase

    for i in problems_ids_temp:
        if i is not None:
            problems_ids.append(i)
            sql += "OR id = %s "

    cur.execute(sql, tuple(problems_ids))

    x = list(cur.fetchall())

    problem_ = None

    for i in x:
        problem_id = i[0]
        problem_letter = strs[problems_ids.index(problem_id)]
        if letter == problem_letter:
            problem_ = i

    if problem_ is None:
        abort(404)

    _pr_id, _pr_name, _pr_desc, _pr_in, _pr_out, _pr_tests, _pr_examples, _ = problem_

    print(_pr_tests)
    _pr_tests = json.loads(_pr_tests)
    filtered_test = []

    for question in _pr_tests["questions"]:
        print(question)
        filtered_test.append(
            {
                "id": question["id"],
                "name": question["question"],
                "answers": question["answers"],
                "type": question["type"],
            }
        )

    return dict(
        success=True,
        name=_pr_name,
        description=_pr_desc,
        letter=letter,
        tests=filtered_test,
    )
