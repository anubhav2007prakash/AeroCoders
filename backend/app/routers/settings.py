from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.weather_models import UserSettings
from app.schemas.weather_schemas import UserSettingsSchema

router = APIRouter(prefix="/api/settings", tags=["Settings"])

@router.get("", response_model=UserSettingsSchema)
def get_settings(db: Session = Depends(get_db)):
    settings = db.query(UserSettings).first()
    if not settings:
        settings = UserSettings()
        db.add(settings)
        db.commit()
        db.refresh(settings)
    return settings

@router.put("", response_model=UserSettingsSchema)
def update_settings(new_settings: UserSettingsSchema, db: Session = Depends(get_db)):
    settings = db.query(UserSettings).first()
    if not settings:
        settings = UserSettings()
        db.add(settings)
    
    settings.language = new_settings.language
    settings.temp_unit = new_settings.temp_unit
    settings.wind_unit = new_settings.wind_unit
    settings.rain_unit = new_settings.rain_unit
    settings.push_notifications = new_settings.push_notifications
    settings.auto_location = new_settings.auto_location
    
    db.commit()
    db.refresh(settings)
    return settings
