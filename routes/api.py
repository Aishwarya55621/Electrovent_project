from flask import Blueprint, jsonify
from database.db import get_db

api_bp = Blueprint("api", __name__)

@api_bp.route("/api/chart-data")
def chart_data():
    conn = get_db()
    cur = conn.cursor()

    cur.execute("""
        SELECT severity, COUNT(*)
        FROM tickets
        GROUP BY severity
    """)

    data = cur.fetchall()
    conn.close()

    labels = [d[0] for d in data]
    values = [d[1] for d in data]

    return jsonify({"labels": labels, "values": values})
