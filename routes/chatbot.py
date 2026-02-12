from flask import Blueprint, request, jsonify
from services.chatbot_service import identify_anomaly_type

# Blueprint definition
chatbot_bp = Blueprint("chatbot", __name__, url_prefix="/chatbot")

# Temporary simulated system data
# (Later you can replace this with real sensor data or DB values)
SYSTEM_DATA = {
    "Motor_Temperature": 92,
    "Motor_Vibration": 6.5,
    "Motor_Torque": 320,
    "Battery_Temperature": 40
}


@chatbot_bp.route("/", methods=["POST"])
def chatbot():
    """
    Rule-based maintenance chatbot endpoint.
    Accepts JSON payload:
        { "message": "your query here" }
    """

    data = request.get_json()

    if not data or "message" not in data:
        return jsonify({
            "error": "Invalid request. Provide JSON with 'message' field."
        }), 400

    query = data["message"].lower().strip()

    # Identify anomaly using service logic
    anomaly = identify_anomaly_type(SYSTEM_DATA)

    # -------------------------------
    # System Status Query
    # -------------------------------
    if "health" in query or "status" in query:
        if anomaly == "Multivariate Pattern":
            status = "DEGRADED"
            explanation = (
                "No single parameter exceeded critical thresholds, "
                "but combined deviations indicate abnormal system behavior."
            )
        else:
            status = "UNHEALTHY"
            explanation = f"System classified as UNHEALTHY due to {anomaly.lower()}."

        return jsonify({
            "system_status": status,
            "identified_anomaly": anomaly,
            "explanation": explanation
        })

    # -------------------------------
    # Anomaly Query
    # -------------------------------
    if "anomaly" in query or "fault" in query:
        return jsonify({
            "detected_anomaly": anomaly,
            "parameters": SYSTEM_DATA
        })

    # -------------------------------
    # Parameter-Specific Queries
    # -------------------------------
    if "temperature" in query:
        return jsonify({
            "motor_temperature": SYSTEM_DATA["Motor_Temperature"],
            "threshold": "90 °C",
            "status": "Abnormal"
            if SYSTEM_DATA["Motor_Temperature"] > 90
            else "Normal"
        })

    if "vibration" in query:
        return jsonify({
            "motor_vibration": SYSTEM_DATA["Motor_Vibration"],
            "threshold": "8 mm/s",
            "status": "Abnormal"
            if SYSTEM_DATA["Motor_Vibration"] > 8
            else "Normal"
        })

    if "torque" in query:
        return jsonify({
            "motor_torque": SYSTEM_DATA["Motor_Torque"],
            "threshold": "350 Nm",
            "status": "Abnormal"
            if SYSTEM_DATA["Motor_Torque"] > 350
            else "Normal"
        })

    if "battery" in query:
        return jsonify({
            "battery_temperature": SYSTEM_DATA["Battery_Temperature"],
            "threshold": "45 °C",
            "status": "Abnormal"
            if SYSTEM_DATA["Battery_Temperature"] > 45
            else "Normal"
        })

    # -------------------------------
    # Help / Fallback
    # -------------------------------
    return jsonify({
        "message": (
            "Supported queries:\n"
            "- Is the system healthy?\n"
            "- What anomaly is detected?\n"
            "- Explain motor temperature / vibration / torque / battery"
        )
    })
