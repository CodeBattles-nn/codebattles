from flask import request, make_response
from psycopg2.extras import RealDictCursor

from app import app
from database import get_connection


@app.route("/api/teacher/auth", methods=['POST'])
def teacher_auth_post():
    login, password = request.json['login'], request.json['password']

    connection = get_connection()
    cursor = connection.cursor(cursor_factory=RealDictCursor)

    cursor.execute(f"""
    SELECT id from globalusers
WHERE role = 'TEACHER' 
  AND password = '{password}'
  AND login = '{login}'
""")

    resp = make_response({"success": False, "use_redirect": False}, 403)

    if cursor.fetchone():
        resp = make_response({"success": True})
        resp.set_cookie("teacher", f"{login}_{password}_88416")

    return resp
