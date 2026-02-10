from flask import Blueprint, request, jsonify
from ml.preprocessing import preprocess
from ml.anomaly_model import load_model
from ml.heuristic_rules import identify_anomaly_type
from database.ticket_db_service import create_ticket
from services.sms_service import send_sms

predict_bp = Blueprint("predict", __name__)
model = load_model()

@predict_bp.route("/predict", methods=["POST"])
def predict():
    data = request.json
    X = preprocess(data)

    score = model.decision_function(X)[0]
    label = model.predict(X)[0]

    if label == -1:
        severity = "HIGH" if score < -0.1 else "MEDIUM"
        anomaly_type = identify_anomaly_type(data)
        create_ticket(anomaly_type, severity, score)

        if severity == "HIGH":
            send_sms(f"⚠️ {anomaly_type} detected. Severity: {severity}")

        return jsonify({"status": "ANOMALY", "severity": severity})

    return jsonify({"status": "NORMAL"})
