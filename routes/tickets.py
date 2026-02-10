from flask import Blueprint, jsonify
from database.ticket_db_service import get_all_tickets

tickets_bp = Blueprint("tickets", __name__)

@tickets_bp.route("/tickets", methods=["GET"])
def tickets():
    # Fetch tickets from DB service
    tickets = get_all_tickets()
    
    # Convert each ticket row to dict (assuming it's a Row or similar object)
    tickets_list = [dict(ticket) for ticket in tickets]
    
    # Return JSON response
    return jsonify(tickets_list)
