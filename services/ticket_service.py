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


def get_recent_tickets(limit=10):
    conn = get_db()
    cur = conn.cursor()

    cur.execute("""
        SELECT id, timestamp, anomaly_type, severity, status
        FROM tickets
        ORDER BY timestamp DESC
        LIMIT ?
    """, (limit,))

    rows = cur.fetchall()
    conn.close()
    return rows
