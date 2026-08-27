from fastapi import APIRouter
from app.schemas.weather_schemas import LightningResponse
from app.services.weather_service import WeatherService

router = APIRouter(prefix="/api/lightning", tags=["Lightning"])

@router.get("", response_model=LightningResponse)
def get_lightning():
    return WeatherService.get_lightning_data()
