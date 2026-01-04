from flask import Blueprint, jsonify
from database.ticket_service import get_all_tickets

tickets_bp = Blueprint("tickets", __name__)

@tickets_bp.route("/tickets", methods=["GET"])
def tickets():
    tickets = get_all_tickets()
    return jsonify([dict(t) for t in tickets])
