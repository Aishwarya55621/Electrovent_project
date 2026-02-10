from flask import Blueprint, request, jsonify
from services.sms_service import send_sms

ticket_bp = Blueprint("ticket", __name__)

@ticket_bp.route("/ticket", methods=["POST"])
def create_ticket():
    ticket = request.json or {}

    # Safely extract anomaly value
    anomaly = (
        ticket.get("anomalyType")
        or ticket.get("anomaly_type")
        or ticket.get("anomaly")
        or "Unknown"
    )

    anomaly_detected = ticket.get("anomalyDetected", False)
    mobile = ticket.get("mobile")   # 📱 mobile number

    if anomaly_detected is True:
        message = f"""
ANOMALY ALERT
Ticket ID: {ticket.get('id', 'N/A')}
Anomaly: {anomaly}
Severity: {ticket.get('severity', 'N/A')}
"""

        if mobile:
            send_sms(mobile, message)
        else:
            print("⚠️ Mobile number not provided. SMS not sent.")

    return jsonify({
        "success": True,
        "message": "Ticket processed successfully."
    })
