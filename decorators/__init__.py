from functools import wraps
from flask import g, request, redirect, url_for


def login_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if not request.cookies.get("authed", None) is None:
            user_id = int(request.cookies.get("battle_id"))
            return f(*args, **kwargs, user_id=user_id)

        return redirect("/")

    return decorated_function
