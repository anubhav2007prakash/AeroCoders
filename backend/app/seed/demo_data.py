from app.database import SessionLocal, engine, Base
from app.models.weather_models import Location, Favourite, Notification, WeatherAlert, CrowdReport, UserSettings

INDIAN_LOCATIONS = [
    {
        "name": "Raghunathpuri, Ghaziabad",
        "district": "Ghaziabad",
        "state": "Uttar Pradesh",
        "latitude": 28.6692,
        "longitude": 77.4538,
        "is_default": True
    },
    {
        "name": "Connaught Place, New Delhi",
        "district": "New Delhi",
        "state": "Delhi",
        "latitude": 28.6315,
        "longitude": 77.2167,
        "is_default": False
    },
    {
        "name": "Colaba, Mumbai",
        "district": "Mumbai City",
        "state": "Maharashtra",
        "latitude": 18.9067,
        "longitude": 72.8147,
        "is_default": False
    },
    {
        "name": "Hazratganj, Lucknow",
        "district": "Lucknow",
        "state": "Uttar Pradesh",
        "latitude": 26.8467,
        "longitude": 80.9462,
        "is_default": False
    },
    {
        "name": "T Nagar, Chennai",
        "district": "Chennai",
        "state": "Tamil Nadu",
        "latitude": 13.0418,
        "longitude": 80.2341,
        "is_default": False
    },
    {
        "name": "Park Street, Kolkata",
        "district": "Kolkata",
        "state": "West Bengal",
        "latitude": 22.5512,
        "longitude": 88.3524,
        "is_default": False
    },
    {
        "name": "Indiranagar, Bengaluru",
        "district": "Bengaluru Urban",
        "state": "Karnataka",
        "latitude": 12.9784,
        "longitude": 77.6408,
        "is_default": False
    },
    {
        "name": "Pink City, Jaipur",
        "district": "Jaipur",
        "state": "Rajasthan",
        "latitude": 26.9124,
        "longitude": 75.7873,
        "is_default": False
    },
    {
        "name": "Sector 17, Chandigarh",
        "district": "Chandigarh",
        "state": "Chandigarh",
        "latitude": 30.7333,
        "longitude": 76.7794,
        "is_default": False
    },
    {
        "name": "Kankarbagh, Patna",
        "district": "Patna",
        "state": "Bihar",
        "latitude": 25.5941,
        "longitude": 85.1376,
        "is_default": False
    }
]

DEFAULT_FAVOURITES = [
    {
        "location_name": "Raghunathpuri, Ghaziabad",
        "district": "Ghaziabad",
        "state": "Uttar Pradesh",
        "latitude": 28.6692,
        "longitude": 77.4538,
        "current_temp": 35.19,
        "min_temp": 24.0,
        "max_temp": 34.0,
        "condition": "Partly Cloudy"
    },
    {
        "location_name": "New Delhi",
        "district": "New Delhi",
        "state": "Delhi",
        "latitude": 28.6139,
        "longitude": 77.2090,
        "current_temp": 34.8,
        "min_temp": 25.0,
        "max_temp": 35.5,
        "condition": "Thunderstorm with rain"
    },
    {
        "location_name": "Mumbai",
        "district": "Mumbai Suburban",
        "state": "Maharashtra",
        "latitude": 19.0760,
        "longitude": 72.8777,
        "current_temp": 30.2,
        "min_temp": 26.5,
        "max_temp": 31.8,
        "condition": "Heavy Rain"
    },
    {
        "location_name": "Lucknow",
        "district": "Lucknow",
        "state": "Uttar Pradesh",
        "latitude": 26.8467,
        "longitude": 80.9462,
        "current_temp": 33.4,
        "min_temp": 25.2,
        "max_temp": 34.6,
        "condition": "Mainly Clear sky"
    }
]

