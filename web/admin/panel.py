from flask import render_template

from app import app


@app.route("/admin")
def admin_panel():
    return render_template("admin/panel.html")

