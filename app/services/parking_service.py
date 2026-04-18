"""Business logic using SQLAlchemy models.

This layer handles database interactions and cleanly returns 
standardized dictionaries to the API controller.
"""
from typing import List, Optional, TypedDict

from ..models.parking import ParkingArea, ParkingSlot


class ParkingAreaDict(TypedDict):
    id: int
    name: str
    total_slots: int
    available_slots: int
    unavailable_slots: int


class ParkingSlotDict(TypedDict):
    name: str
    status: str


def get_all_parking_areas() -> List[ParkingAreaDict]:
    """Retrieve all parking areas with calculated slot bounds."""
    areas: List[ParkingArea] = ParkingArea.query.all()
    return [
        {
            "id": area.id,
            "name": area.name,
            "total_slots": area.total_slots,
            "available_slots": area.available_slots,
            "unavailable_slots": area.unavailable_slots,
        }
        for area in areas
    ]


def get_parking_area_by_id(area_id: int) -> Optional[ParkingAreaDict]:
    """Retrieve a single parking area by its ID."""
    area: Optional[ParkingArea] = ParkingArea.query.get(area_id)
    if not area:
        return None
    return {
        "id": area.id,
        "name": area.name,
        "total_slots": area.total_slots,
        "available_slots": area.available_slots,
        "unavailable_slots": area.unavailable_slots,
    }


def get_parking_slots(area_id: int) -> List[ParkingSlotDict]:
    """Retrieve all slots belonging to a specific parking area."""
    slots: List[ParkingSlot] = ParkingSlot.query.filter_by(area_id=area_id).order_by(ParkingSlot.name).all()
    return [{"name": s.name, "status": s.status} for s in slots]