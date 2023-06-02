from functools import wraps
from flask import g, request, redirect
from database import get_connection


def login_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if not request.cookies.get("authed", None) is None:
            battle_id = int(request.cookies.get("battle_id"))
            user_id = int(request.cookies.get("user_id"))

            connection = get_connection()
            cur = connection.cursor()
            cur.execute(f"SELECT * FROM champUsers__{battle_id} WHERE id == ?", (user_id,))

            if cur.fetchone() is None:
                return redirect("/logout")

            return f(*args, **kwargs, user_id=battle_id)

        return redirect("/")

    return decorated_function


def get_user_id(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if not request.cookies.get("authed", None) is None:
            user_id = int(request.cookies.get("user_id"))
            return f(*args, **kwargs, uid=user_id)

        return redirect("/")

    return decorated_function
