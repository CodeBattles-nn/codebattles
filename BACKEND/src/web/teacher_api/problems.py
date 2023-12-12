import json

from flask import request
from psycopg2.extras import RealDictCursor

from app import app
from database import get_connection
from decorators import teacher_required
from utils import fix_new_line


@app.route("/api/teacher/problems")
@teacher_required
def get_problems_api_route():
    connection = get_connection()
    cursor = connection.cursor(cursor_factory=RealDictCursor)

    cursor.execute("SELECT id, name, description FROM problems")
    problems = cursor.fetchall()

    return problems


@app.route("/api/teacher/problems/<problem_id>")
@teacher_required
def get_problems_byid_api_route(problem_id):
    connection = get_connection()
    cursor = connection.cursor(cursor_factory=RealDictCursor)

    cursor.execute(
        f"""SELECT id, name, description, "in", "out", examples, tests FROM problems WHERE id = {problem_id}""")
    problem = cursor.fetchone()

    print(problem)

    if problem is None:
        return "", 404

    out_data = {
        'tests': [],
        'examples': fix_new_line(json.loads(problem['examples'])),
        'name': problem['name'],
        'description': problem['description'],
        'out_data': problem['out'],
        'in_data': problem['in']
    }

    return out_data
