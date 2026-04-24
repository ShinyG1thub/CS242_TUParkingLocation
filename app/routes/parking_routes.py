"""All Flask routes – clean and separated from logic.

This Controller layer acts as an API gateway, converting incoming
HTTP requests to Service calls, and responding with strict JSON.
"""
from typing import Tuple
from flask import Blueprint, jsonify, Response

from ..services.parking_service import parking_manager

parking_bp = Blueprint("parking", __name__)


@parking_bp.route("/api/parking", methods=["GET"])
def api_parking_areas() -> Response:
    """API endpoint to get all parking areas."""
    areas = parking_manager.get_all_parking_areas()
    return jsonify(areas)


@parking_bp.route("/api/parking/<int:area_id>", methods=["GET"])
def api_parking_detail(area_id: int) -> Tuple[Response, int] | Response:
    """API endpoint for one parking area and its slots."""
    area = parking_manager.get_parking_area_by_id(area_id)
    if not area:
        return jsonify({"error": "Parking area not found"}), 404

    slots = parking_manager.get_parking_slots(area_id)
    return jsonify({
        "area": area,
        "slots": slots
    })