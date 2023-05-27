from flask import render_template, request, redirect

from app import app
from decorators import login_required


@app.route("/")
def login():
    if request.cookies.get("authed", False):
        return redirect("/wait")

    return render_template("login.html")


@app.route("/wait")
@login_required
def wait(user_id):
    return render_template("waiting.html")
