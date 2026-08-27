from typing import Optional
from fastapi import APIRouter, Query, Body
from app.schemas.weather_schemas import RouteNowcastResponse
from app.services.weather_service import WeatherService
from pydantic import BaseModel

router = APIRouter(prefix="/api/route-nowcast", tags=["Route Nowcast"])

class RouteRequest(BaseModel):
    origin: str = "Delhi"
    destination: str = "Ghaziabad"

@router.get("", response_model=RouteNowcastResponse)
def get_route_nowcast(
    origin: Optional[str] = Query("Delhi", description="Starting location"),
    destination: Optional[str] = Query("Ghaziabad", description="Destination location")
):
    return WeatherService.get_route_nowcast_data(origin=origin, destination=destination)

@router.post("", response_model=RouteNowcastResponse)
def calculate_route_nowcast(req: RouteRequest):
    return WeatherService.get_route_nowcast_data(origin=req.origin, destination=req.destination)
