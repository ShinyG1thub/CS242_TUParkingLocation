"""SQLAlchemy models for parking areas and slots."""

from ..extensions import db


class ParkingArea(db.Model):
    __tablename__ = 'parking_areas'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    total_slots = db.Column(db.Integer, nullable=False)
    available_slots = db.Column(db.Integer, nullable=False)

    # Relationship to slots (one-to-many)
    slots = db.relationship('ParkingSlot', backref='area', lazy=True)

    @property
    def unavailable_slots(self):
        return self.total_slots - self.available_slots


class ParkingSlot(db.Model):
    __tablename__ = 'parking_slots'

    id = db.Column(db.Integer, primary_key=True)
    area_id = db.Column(db.Integer, db.ForeignKey('parking_areas.id'), nullable=False)
    name = db.Column(db.String(20), nullable=False)
    status = db.Column(db.String(20), nullable=False)  # 'available' or 'occupied'