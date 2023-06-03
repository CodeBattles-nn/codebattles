from flask import render_template

from app import app


@app.route("/admin/auth")
def admin_auth():
    return render_template("admin/auth.html")

