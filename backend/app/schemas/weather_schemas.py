from datetime import datetime
from typing import List, Optional, Dict, Any
from pydantic import BaseModel, Field

# Location Schemas
class LocationBase(BaseModel):
    name: str
    district: str
    state: str
    latitude: float
    longitude: float
    is_default: Optional[bool] = False

class LocationResponse(LocationBase):
    id: int
    class Config:
        from_attributes = True

# Weather Schemas
class AQIInfo(BaseModel):
    aqi: int = 95
    status: str = "Satisfactory"
    color: str = "#8ED329"
    source: str = "National AQI-Source-CPCB"
    pm25: Optional[float] = 32.4
    pm10: Optional[float] = 68.1
    no2: Optional[float] = 18.2
    so2: Optional[float] = 8.5
    co: Optional[float] = 0.8
    o3: Optional[float] = 24.1

class CurrentWeatherResponse(BaseModel):
    location: str = "Raghunathpuri, Ghaziabad"
    district: str = "Ghaziabad"
    state: str = "Uttar Pradesh"
    date_str: str = "26 August 2026"
    updated_at: str = "07:30 PM"
    temperature: float = 35.19
    feels_like: float = 37.1
    maximum: float = 35.8
    minimum: float = 25.9
    humidity: int = 38
    wind_speed: float = 9.4
    wind_direction: str = "NW"
    wind_direction_deg: int = 315
    condition: str = "Partly Cloudy"
    icon: str = "cloud-sun"
    aqi: AQIInfo

class HourlyForecastItem(BaseModel):
    id: Optional[str] = None
    date_str: str
    time_str: str
    condition: str
    icon: str
    temperature: float
    humidity: int
    rain_probability: Optional[int] = 0
    wind_speed: Optional[float] = 8.0
    wind_direction: Optional[str] = "NW"

class DailyForecastItem(BaseModel):
    date_str: str        # e.g., "26 August 2026"
    date_short: str      # e.g., "26/08"
    day_name: str        # e.g., "Today", "Thursday", "Friday"
    condition: str       # e.g., "Partly cloudy sky with one or two spells of rain or thundershowers"
    icon: str            # e.g., "cloud-rain", "sun", "cloud-sun"
    min_temp: float      # e.g., 24.0
    max_temp: float      # e.g., 34.0
    humidity: int = 65
    rain_probability: int = 70
    wind_speed: float = 10.5
    wind_direction: str = "NW"
    pressure: float = 1004.2
    sunrise: str = "05:54 AM"
    sunset: str = "06:52 PM"
    hourly_breakdown: Optional[List[HourlyForecastItem]] = []

class WeatherAlertResponse(BaseModel):
    id: int
    location_name: str = "GHAZIABAD"
    alert_type: str = "Warning"
    severity: str = "Warning"
    description: str = "Thunder with Lightning and Light to Moderate spells of Rain"
    date_of_issue: str = "2026-08-26 1800 Hours"
    valid_upto: str = "2026-08-26 2100 Hours"
    status_text: str = "ALERT (BE PREPARED)"
    color: str = "#FFBE00"

# Favourites Schemas
class FavouriteCreate(BaseModel):
    location_name: str
    district: str
    state: str
    latitude: float
    longitude: float
    current_temp: Optional[float] = 33.5
    min_temp: Optional[float] = 24.0
    max_temp: Optional[float] = 34.5
    condition: Optional[str] = "Partly Cloudy"

class FavouriteResponse(BaseModel):
    id: int
    location_name: str
    district: str
    state: str
    latitude: float
    longitude: float
    current_temp: float
    min_temp: float
    max_temp: float
    condition: str
    created_at: Optional[datetime] = None

    class Config:
        from_attributes = True

# Notification Schemas
class NotificationResponse(BaseModel):
    id: int
    title: str
    description: str
    category: str
    severity: str
    area: str
    timestamp: str
    is_read: bool = False

    class Config:
        from_attributes = True

# Crowd Source Schemas
class CrowdReportCreate(BaseModel):
    location_name: str
    condition: str
    severity: str
    description: str
    image_url: Optional[str] = None
    reporter_name: Optional[str] = "Anonymous Citizen"

