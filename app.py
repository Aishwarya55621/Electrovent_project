from flask import Flask
from routes.dashboard import dashboard_bp
from routes.auth import auth_bp
from routes.health import health_bp
from routes.api import api_bp
from routes.charts import charts_bp
from routes.chatbot import chatbot_bp


def create_app():
    app = Flask(__name__)
    app.secret_key = "ev_secret_key"

    # Register Blueprints
    app.register_blueprint(auth_bp)
    app.register_blueprint(dashboard_bp)
    app.register_blueprint(health_bp)
    app.register_blueprint(api_bp)
    app.register_blueprint(charts_bp)

    # Register Chatbot with URL prefix
    app.register_blueprint(chatbot_bp, url_prefix="/chat")

    return app


app = create_app()

if __name__ == "__main__":
    app.run(debug=True)
