from fastapi import APIRouter
from app.schemas.weather_schemas import RadarResponse
from app.services.weather_service import WeatherService

router = APIRouter(prefix="/api/radar", tags=["Radar"])

@router.get("", response_model=RadarResponse)
def get_radar():
    return WeatherService.get_radar_data()
