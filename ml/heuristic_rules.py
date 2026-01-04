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
