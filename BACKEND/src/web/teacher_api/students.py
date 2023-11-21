from psycopg2.extras import RealDictCursor

from app import app
from database import get_connection
from decorators import teacher_required


@app.route("/api/teacher/champs/<champ_id>/users")
@teacher_required
def get_users_get_route(champ_id):
    connection = get_connection()
    cur = connection.cursor(cursor_factory=RealDictCursor)

    cur.execute(f"SELECT name, login, password FROM champUsers_{champ_id}")
    users = cur.fetchall()

    return users
