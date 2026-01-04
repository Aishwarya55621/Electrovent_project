from flask import Flask
from routes.dashboard import dashboard_bp
from routes.auth import auth_bp
from routes.health import health_bp

def create_app():
    app = Flask(__name__)
    app.secret_key = "ev_secret_key"

    app.register_blueprint(auth_bp)
    app.register_blueprint(dashboard_bp)
    app.register_blueprint(health_bp)

    return app

app = create_app()

if __name__ == "__main__":
    app.run(debug=True)

