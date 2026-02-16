from flask import Blueprint, request, jsonify
from services.email_service import send_email

ticket_bp = Blueprint("ticket", __name__)

@ticket_bp.route("/ticket", methods=["POST"])
def create_ticket():
    ticket = request.json

    anomaly = (
        ticket.get("anomalyType")
        or ticket.get("anomaly_type")
        or ticket.get("anomaly")
        or "Unknown"
    )

    if ticket.get("anomalyDetected") is True:
        message = f"""
ANOMALY ALERT
Ticket ID: {ticket.get('id')}
Anomaly: {anomaly}
Severity: {ticket.get('severity')}
"""
        send_email(message)

    return jsonify({
        "success": True,
        "message": "Ticket processed successfully."
    })

