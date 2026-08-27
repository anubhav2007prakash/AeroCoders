from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.weather_models import Favourite
from app.schemas.weather_schemas import FavouriteCreate, FavouriteResponse

router = APIRouter(prefix="/api/favourites", tags=["Favourites"])

@router.get("", response_model=List[FavouriteResponse])
def get_favourites(db: Session = Depends(get_db)):
    return db.query(Favourite).order_by(Favourite.id.desc()).all()

@router.post("", response_model=FavouriteResponse, status_code=status.HTTP_201_CREATED)
def add_favourite(fav: FavouriteCreate, db: Session = Depends(get_db)):
    existing = db.query(Favourite).filter(
        Favourite.location_name == fav.location_name
    ).first()
    if existing:
        return existing
    
    new_fav = Favourite(
        location_name=fav.location_name,
        district=fav.district,
        state=fav.state,
        latitude=fav.latitude,
        longitude=fav.longitude,
        current_temp=fav.current_temp,
        min_temp=fav.min_temp,
        max_temp=fav.max_temp,
        condition=fav.condition
    )
    db.add(new_fav)
    db.commit()
    db.refresh(new_fav)
    return new_fav

@router.delete("/{id}", status_code=status.HTTP_200_OK)
def remove_favourite(id: int, db: Session = Depends(get_db)):
    fav = db.query(Favourite).filter(Favourite.id == id).first()
    if not fav:
        raise HTTPException(status_code=404, detail="Favourite not found")
    db.delete(fav)
    db.commit()
    return {"message": "Favourite removed successfully", "id": id}
