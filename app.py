from flask import Flask
from routes.dashboard import dashboard_bp
from routes.auth import auth_bp
from routes.health import health_bp
from routes.api import api_bp
from routes.charts import charts_bp

# 👉 ADD THESE TWO
from routes.tickets import tickets_bp
from routes.ticket_routes import ticket_bp


def create_app():
    app = Flask(__name__)
    app.secret_key = "ev_secret_key"

    # Register Blueprints
    app.register_blueprint(auth_bp)
    app.register_blueprint(dashboard_bp)
    app.register_blueprint(health_bp)
    app.register_blueprint(api_bp)
    app.register_blueprint(charts_bp)

    # 👉 REGISTER YOUR PART
    app.register_blueprint(tickets_bp)
    app.register_blueprint(ticket_bp)

    return app


app = create_app()

if __name__ == "__main__":
    app.run(debug=True)


