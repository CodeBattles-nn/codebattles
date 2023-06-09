from functools import wraps
from flask import request, redirect

from config import ADMIN_LOGIN, ADMIN_PASSWORD
from database import get_connection


def admin_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        admin_login_password = request.cookies.get("admin", None)
        is_admin = admin_login_password == f"{ADMIN_LOGIN}_{ADMIN_PASSWORD}_531"
        if is_admin:
            return f(*args, **kwargs)
        return redirect("/admin/auth")

    return decorated_function


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
