from datetime import datetime
from database.db import get_db

def create_ticket(anomaly_type, severity):
    conn = get_db()
    cur = conn.cursor()

    cur.execute("""
        CREATE TABLE IF NOT EXISTS tickets (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            timestamp TEXT,
            anomaly_type TEXT,
            severity TEXT,
            status TEXT
        )
    """)

    cur.execute("""
        INSERT INTO tickets (timestamp, anomaly_type, severity, status)
        VALUES (?, ?, ?, ?)
    """, (datetime.now(), anomaly_type, severity, "OPEN"))

    conn.commit()
    conn.close()
