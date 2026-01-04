from datetime import datetime
from database.db import get_db_connection

def init_db():
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS tickets (
        ticket_id INTEGER PRIMARY KEY AUTOINCREMENT,
        timestamp TEXT,
        anomaly_type TEXT,
        severity TEXT,
        anomaly_score REAL,
        status TEXT
    )
    """)
    conn.commit()

def create_ticket(anomaly_type, severity, score):
    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute("""
    INSERT INTO tickets (timestamp, anomaly_type, severity, anomaly_score, status)
    VALUES (?, ?, ?, ?, ?)
    """, (
        datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
        anomaly_type,
        severity,
        score,
        "OPEN"
    ))

    conn.commit()

def get_all_tickets():
    conn = get_db_connection()
    return conn.execute("SELECT * FROM tickets ORDER BY ticket_id DESC").fetchall()
