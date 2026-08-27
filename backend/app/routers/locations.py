from typing import List
from fastapi import APIRouter, Query, Depends
from sqlalchemy.orm import Session
from sqlalchemy import or_
from app.database import get_db
from app.models.weather_models import Location
from app.schemas.weather_schemas import LocationResponse

router = APIRouter(prefix="/api/locations", tags=["Locations"])

@router.get("/search", response_model=List[LocationResponse])
def search_locations(q: str = Query(..., min_length=1), db: Session = Depends(get_db)):
    query = f"%{q}%"
    results = db.query(Location).filter(
        or_(
            Location.name.ilike(query),
            Location.district.ilike(query),
            Location.state.ilike(query)
        )
    ).limit(15).all()
    return results

@router.get("/default", response_model=LocationResponse)
def get_default_location(db: Session = Depends(get_db)):
    default_loc = db.query(Location).filter(Location.is_default == True).first()
    if not default_loc:
        default_loc = db.query(Location).first()
    return default_loc

@router.get("/all", response_model=List[LocationResponse])
def get_all_locations(db: Session = Depends(get_db)):
    return db.query(Location).all()