DEFAULT_NOTIFICATIONS = [
    {
        "title": "Thunderstorm and Lightning Alert",
        "description": "Thunderstorm accompanied with lightning and moderate spells of rain very likely over Ghaziabad, Noida, Delhi and Meerut.",
        "category": "Thunderstorm",
        "severity": "Orange",
        "area": "NCR - Ghaziabad",
        "timestamp": "26 Aug 2026, 18:00 IST",
        "is_read": False
    },
    {
        "title": "Heavy Rain Warning for Western UP",
        "description": "Isolated heavy to very heavy rainfall expected during next 24 hours over Gautam Buddha Nagar, Ghaziabad, and Bulandshahr.",
        "category": "Heavy Rain",
        "severity": "Yellow",
        "area": "Western Uttar Pradesh",
        "timestamp": "26 Aug 2026, 15:30 IST",
        "is_read": False
    },
    {
        "title": "Lightning Warning - Take Precaution",
        "description": "Cloud-to-ground lightning activity detected. People are advised to stay indoors and avoid taking shelter under trees.",
        "category": "Lightning",
        "severity": "Orange",
        "area": "Ghaziabad & Delhi",
        "timestamp": "26 Aug 2026, 17:15 IST",
        "is_read": True
    },
    {
        "title": "Cyclone 'PRAVAH' Special Bulletin",
        "description": "Very severe cyclonic storm moving northwestwards over Bay of Bengal. Coastal Odisha and West Bengal placed under high alert.",
        "category": "Cyclone",
        "severity": "Red",
        "area": "Bay of Bengal / Odisha Coast",
        "timestamp": "26 Aug 2026, 12:00 IST",
        "is_read": True
    }
]

DEFAULT_ALERTS = [
    {
        "location_name": "GHAZIABAD",
        "alert_type": "Warning",
        "severity": "Warning",
        "description": "Thunder with Lightning and Light to Moderate spells of Rain",
        "date_of_issue": "2026-08-26 1800 Hours",
        "valid_upto": "2026-08-26 2100 Hours",
        "status_text": "ALERT (BE PREPARED)",
        "is_active": True
    },
    {
        "location_name": "DELHI",
        "alert_type": "Advisory",
        "severity": "Watch",
        "description": "Light to moderate rain with gusty winds (30-40 kmph)",
        "date_of_issue": "2026-08-26 1730 Hours",
        "valid_upto": "2026-08-26 2030 Hours",
        "status_text": "WATCH (BE UPDATED)",
        "is_active": True
    }
]

DEFAULT_CROWD_REPORTS = [
    {
        "location_name": "Raj Nagar Extension, Ghaziabad",
        "condition": "Moderate Rain with Gusty Winds",
        "severity": "Moderate",
        "description": "Rain started 20 minutes ago. Tree branches swaying heavily, mild water logging on service road.",
        "image_url": None,
        "reporter_name": "Amit Sharma",
        "timestamp": "26 Aug 2026, 19:10 IST"
    },
    {
        "location_name": "Indirapuram, Ghaziabad",
        "condition": "Heavy Downpour & Lightning",
        "severity": "High",
        "description": "Intense lightning strikes nearby and rapid water accumulation near Shipra Mall.",
        "image_url": None,
        "reporter_name": "Pooja Verma",
        "timestamp": "26 Aug 2026, 18:45 IST"
    },
    {
        "location_name": "Vasundhara Sector 14",
        "condition": "Thunder with light drizzle",
        "severity": "Low",
        "description": "Overcast sky, cool breeze and mild drizzle.",
        "image_url": None,
        "reporter_name": "Rohan Gupta",
        "timestamp": "26 Aug 2026, 18:20 IST"
    }
]

def seed_database():
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()
    try:
        # Check if locations already exist
        if db.query(Location).count() == 0:
            for loc in INDIAN_LOCATIONS:
                db.add(Location(**loc))
            db.commit()

        if db.query(Favourite).count() == 0:
            for fav in DEFAULT_FAVOURITES:
                db.add(Favourite(**fav))
            db.commit()

        if db.query(Notification).count() == 0:
            for notif in DEFAULT_NOTIFICATIONS:
                db.add(Notification(**notif))
            db.commit()

        if db.query(WeatherAlert).count() == 0:
            for alt in DEFAULT_ALERTS:
                db.add(WeatherAlert(**alt))
            db.commit()

        if db.query(CrowdReport).count() == 0:
            for cr in DEFAULT_CROWD_REPORTS:
                db.add(CrowdReport(**cr))
            db.commit()

        if db.query(UserSettings).count() == 0:
            db.add(UserSettings(
                language="English",
                temp_unit="°C",
                wind_unit="Km/h",
                rain_unit="mm",
                push_notifications=True,
                auto_location=True
            ))
            db.commit()
    finally:
        db.close()
