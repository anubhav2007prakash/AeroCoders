from fastapi import APIRouter
from app.schemas.weather_schemas import CycloneResponse
from app.services.weather_service import WeatherService

router = APIRouter(prefix="/api/cyclone", tags=["Cyclone"])

@router.get("", response_model=CycloneResponse)
def get_cyclone():
    return WeatherService.get_cyclone_data()
