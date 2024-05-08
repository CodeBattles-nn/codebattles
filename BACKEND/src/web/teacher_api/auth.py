from flask import request, make_response, jsonify
from psycopg2.extras import RealDictCursor

import env
from app import app
from database import get_connection
from services import captcha_service


@app.route("/api/teacher/auth")
def teacher_auth_captcha():
    captcha = captcha_service.generate_with_validation()
    return {
        "base64string": captcha.base64image,
        "validate": captcha.sha256_hash,
    }


@app.route("/api/teacher/auth", methods=['POST'])
def teacher_auth_post():
    login, password = request.json['login'], request.json['password']

    if env.REQUIRE_CAPTCHA:
        base64image, captchaUserInput, captchaValidate = request.json[
            'base64image'], request.json['captchaUserInput'], request.json[
            'captchaValidate'],

        success_captcha = captcha_service.validate(
            base64image,
            captchaUserInput,
            captchaValidate
        )

        if not success_captcha:
            return make_response({"success": False, "use_redirect": False}, 403)



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
