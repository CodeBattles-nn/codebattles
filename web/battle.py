from flask import render_template

from app import app
from decorators import login_required


@app.route("/problems")
@login_required
def problems(user_id):
    tasks = (
        ('A', "Искуственный Интелект"),
        ('B', "Футбол"),
        ('C', "Магазин"),
    )

    return render_template("problems.html", problems=tasks)


@app.route("/problem/<letter>")
@login_required
def problem(letter, user_id):
    name = "Сложить два числа"
    description = """Петя и Вася играют в футбол. Петя забил А голов, а Вася - В голов.
Ваша задача посчитать, сколько
всего голов было забито в данной игре :)"""

    in_data = """На ввод подаются два числа на разных строках. A - число голов,
забитых Петей. B - Васей.
0 ≤ А ≤ 10^9
0 ≤ B ≤ 10^9"""

    out_data = """Выведите общее количество голов в игре"""

    examples = (
        ("12\n13", "25"),
        ("3\n2", "5"),
    )

    return render_template("index.html", problem_name=name, problem_description=description,
                           problem_letter=letter, in_data=in_data, out_data=out_data, examples=examples)


@app.route("/stats")
@login_required
def statistics(user_id):
    return render_template("stats.html")
