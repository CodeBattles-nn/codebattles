from flask import request, make_response

from app import app


@app.route("/api/teacher/auth", methods=['POST'])
def teacher_auth_post():
    login, password = request.form['login'], request.form['password']

    resp = make_response({"success": True})

    resp.set_cookie("teacher", f"{login}_{password}_88416")

    # print(login, password)

    return resp
