from fastapi import APIRouter
from app.schemas.weather_schemas import RainAlertTimeline
from app.services.weather_service import WeatherService

router = APIRouter(prefix="/api/rain-alert", tags=["Rain Alert"])

@router.get("", response_model=RainAlertTimeline)
def get_rain_alert():
    return WeatherService.get_rain_alert_data()
