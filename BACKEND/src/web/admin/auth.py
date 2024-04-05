from flask import render_template, request, redirect, make_response

from app import app


@app.route("/admin/auth")
def admin_auth():
    return render_template("admin/auth.html")


@app.route("/admin/auth", methods=['POST'])
def admin_auth_post():
    login, password = request.form['login'], request.form['password']

    resp = make_response(redirect("/admin"))

    resp.set_cookie("admin", f"{login}_{password}_531")

    print(login, password)

    return resp
