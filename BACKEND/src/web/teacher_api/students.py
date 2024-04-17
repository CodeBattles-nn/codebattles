import random

from flask import request
from psycopg2.extras import RealDictCursor

from app import app
from database import get_connection
from decorators import teacher_required

from decorators import redis_conn


@app.route("/api/teacher/champs/<int:champ_id>/users")
@teacher_required
def get_users_get_route(champ_id):
    connection = get_connection()
    cur = connection.cursor(cursor_factory=RealDictCursor)

    cur.execute(f"SELECT name, login, password FROM champUsers_{champ_id}")
    users = cur.fetchall()

    return users


@app.route("/api/teacher/champs/<int:champ_id>/add_users", methods=['POST'])
@teacher_required
@redis_conn
def create_users_in_champ_post_teachers_api(champ_id, r):
    users = (request.json['users']
             .replace("\r", "")
             .split("\n"))

    connection = get_connection()
    cursor = connection.cursor()

    for name in users:
        login = ''.join(map(str, [random.randint(0, 9) for _ in range(5)]))
        password = ''.join(map(str, [random.randint(0, 9) for _ in range(5)]))

        cursor.execute(
            f"INSERT INTO champUsers_{champ_id} (login, password, name) VALUES (%s, %s, %s)",
            (login, password, name))

    connection.commit()

    r.delete(f"r-champ-{champ_id}-stats")

    return {"success": "true"}, 201
