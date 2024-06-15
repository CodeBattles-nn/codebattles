from functools import wraps
from typing import Type

from flask import abort, request
from wtforms import Form


def json_validate(clazz: Type[Form]):
    def decorator(f):
        @wraps(f)
        def decorated_function(*args, **kwargs):
            x: Form = clazz.from_json(request.json)
            if not x.validate():
                return abort(400)
            return f(*args, **kwargs, data=x)

        return decorated_function

    return decorator
