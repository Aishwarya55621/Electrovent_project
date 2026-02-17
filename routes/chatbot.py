from flask import Blueprint, request, jsonify
import random

chatbot_bp = Blueprint('chatbot_bp', __name__)


@chatbot_bp.route("/", methods=["GET"])
def chatbot_home():
    return jsonify({"message": "Industrial Motor Monitoring Chatbot Active"})


@chatbot_bp.route("/ask", methods=["POST"])
def chatbot():
    data = request.json
    user_message = data.get("message", "").lower().strip()
    motor_data = data.get("motorData", [])

    if not motor_data:
        return jsonify({"message": "Motor data unavailable."})

    TEMP_CRITICAL = 85
    VIB_CRITICAL = 8
    TORQUE_HIGH = 500
    TORQUE_LOW = 50

    critical = []
    warning = []
    normal = []

    for m in motor_data:
        issues = []

        if m["temperature"] > TEMP_CRITICAL:
            issues.append("High Temperature")

        if m["vibration"] > VIB_CRITICAL:
            issues.append("Excess Vibration")

        if m["torque"] > TORQUE_HIGH:
            issues.append("Overload Torque")

        if m["torque"] < TORQUE_LOW:
            issues.append("Low Torque")

        if issues:
            m["issues"] = issues
            critical.append(m)
        elif m["temperature"] > 75 or m["vibration"] > 6:
            warning.append(m)
        else:
            normal.append(m)

    health_score = 100 - (len(critical) * 20) - (len(warning) * 10)
    health_score = max(0, health_score)

    reply = ""

    # Greeting
    if any(word in user_message for word in ["hi", "hello", "hey"]):
        reply = random.choice([
            "Hello. Industrial Motor Monitoring Assistant online.",
            "Monitoring system active.",
            "System ready. Please provide your request."
        ])

    # Health summary
    elif "health" in user_message:
        reply = (
            f"System Health Score: {health_score}/100\n"
            f"Critical Motors: {len(critical)}\n"
            f"Warning Motors: {len(warning)}\n"
            f"Normal Motors: {len(normal)}"
        )

    # Root cause
    elif "root cause" in user_message or "analysis" in user_message:
        if critical:
            reply = "Root Cause Analysis:\n"
            for m in critical:
                reply += f"\n{m['name']}:\n"
                for issue in m["issues"]:
                    reply += f"- {issue}\n"
        else:
            reply = "No abnormal parameters detected."

    else:
        reply = (
            "I can help with:\n"
            "- System health summary\n"
            "- Root cause analysis\n"
            "- Motor reports\n"
            "- Maintenance suggestions\n"
        )

    return jsonify({"message": reply})
