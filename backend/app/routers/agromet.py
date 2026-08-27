from typing import Optional
from fastapi import APIRouter, Query
from app.schemas.weather_schemas import AgrometResponse
from app.services.weather_service import WeatherService

router = APIRouter(prefix="/api/agromet", tags=["Agromet"])

@router.get("", response_model=AgrometResponse)
def get_agromet(district: Optional[str] = Query("Ghaziabad", description="District Name")):
    return WeatherService.get_agromet_data(district_name=district)
