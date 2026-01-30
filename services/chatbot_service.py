# services/chatbot.py

def identify_anomaly_type(data):
    if data["Motor_Temperature"] > 90:
        return "Motor Overheating"
    if data["Motor_Vibration"] > 8:
        return "Excessive Vibration"
    if data["Motor_Torque"] > 350:
        return "Torque Abnormality"
    if data["Battery_Temperature"] > 45:
        return "Battery Overheating"
    return "Multivariate Pattern"


def evaluate_system(data):
    anomaly = identify_anomaly_type(data)

    if anomaly == "Multivariate Pattern":
        status = "DEGRADED"
        explanation = (
            "No single parameter exceeded critical thresholds, "
            "but combined deviations suggest abnormal behavior."
        )
    else:
        status = "UNHEALTHY"
        explanation = f"The system shows signs of {anomaly.lower()}."

    return status, anomaly, explanation
