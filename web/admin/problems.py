from flask import render_template

from app import app
from database import get_connection


@app.route("/admin/problems")
def admin_list_problems():
    connection = get_connection()
    cursor = connection.cursor()

    cursor.execute("SELECT id, name, description FROM problems")

    problems = cursor.fetchall()

    problems = list(map(lambda problem: [*problem], problems))

    return render_template("admin/problems_list.html", problems=problems)
