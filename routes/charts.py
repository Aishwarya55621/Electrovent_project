from flask import Blueprint, render_template

charts_bp = Blueprint("charts", __name__)

@charts_bp.route("/charts")
def charts():
    return render_template("charts.html")
