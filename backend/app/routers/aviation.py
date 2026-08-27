from fastapi import APIRouter
from app.schemas.weather_schemas import AviationResponse
from app.services.weather_service import WeatherService

router = APIRouter(prefix="/api/aviation", tags=["Aviation"])

@router.get("", response_model=AviationResponse)
def get_aviation():
    return WeatherService.get_aviation_data()
