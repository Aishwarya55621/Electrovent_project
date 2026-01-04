import joblib

model = joblib.load("models/isolation_forest.pkl")
scaler = joblib.load("models/scaler.pkl")

print("✅ Model and scaler loaded successfully")
