from flask import render_template, request, redirect, make_response

from app import app
from database import get_connection
from decorators import login_required


@app.route("/")
def login():
    if request.cookies.get("authed", False):
        return redirect("/wait")

    return render_template("login.html")


@app.route("/logout", methods=['POST', 'GET'])
def logout():
    resp = make_response(redirect("/"))

    resp.set_cookie('user_id', expires=0)
    resp.set_cookie('authed', expires=0)
    resp.set_cookie('battle_id', expires=0)

    return resp


@app.route("/", methods=['POST'])
def login_post():
    champ_id = request.form['id']
    login = request.form['login']
    password = request.form['password']

    try:
        champ_id = int(champ_id)

        con = get_connection()
        cur = con.cursor()
        cur.execute(f"SELECT * FROM public.champUsers_{champ_id} WHERE login = '{login}' AND password = '{password}'")
        user = cur.fetchone()

        assert user is not None

        resp = make_response(redirect("/wait"))
        resp.set_cookie('user_id', str(user[0]))
        resp.set_cookie('authed', str(True))
        resp.set_cookie('battle_id', str(champ_id))

        return resp
    except Exception as e:
        pass

    return render_template("login.html", error="Неверные данные")


@app.route("/wait")
@login_required
def wait(user_id):
    # connection = get_connection()
    # cur = connection.cursor()
    #
    # cur.execute("SELECT name FROM champs WHERE id = %s", (user_id,))
    #
    # name = cur.fetchone()
    #
    # if name is None:
    #     return redirect("/logout")

    return redirect("/problems")
