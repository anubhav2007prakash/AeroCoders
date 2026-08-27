from typing import List, Optional
from fastapi import APIRouter, Query, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app.schemas.weather_schemas import CurrentWeatherResponse, HourlyForecastItem, DailyForecastItem, WeatherAlertResponse, AQIInfo
from app.services.weather_service import WeatherService

router = APIRouter(prefix="/api/weather", tags=["Weather"])

@router.get("/current", response_model=CurrentWeatherResponse)
def get_current_weather(
    lat: Optional[float] = Query(None, description="Latitude"),
    lon: Optional[float] = Query(None, description="Longitude"),
    location: Optional[str] = Query(None, description="Location name")
):
    return WeatherService.get_current_weather(lat=lat, lon=lon, location_name=location)

@router.get("/forecast", response_model=List[DailyForecastItem])
def get_daily_forecast(
    lat: Optional[float] = Query(None, description="Latitude"),
    lon: Optional[float] = Query(None, description="Longitude")
):
    return WeatherService.get_daily_forecast(lat=lat, lon=lon)

@router.get("/hourly", response_model=List[HourlyForecastItem])
def get_hourly_forecast(
    lat: Optional[float] = Query(None, description="Latitude"),
    lon: Optional[float] = Query(None, description="Longitude")
):
    return WeatherService.get_hourly_forecast(lat=lat, lon=lon)

@router.get("/aqi", response_model=AQIInfo)
def get_aqi(
    lat: Optional[float] = Query(None, description="Latitude"),
    lon: Optional[float] = Query(None, description="Longitude")
):
    weather = WeatherService.get_current_weather(lat=lat, lon=lon)
    return weather.aqi

@router.get("/alerts", response_model=List[WeatherAlertResponse])
def get_weather_alerts(
    lat: Optional[float] = Query(None, description="Latitude"),
    lon: Optional[float] = Query(None, description="Longitude")
):
    return WeatherService.get_weather_alerts(lat=lat, lon=lon)
