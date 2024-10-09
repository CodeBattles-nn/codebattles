from flask import request, make_response, jsonify
from psycopg2.extras import RealDictCursor

import env
from app import app
from database import get_connection
from decorators import teacher_required
from services import captcha_service
from utils import salt_crypt


@app.route("/api/teacher/auth")
def teacher_auth_captcha():
    captcha = captcha_service.generate_with_validation()
    return {
        "base64string": captcha.base64image,
        "validate": captcha.sha256_hash,
    }


@app.route("/api/teacher/auth", methods=["POST"])
def teacher_auth_post():
    login, password = request.json["login"], request.json["password"]

    if env.REQUIRE_CAPTCHA:
        base64image, captchaUserInput, captchaValidate = (
            request.json["base64image"],
            request.json["captchaUserInput"],
            request.json["captchaValidate"],
        )

        success_captcha = captcha_service.validate(
            base64image, captchaUserInput, captchaValidate
        )

        if not success_captcha:
            return make_response({"success": False, "use_redirect": False}, 403)

    connection = get_connection()
    cursor = connection.cursor(cursor_factory=RealDictCursor)

    cursor.execute(
        f"""
    SELECT id from globalusers
    WHERE role = 'TEACHER'
     AND password = %s
    AND login = %s
    """,
        (password, login),
    )

    resp = make_response({"success": False, "use_redirect": False}, 403)

    if cursor.fetchone():
        resp = make_response({"success": True})
        client_hash = salt_crypt(login, password)
        resp.set_cookie("teacher", f"{login}_{password}_{client_hash}")

    return resp


@app.route("/api/teacher/changecred", methods=["POST"])
@teacher_required
def teacher_change_credential_post():
    new_login, new_password, current_password = (
        request.json["login"],
        request.json["password"],
        request.json["current_password"],
    )

    connection = get_connection()
    cursor = connection.cursor(cursor_factory=RealDictCursor)

    cursor.execute(
        f"""
    SELECT id from globalusers
    WHERE role = 'TEACHER'
     AND password = %s
    AND login = %s
    """,
        (current_password, new_login),
    )

    resp = make_response({"success": False, "use_redirect": False}, 422)

    user_db = cursor.fetchone()

    print(user_db)
    if user_db is None:
        pass
    elif len(user_db) > 0:
        cursor.execute(
            "UPDATE globalusers SET login = %s, password = %s WHERE id = %s;",
            (new_login, new_password, user_db["id"]),
        )
        resp = make_response({"success": True})
        client_hash = salt_crypt(new_login, new_password)
        resp.set_cookie("teacher", f"{new_login}_{new_password}_{client_hash}")

        connection.commit()

    return resp
