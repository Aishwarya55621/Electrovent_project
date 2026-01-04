import joblib
import pandas as pd
from config import SCALER_PATH

FEATURES = [
    "Motor_Temperature",
    "Motor_Vibration",
    "Motor_Torque",
    "Battery_Temperature"
]

def preprocess(data_dict):
    df = pd.DataFrame([data_dict])[FEATURES]
    scaler = joblib.load(SCALER_PATH)
    return scaler.transform(df)
