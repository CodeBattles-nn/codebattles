import json

from flask import render_template, request

from app import app
from database import get_connection
from decorators import admin_required


@app.route("/admin/problems")
@admin_required
def admin_list_problems():
    connection = get_connection()
    cursor = connection.cursor()

    cursor.execute("SELECT id, name, description FROM problems")

    problems = cursor.fetchall()

    problems = list(map(lambda problem: [*problem], problems))

    return render_template("admin/problems_list.html", problems=problems)


@app.route("/admin/problems/add", methods=['POST'])
@admin_required
def admin_list_problems_add():
    connection = get_connection()
    cursor = connection.cursor()

    cursor.execute("SELECT id, name, description FROM problems")

    problems = cursor.fetchall()

    problems = list(map(lambda problem: [*problem], problems))

    build = request.form['build']
    try:
        build_json = json.loads(build)
        build_json['tests'] = json.dumps(build_json['tests'])
        build_json['examples'] = json.dumps(build_json['examples'])
    except:
        return "Not json (404 ERR)", 400

    print(build)
    print(build_json)

    cursor.execute(
        """INSERT INTO problems (name, description, "in", out, examples, tests) VALUES (%s, %s, %s, %s, %s, %s) """,
        (build_json['name'],
         build_json['description'],
         build_json['in'],
         build_json['out'],
         build_json['examples'],
         build_json['tests'],)
    )

    connection.commit()

    return render_template("admin/problems_list.html", problems=problems)
