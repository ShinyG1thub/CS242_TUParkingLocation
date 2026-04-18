"""TUparkingLocation - Flask Application Factory"""

from flask import Flask
from flask_cors import CORS
from .extensions import db
from .routes.parking_routes import parking_bp
from .models.parking import ParkingArea, ParkingSlot


def create_app():
    app = Flask(__name__)
    CORS(app)  # Enable CORS for Vite frontend
    
    # SQLite Database Configuration
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///tu_parking.db'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    # Initialize SQLAlchemy
    db.init_app(app)

    # Create tables and seed data
    with app.app_context():
        db.create_all()
        seed_mock_data()

    # Register routes
    app.register_blueprint(parking_bp)

    return app


def seed_mock_data():
    """Seed mock Thammasat University parking data"""
    if ParkingArea.query.count() > 0:
        return

    print("🌱 Seeding mock parking data for TUparkingLocation...")

    areas_data = [
        {"name": "GYM 7",       "total_slots": 60,  "available_slots": 22},
        {"name": "Parking 1",   "total_slots": 120, "available_slots": 8},
        {"name": "Parking 2",   "total_slots": 80,  "available_slots": 35},
        {"name": "Parking 3",   "total_slots": 45,  "available_slots": 12},
        {"name": "Parking 4",   "total_slots": 90,  "available_slots": 67},
    ]

    for data in areas_data:
        area = ParkingArea(
            name=data["name"],
            total_slots=data["total_slots"],
            available_slots=data["available_slots"]
        )
        db.session.add(area)
        db.session.flush()                     # Get ID for slots

        # Create slots
        for i in range(1, data["total_slots"] + 1):
            status = "available" if i <= data["available_slots"] else "occupied"
            slot = ParkingSlot(
                area_id=area.id,
                name=f"Slot-{i:02d}",
                status=status
            )
            db.session.add(slot)

    db.session.commit()
    print("✅ Mock data seeded successfully! Database is ready.")