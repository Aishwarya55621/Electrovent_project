import joblib
from config import MODEL_PATH, SCALER_PATH

model = joblib.load(MODEL_PATH)
scaler = joblib.load(SCALER_PATH)

def predict_anomaly(data):
    scaled = scaler.transform([data])
    pred = model.predict(scaled)[0]
    score = model.decision_function(scaled)[0]
    return pred, score
