from flask import Blueprint, render_template, request
from services.model_service import predict_anomaly
from services.ticket_service import create_ticket,get_recent_tickets
dashboard_bp = Blueprint("dashboard", __name__)

@dashboard_bp.route("/dashboard", methods=["GET", "POST"])
def dashboard():
    result = None

    if request.method == "POST":
        data = [
            float(request.form["motor_temp"]),
            float(request.form["vibration"]),
            float(request.form["torque"]),
            float(request.form["battery_temp"])
        ]

        pred, score = predict_anomaly(data)

        if pred == -1:
            create_ticket("Motor/Battery Anomaly", "HIGH")
            result = "⚠️ Anomaly Detected"
        else:
            result = "✅ Normal Operation"
    tickets = get_recent_tickets()
    return render_template("dashboard.html", result=result, tickets=tickets)