class CrowdReportResponse(BaseModel):
    id: int
    location_name: str
    condition: str
    severity: str
    description: str
    image_url: Optional[str] = None
    reporter_name: str
    timestamp: str

    class Config:
        from_attributes = True

# Settings Schemas
class UserSettingsSchema(BaseModel):
    language: str = "English"
    temp_unit: str = "°C"
    wind_unit: str = "Km/h"
    rain_unit: str = "mm"
    push_notifications: bool = True
    auto_location: bool = True

# Radar and Map Schemas
class RadarOverlayPoint(BaseModel):
    lat: float
    lon: float
    intensity: float # dBZ: 10 to 65
    level: str       # Light, Moderate, Heavy, Severe

class RadarResponse(BaseModel):
    station: str = "DWR Palam, Delhi"
    lat: float = 28.56
    lon: float = 77.10
    timestamp: str = "26 Aug 2026, 19:30 IST"
    range_km: int = 250
    reflectivity_points: List[RadarOverlayPoint]
    active_warnings: List[str]

class RainAlertTimeline(BaseModel):
    time_range: str = "7:43 PM - 8:13 PM"
    current_step: int = 0
    total_steps: int = 6
    intervals: List[str]
    forecast_points: List[Dict[str, Any]]
    legend: List[Dict[str, str]]

class CycloneTrackPoint(BaseModel):
    time: str
    lat: float
    lon: float
    intensity_knots: int
    category: str
    pressure_hpa: int

class CycloneResponse(BaseModel):
    name: str = "Cyclone 'PRAVAH'"
    status: str = "Very Severe Cyclonic Storm"
    basin: str = "Bay of Bengal"
    current_lat: float = 19.8
    current_lon: float = 87.2
    max_wind_speed: str = "120-130 km/h gusting to 145 km/h"
    estimated_landfall: str = "27 Aug 2026, 06:00 IST near Puri Coast"
    warning_level: str = "Red Alert"
    track: List[CycloneTrackPoint]
    bulletin_text: str

class LightningStrike(BaseModel):
    id: str
    lat: float
    lon: float
    time: str
    peak_current_ka: float
    strike_type: str # Cloud-to-Ground, Intra-Cloud

class LightningResponse(BaseModel):
    station_area: str = "Delhi-NCR & Western Uttar Pradesh"
    total_strikes_last_hour: int = 142
    risk_level: str = "High Risk"
    strikes: List[LightningStrike]
    safety_advisory: str

class AirportWeather(BaseModel):
    icao: str
    name: str
    city: str
    lat: float
    lon: float
    temp: float
    dew_point: float
    visibility_m: int
    wind_direction_deg: int
    wind_speed_kt: int
    flight_rules: str # VFR, MVFR, IFR
    qnh: float
    metar: str
    taf: str

class AviationResponse(BaseModel):
    airports: List[AirportWeather]
    fir: str = "Delhi FIR"
    sigmet: Optional[str] = "WSIN31 VIDP 261800 VIDP SIGMET 02 VALID 261800/262200 VIDP- DELHI FIR EMBD TS OBS AT 1800Z N2830 E07720 TOP FL380 MOV ENE 15KT NC="

class CropAdvisory(BaseModel):
    crop: str
    stage: str
    advisory: str

class DistrictAgrometBulletin(BaseModel):
    district: str
    state: str
    bulletin_date: str
    rainfall_forecast: str
    temp_forecast: str
    humidity_forecast: str
    general_advisory: str
    crop_advisories: List[CropAdvisory]

class AgrometResponse(BaseModel):
    active_district: str = "Ghaziabad"
    state: str = "Uttar Pradesh"
    bulletins: List[DistrictAgrometBulletin]

class RoutePointWeather(BaseModel):
    name: str
    distance_km: float
    lat: float
    lon: float
    temp: float
    condition: str
    rain_probability: int
    warning: Optional[str] = None

class RouteNowcastResponse(BaseModel):
    origin: str
    destination: str
    total_distance_km: float
    estimated_time: str
    route_condition_summary: str
    waypoints: List[RoutePointWeather]
