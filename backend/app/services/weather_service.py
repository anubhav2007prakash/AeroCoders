from typing import List, Optional, Dict, Any
from app.schemas.weather_schemas import (
    CurrentWeatherResponse, AQIInfo, HourlyForecastItem, DailyForecastItem,
    WeatherAlertResponse, RadarResponse, RadarOverlayPoint, RainAlertTimeline,
    CycloneResponse, CycloneTrackPoint, LightningResponse, LightningStrike,
    AviationResponse, AirportWeather, AgrometResponse, DistrictAgrometBulletin, CropAdvisory,
    RouteNowcastResponse, RoutePointWeather
)

class WeatherService:
    @staticmethod
    def get_current_weather(lat: Optional[float] = None, lon: Optional[float] = None, location_name: Optional[str] = None) -> CurrentWeatherResponse:
        # Default to Ghaziabad baseline if not specified or near Ghaziabad/Delhi
        loc_name = location_name or "Raghunathpuri, Ghaziabad"
        district = "Ghaziabad"
        state = "Uttar Pradesh"
        temp = 35.19
        feels_like = 37.1
        max_temp = 35.8
        min_temp = 25.9
        humidity = 38
        wind_speed = 9.4
        wind_dir = "NW"
        wind_deg = 315
        aqi_val = 95
        aqi_status = "Satisfactory"

        if location_name:
            ln = location_name.lower()
            if "mumbai" in ln:
                district = "Mumbai City"
                state = "Maharashtra"
                temp = 30.2
                feels_like = 34.5
                max_temp = 31.8
                min_temp = 26.5
                humidity = 82
                wind_speed = 18.5
                wind_dir = "SW"
                wind_deg = 225
                aqi_val = 62
                aqi_status = "Satisfactory"
            elif "delhi" in ln:
                district = "New Delhi"
                state = "Delhi"
                temp = 34.8
                feels_like = 36.9
                max_temp = 35.5
                min_temp = 25.0
                humidity = 42
                wind_speed = 11.2
                wind_dir = "WNW"
                wind_deg = 290
                aqi_val = 112
                aqi_status = "Moderate"
            elif "lucknow" in ln:
                district = "Lucknow"
                state = "Uttar Pradesh"
                temp = 33.4
                feels_like = 35.8
                max_temp = 34.6
                min_temp = 25.2
                humidity = 48
                wind_speed = 8.1
                wind_dir = "E"
                wind_deg = 90
                aqi_val = 88
                aqi_status = "Satisfactory"
            elif "chennai" in ln:
                district = "Chennai"
                state = "Tamil Nadu"
                temp = 32.6
                feels_like = 38.0
                max_temp = 33.8
                min_temp = 27.1
                humidity = 76
                wind_speed = 14.0
                wind_dir = "SE"
                wind_deg = 135
                aqi_val = 55
                aqi_status = "Good"

        return CurrentWeatherResponse(
            location=loc_name,
            district=district,
            state=state,
            date_str="26 August 2026",
            updated_at="07:30 PM",
            temperature=temp,
            feels_like=feels_like,
            maximum=max_temp,
            minimum=min_temp,
            humidity=humidity,
            wind_speed=wind_speed,
            wind_direction=wind_dir,
            wind_direction_deg=wind_deg,
            condition="Partly Cloudy",
            icon="cloud-sun",
            aqi=AQIInfo(
                aqi=aqi_val,
                status=aqi_status,
                color="#8ED329" if aqi_val <= 100 else "#FFBE00",
                source="National AQI-Source-CPCB",
                pm25=32.4,
                pm10=68.1,
                no2=18.2,
                so2=8.5,
                co=0.8,
                o3=24.1
            )
        )

    @staticmethod
    def get_hourly_forecast(lat: Optional[float] = None, lon: Optional[float] = None) -> List[HourlyForecastItem]:
        # 3-hourly forecast matching reference
        return [
            HourlyForecastItem(
                id="h1",
                date_str="26 August",
                time_str="08:30 pm",
                condition="Partly Cloudy",
                icon="cloud-sun",
                temperature=34.63,
                humidity=55,
                rain_probability=30,
                wind_speed=8.5,
                wind_direction="NW"
            ),
            HourlyForecastItem(
                id="h2",
                date_str="26 August",
                time_str="11:30 pm",
                condition="Overcast Sky",
                icon="cloud",
                temperature=32.83,
                humidity=62,
                rain_probability=45,
                wind_speed=7.8,
                wind_direction="NW"
            ),
            HourlyForecastItem(
                id="h3",
                date_str="27 August",
                time_str="02:30 am",
                condition="Overcast Sky",
                icon="cloud",
                temperature=32.43,
                humidity=67,
                rain_probability=60,
                wind_speed=6.5,
                wind_direction="W"
            ),
            HourlyForecastItem(
                id="h4",
                date_str="27 August",
                time_str="05:30 am",
                condition="Light Rain / Drizzle",
                icon="cloud-drizzle",
                temperature=28.10,
                humidity=75,
                rain_probability=75,
                wind_speed=9.0,
                wind_direction="NW"
            ),
            HourlyForecastItem(
                id="h5",
                date_str="27 August",
                time_str="08:30 am",
                condition="Partly Cloudy",
                icon="cloud-sun",
                temperature=30.40,
                humidity=68,
                rain_probability=40,
                wind_speed=8.2,
                wind_direction="NW"
            ),
            HourlyForecastItem(
                id="h6",
                date_str="27 August",
                time_str="11:30 am",
                condition="Thunderstorm with Rain",
                icon="cloud-lightning",
                temperature=33.20,
                humidity=60,
                rain_probability=80,
                wind_speed=14.5,
                wind_direction="N"
            ),
            HourlyForecastItem(
                id="h7",
                date_str="27 August",
                time_str="02:30 pm",
                condition="Thunderstorm",
                icon="cloud-lightning",
                temperature=34.00,
                humidity=58,
                rain_probability=70,
                wind_speed=12.0,
                wind_direction="NNW"
            ),
            HourlyForecastItem(
                id="h8",
                date_str="27 August",
                time_str="05:30 pm",
                condition="Scattered Rain",
                icon="cloud-rain",
                temperature=31.50,
                humidity=66,
                rain_probability=50,
                wind_speed=10.0,
                wind_direction="NW"
            )
        ]

    @staticmethod
    def get_daily_forecast(lat: Optional[float] = None, lon: Optional[float] = None) -> List[DailyForecastItem]:
        # 7-Day forecast matching reference images
        return [
            DailyForecastItem(
                date_str="26 August 2026",
                date_short="26/08",
                day_name="Today",
                condition="Partly cloudy sky with one or two spells of rain or thundershowers",
                icon="cloud-rain",
                min_temp=24.0,
                max_temp=34.0,
                humidity=65,
                rain_probability=75,
                wind_speed=9.4,
                wind_direction="NW",
                pressure=1003.5,
                sunrise="05:54 AM",
                sunset="06:52 PM"
            ),
            DailyForecastItem(
                date_str="27 August 2026",
                date_short="27/08",
                day_name="Thursday",
                condition="Partly cloudy sky with one or two spells of rain or thundershowers",
                icon="cloud-rain",
                min_temp=24.0,
                max_temp=33.0,
                humidity=70,
                rain_probability=80,
                wind_speed=11.0,
                wind_direction="NW",
                pressure=1002.8,
                sunrise="05:55 AM",
                sunset="06:51 PM"
            ),
            DailyForecastItem(
                date_str="28 August 2026",
                date_short="28/08",
                day_name="Friday",
                condition="Mainly Clear sky",
                icon="sun",
                min_temp=25.0,
                max_temp=33.0,
                humidity=55,
                rain_probability=20,
                wind_speed=8.5,
                wind_direction="W",
                pressure=1004.1,
                sunrise="05:55 AM",
                sunset="06:50 PM"
            ),
            DailyForecastItem(
                date_str="29 August 2026",
                date_short="29/08",
                day_name="Saturday",
                condition="Mainly Clear sky",
                icon="sun",
                min_temp=26.0,
                max_temp=34.0,
                humidity=52,
                rain_probability=15,
                wind_speed=7.6,
                wind_direction="WNW",
                pressure=1005.0,
                sunrise="05:56 AM",
                sunset="06:49 PM"
            ),
            DailyForecastItem(
                date_str="30 August 2026",
                date_short="30/08",
                day_name="Sunday",
                condition="Mainly Clear sky",
                icon="sun",
                min_temp=26.0,
                max_temp=35.0,
                humidity=48,
                rain_probability=10,
                wind_speed=6.5,
                wind_direction="NW",
                pressure=1005.6,
                sunrise="05:56 AM",
                sunset="06:48 PM"
            ),
            DailyForecastItem(
                date_str="31 August 2026",
                date_short="31/08",
                day_name="Monday",
                condition="Mainly Clear sky",
                icon="sun",
                min_temp=26.0,
                max_temp=35.0,
                humidity=46,
                rain_probability=10,
                wind_speed=7.0,
                wind_direction="NW",
                pressure=1006.0,
                sunrise="05:57 AM",
                sunset="06:47 PM"
            ),
            DailyForecastItem(
                date_str="01 September 2026",
                date_short="01/09",
                day_name="Tuesday",
                condition="Mainly Clear sky",
                icon="sun",
                min_temp=26.0,
                max_temp=35.0,
                humidity=45,
                rain_probability=10,
                wind_speed=8.0,
                wind_direction="W",
                pressure=1006.2,
                sunrise="05:57 AM",
                sunset="06:45 PM"
            )
        ]

    @staticmethod
    def get_weather_alerts(lat: Optional[float] = None, lon: Optional[float] = None) -> List[WeatherAlertResponse]:
        return [
            WeatherAlertResponse(
                id=1,
                location_name="GHAZIABAD",
                alert_type="Warning",
                severity="Warning",
                description="Thunder with Lightning and Light to Moderate spells of Rain",
                date_of_issue="2026-08-26 1800 Hours",
                valid_upto="2026-08-26 2100 Hours",
                status_text="ALERT (BE PREPARED)",
                color="#FFBE00"
            )
        ]

    @staticmethod
    def get_radar_data() -> RadarResponse:
        # Realistic radar reflectivity points in Delhi NCR & Western UP
        points = [
            RadarOverlayPoint(lat=28.6692, lon=77.4538, intensity=48.5, level="Heavy"), # Ghaziabad
            RadarOverlayPoint(lat=28.6315, lon=77.2167, intensity=42.0, level="Moderate"), # New Delhi
            RadarOverlayPoint(lat=28.5355, lon=77.3910, intensity=45.2, level="Heavy"), # Noida
            RadarOverlayPoint(lat=28.9845, lon=77.7064, intensity=52.0, level="Severe"), # Meerut
            RadarOverlayPoint(lat=28.4595, lon=77.0266, intensity=35.0, level="Moderate"), # Gurugram
            RadarOverlayPoint(lat=28.4089, lon=77.3178, intensity=38.4, level="Moderate"), # Faridabad
            RadarOverlayPoint(lat=28.7041, lon=77.1025, intensity=41.1, level="Moderate"), # North Delhi
            RadarOverlayPoint(lat=28.8955, lon=76.5894, intensity=26.0, level="Light"), # Rohtak
            RadarOverlayPoint(lat=28.4041, lon=77.8498, intensity=50.2, level="Severe"), # Bulandshahr
            RadarOverlayPoint(lat=28.2120, lon=77.9250, intensity=30.5, level="Light"),
        ]
        return RadarResponse(
            station="DWR Palam, Delhi (IMD)",
            lat=28.56,
            lon=77.10,
            timestamp="26 Aug 2026, 19:30 IST",
            range_km=250,
            reflectivity_points=points,
            active_warnings=["Convective cloud cluster detected over Ghaziabad-Meerut sector moving ENE at 20 km/h"]
        )

    @staticmethod
    def get_rain_alert_data() -> RainAlertTimeline:
        intervals = ["7:43 PM", "7:49 PM", "7:55 PM", "8:01 PM", "8:07 PM", "8:13 PM"]
        legend = [
            {"label": "Light (< 2.5 mm/h)", "color": "#00DDE5"},
            {"label": "Moderate (2.5 - 7.5 mm/h)", "color": "#0088FF"},
            {"label": "Rather Heavy (7.5 - 15 mm/h)", "color": "#00CC44"},
            {"label": "Heavy (15 - 35 mm/h)", "color": "#FFFF00"},
            {"label": "Very Heavy (35 - 65 mm/h)", "color": "#FF9900"},
            {"label": "Severe (65 - 100 mm/h)", "color": "#FF2020"},
            {"label": "Violent (> 100 mm/h)", "color": "#990000"},
            {"label": "Extreme (> 150 mm/h)", "color": "#FF00FF"}
        ]
        points = [
            {"step": 0, "time": "7:43 PM", "lat": 28.6692, "lon": 77.4538, "intensity": "Heavy", "color": "#FF9900", "radius": 4200},
            {"step": 1, "time": "7:49 PM", "lat": 28.6750, "lon": 77.4650, "intensity": "Very Heavy", "color": "#FF2020", "radius": 4600},
            {"step": 2, "time": "7:55 PM", "lat": 28.6820, "lon": 77.4800, "intensity": "Very Heavy", "color": "#FF2020", "radius": 5000},
            {"step": 3, "time": "8:01 PM", "lat": 28.6900, "lon": 77.4980, "intensity": "Heavy", "color": "#FFFF00", "radius": 4800},
            {"step": 4, "time": "8:07 PM", "lat": 28.7000, "lon": 77.5150, "intensity": "Moderate", "color": "#0088FF", "radius": 4200},
            {"step": 5, "time": "8:13 PM", "lat": 28.7120, "lon": 77.5320, "intensity": "Light", "color": "#00DDE5", "radius": 3500},
        ]
        return RainAlertTimeline(
            time_range="7:43 PM - 8:13 PM",
            current_step=0,
            total_steps=6,
            intervals=intervals,
            forecast_points=points,
            legend=legend
        )

    @staticmethod
    def get_cyclone_data() -> CycloneResponse:
        track = [
            CycloneTrackPoint(time="25/1800 UTC", lat=17.2, lon=88.5, intensity_knots=45, category="Cyclonic Storm", pressure_hpa=994),
            CycloneTrackPoint(time="26/0000 UTC", lat=18.0, lon=87.9, intensity_knots=55, category="Severe Cyclonic Storm", pressure_hpa=986),
            CycloneTrackPoint(time="26/0600 UTC", lat=18.8, lon=87.5, intensity_knots=65, category="Very Severe Cyclonic Storm", pressure_hpa=978),
            CycloneTrackPoint(time="26/1200 UTC", lat=19.8, lon=87.2, intensity_knots=70, category="Very Severe Cyclonic Storm", pressure_hpa=972),
            CycloneTrackPoint(time="27/0000 UTC (Forecast)", lat=20.6, lon=86.8, intensity_knots=65, category="Very Severe Cyclonic Storm", pressure_hpa=976),
            CycloneTrackPoint(time="27/1200 UTC (Forecast)", lat=21.4, lon=86.3, intensity_knots=40, category="Deep Depression", pressure_hpa=990),
        ]
        return CycloneResponse(
            name="Cyclone 'PRAVAH'",
            status="Very Severe Cyclonic Storm",
            basin="Bay of Bengal",
            current_lat=19.8,
            current_lon=87.2,
            max_wind_speed="120-130 km/h gusting to 145 km/h",
            estimated_landfall="27 Aug 2026, 06:00 IST near Puri Coast, Odisha",
            warning_level="Red Alert",
            track=track,
            bulletin_text="The Very Severe Cyclonic Storm 'PRAVAH' over Northwest and adjoining Westcentral Bay of Bengal moved northwestwards with a speed of 14 kmph during past 6 hours. It is very likely to cross Odisha coast between Puri and Chandbali by early morning of 27th August as a Very Severe Cyclonic Storm with wind speed of 120-130 kmph gusting to 145 kmph."
        )

    @staticmethod
    def get_lightning_data() -> LightningResponse:
        strikes = [
            LightningStrike(id="LS101", lat=28.665, lon=77.448, time="19:28 IST", peak_current_ka=38.4, strike_type="Cloud-to-Ground"),
            LightningStrike(id="LS102", lat=28.672, lon=77.460, time="19:26 IST", peak_current_ka=42.1, strike_type="Cloud-to-Ground"),
            LightningStrike(id="LS103", lat=28.680, lon=77.472, time="19:24 IST", peak_current_ka=26.8, strike_type="Intra-Cloud"),
            LightningStrike(id="LS104", lat=28.650, lon=77.420, time="19:22 IST", peak_current_ka=51.0, strike_type="Cloud-to-Ground"),
            LightningStrike(id="LS105", lat=28.695, lon=77.490, time="19:19 IST", peak_current_ka=34.2, strike_type="Cloud-to-Ground"),
            LightningStrike(id="LS106", lat=28.630, lon=77.380, time="19:15 IST", peak_current_ka=29.6, strike_type="Intra-Cloud"),
        ]
        return LightningResponse(
            station_area="Delhi-NCR & Western Uttar Pradesh (Ghaziabad / Meerut sector)",
            total_strikes_last_hour=142,
            risk_level="High Risk (Be Prepared)",
            strikes=strikes,
            safety_advisory="Active cloud-to-ground lightning observed within 5-15 km radius. Follow '30-30' rule: if thunder is heard within 30 seconds of lightning flash, seek safe shelter immediately. Avoid metal poles, open grounds, and water bodies."
        )

    @staticmethod
    def get_aviation_data() -> AviationResponse:
        airports = [
            AirportWeather(
                icao="VIDP",
                name="Indira Gandhi International Airport",
                city="New Delhi",
                lat=28.5562,
                lon=77.1000,
                temp=34.0,
                dew_point=24.0,
                visibility_m=4000,
                wind_direction_deg=290,
                wind_speed_kt=12,
                flight_rules="MVFR",
                qnh=1003.0,
                metar="VIDP 261400Z 29012KT 4000 TSRA SCT020CB BKN090 34/24 Q1003 BECMG 3000 TS=",
                taf="VIDP 261200Z 2612/2718 28010KT 5000 HZ SCT030 TEMPO 2614/2618 3000 TSRA SCT020CB="
            ),
            AirportWeather(
                icao="VABB",
                name="Chhatrapati Shivaji Maharaj International Airport",
                city="Mumbai",
                lat=19.0896,
                lon=72.8656,
                temp=30.0,
                dew_point=26.0,
                visibility_m=3000,
                wind_direction_deg=230,
                wind_speed_kt=18,
                flight_rules="IFR",
                qnh=1006.0,
                metar="VABB 261400Z 23018G28KT 3000 +RA FEW010 SCT020CB BKN080 30/26 Q1006=",
                taf="VABB 261200Z 2612/2718 24015KT 4000 -RA TEMPO 2614/2620 2000 +RA SCT015CB="
            ),
            AirportWeather(
                icao="VILK",
                name="Chaudhary Charan Singh International Airport",
                city="Lucknow",
                lat=26.7606,
                lon=80.8893,
                temp=33.0,
                dew_point=25.0,
                visibility_m=6000,
                wind_direction_deg=100,
                wind_speed_kt=8,
                flight_rules="VFR",
                qnh=1004.0,
                metar="VILK 261400Z 10008KT 6000 FEW025 SCT100 33/25 Q1004 NOSIG=",
                taf="VILK 261200Z 2612/2718 12006KT 6000 SCT030="
            )
        ]
        return AviationResponse(airports=airports)

    @staticmethod
    def get_agromet_data(district_name: Optional[str] = "Ghaziabad") -> AgrometResponse:
        bulletin = DistrictAgrometBulletin(
            district="Ghaziabad",
            state="Uttar Pradesh",
            bulletin_date="26 August 2026",
            rainfall_forecast="Light to moderate rainfall with thundershowers expected over next 3-4 days.",
            temp_forecast="Max: 33-35°C, Min: 24-26°C",
            humidity_forecast="60-80%",
            general_advisory="Farmers are advised to postpone irrigation and pesticide spraying in view of expected rain and thundershowers. Ensure proper drainage in low-lying paddy and vegetable fields to prevent waterlogging.",
            crop_advisories=[
                CropAdvisory(
                    crop="Paddy (Rice)",
                    stage="Tillering / Vegetative",
                    advisory="Maintain 3-5 cm water level in fields. Do not apply top-dressing of urea during rain. Inspect for stem borer and blast disease symptoms."
                ),
                CropAdvisory(
                    crop="Sugarcane",
                    stage="Grand Growth Stage",
                    advisory="Provide propping to tall cane varieties to avoid lodging due to gusty winds. Avoid irrigation."
                ),
                CropAdvisory(
                    crop="Vegetables (Okra, Tomato, Chilli)",
                    stage="Flowering / Fruiting",
                    advisory="Provide staking support to plants. Harvest mature fruits before rain spells to avoid rotting."
                ),
                CropAdvisory(
                    crop="Livestock & Dairy",
                    stage="Maintenance",
                    advisory="Keep animals inside sheds during thunder and lightning. Provide clean drinking water and green fodder mixed with dry roughage."
                )
            ]
        )
        return AgrometResponse(active_district="Ghaziabad", state="Uttar Pradesh", bulletins=[bulletin])

    @staticmethod
    def get_route_nowcast_data(origin: str = "Delhi", destination: str = "Ghaziabad") -> RouteNowcastResponse:
        waypoints = [
            RoutePointWeather(name="Akshardham (Delhi)", distance_km=0.0, lat=28.6127, lon=77.2773, temp=34.5, condition="Partly Cloudy", rain_probability=40),
            RoutePointWeather(name="Ghazipur Border", distance_km=8.5, lat=28.6256, lon=77.3325, temp=34.0, condition="Light Rain", rain_probability=65, warning="Wet road conditions"),
            RoutePointWeather(name="Indirapuram CISF Camp", distance_km=14.2, lat=28.6432, lon=77.3750, temp=33.2, condition="Moderate Rain & Thunder", rain_probability=80, warning="Thunderstorm in vicinity"),
            RoutePointWeather(name="Mohan Nagar Junction", distance_km=19.8, lat=28.6780, lon=77.4010, temp=32.8, condition="Rain with Gusty Wind", rain_probability=85, warning="Gusty wind (35 kmph)"),
            RoutePointWeather(name="Raghunathpuri (Ghaziabad)", distance_km=24.5, lat=28.6692, lon=77.4538, temp=35.19, condition="Thunder with Lightning", rain_probability=90, warning="Severe Alert: Thunder with Lightning")
        ]
        return RouteNowcastResponse(
            origin=origin,
            destination=destination,
            total_distance_km=24.5,
            estimated_time="42 minutes",
            route_condition_summary="Moderate to heavy rain and thunderstorm activity active between Ghazipur and Ghaziabad. Expect slower traffic and wet road surfaces.",
            waypoints=waypoints
        )
