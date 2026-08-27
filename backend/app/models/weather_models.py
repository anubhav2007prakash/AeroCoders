from datetime import datetime
from sqlalchemy import Column, Integer, String, Float, Boolean, DateTime, Text
from app.database import Base

class Location(Base):
    __tablename__ = "locations"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), index=True)
    district = Column(String(100), index=True)
    state = Column(String(100), index=True)
    latitude = Column(Float)
    longitude = Column(Float)
    is_default = Column(Boolean, default=False)

class Favourite(Base):
    __tablename__ = "favourites"

    id = Column(Integer, primary_key=True, index=True)
    location_name = Column(String(100), index=True)
    district = Column(String(100))
    state = Column(String(100))
    latitude = Column(Float)
    longitude = Column(Float)
    current_temp = Column(Float, default=32.0)
    min_temp = Column(Float, default=24.0)
    max_temp = Column(Float, default=35.0)
    condition = Column(String(100), default="Partly Cloudy")
    created_at = Column(DateTime, default=datetime.utcnow)

class Notification(Base):
    __tablename__ = "notifications"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(200))
    description = Column(Text)
    category = Column(String(50)) # Thunderstorm, Heavy Rain, Lightning, Heatwave, Cyclone
    severity = Column(String(20)) # Red, Orange, Yellow, Green
    area = Column(String(100))
    timestamp = Column(String(50))
    is_read = Column(Boolean, default=False)

class WeatherAlert(Base):
    __tablename__ = "weather_alerts"

    id = Column(Integer, primary_key=True, index=True)
    location_name = Column(String(100), index=True)
    alert_type = Column(String(100)) # Warning, Advisory, Watch
    severity = Column(String(50)) # Warning (Be Prepared), Watch (Be Updated), Alert (Take Action)
    description = Column(Text)
    date_of_issue = Column(String(100))
    valid_upto = Column(String(100))
    status_text = Column(String(100), default="ALERT (BE PREPARED)")
    is_active = Column(Boolean, default=True)

class CrowdReport(Base):
    __tablename__ = "crowd_reports"

    id = Column(Integer, primary_key=True, index=True)
    location_name = Column(String(150))
    condition = Column(String(100)) # Heavy Rain, Thunderstorm, Hail, Waterlogging, Clear
    severity = Column(String(50)) # Low, Moderate, High, Severe
    description = Column(Text)
    image_url = Column(String(255), nullable=True)
    reporter_name = Column(String(100), default="Anonymous Citizen")
    timestamp = Column(String(50))

class UserSettings(Base):
    __tablename__ = "user_settings"

    id = Column(Integer, primary_key=True, index=True)
    language = Column(String(50), default="English")
    temp_unit = Column(String(10), default="°C")
    wind_unit = Column(String(10), default="Km/h")
    rain_unit = Column(String(10), default="mm")
    push_notifications = Column(Boolean, default=True)
    auto_location = Column(Boolean, default=True)
