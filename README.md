# IMD "Mausam" Mobile Weather Application - Baseline Re-creation

A high-fidelity full-stack web application faithfully recreating the existing **India Meteorological Department (IMD) “Mausam”** Android weather application.

> **Note on Baseline Scope**: This version implements the complete, authentic IMD Mausam baseline experience with authentic color schemes, typography, layout hierarchy, Doppler radar map, rain alerts, wind compass, AQI metrics, cyclone tracking, and agromet products. It serves as the baseline foundation prior to implementing the SIH Problem Statement 26076 personalization layer.

---

## 📸 Core Visual & Functional Features

- **Mobile-First Experience**: Styled to replicate the Android application viewport (~360–430px centered on desktop) with native-style status bar and touch targets.
- **Authentic IMD Color Palette**:
  - Primary Mausam Blue: `#0055A6`
  - Secondary Card Blue: `#3C709F`
  - Dark Blue Surface: `#06345C`
  - Weather Alert Yellow: `#FFBE00`
  - AQI Satisfactory Green: `#8ED329`
  - Temperature Max / Alert Red: `#FF2020`
  - Rain Intensity Cyan: `#00DDE5`
- **Wind Compass Component (`WindCompass`)**: Custom circular gauge with 360° tick marks, cardinal direction indicators, and a rotating red wind needle.
- **AQI Card (`AQICard`)**: Displays AQI value and CPCB Satisfactory green pill badge.
- **Weather Alert Card (`WeatherAlertCard`)**: Prominent yellow alert card with issue timestamp, validity duration, and "ALERT (BE PREPARED)" badge.
- **3-Hourly & 7-Day Forecast Cards**: Temperature range gradient bars with min/max thermometer icons.
- **Slide Navigation Drawer (`SideDrawer`)**: Slide-out menu (60–65% width) with profile state and navigation links to all subpages.
- **Interactive Maps (Leaflet & OpenStreetMap)**:
  - **Radar Screen**: Doppler reflectivity overlay with dBZ precipitation levels.
  - **Rain Alert Screen**: Timeline player (7:43 PM - 8:13 PM) with 8-level precipitation intensity legend.
  - **Cyclone Screen**: Live tracking cone and track coordinates for Bay of Bengal / Arabian Sea cyclonic storms.
  - **Lightning Screen**: Real-time lightning strike coordinates, density zones, and safety advisories.
  - **Route Now Cast Screen**: Point-to-point highway route weather with waypoint alerts.
- **Aviation Weather**: Aerodrome weather with METAR, TAF, and flight categories (VFR/MVFR/IFR).
- **Agromet Products**: Gramin Krishi Mausam Sewa (GKMS) bulletins and crop-specific farming guidance.
- **Crowd Sourcing**: Citizen weather observation submission and live community feed backed by SQLite.
- **Location Search & Favourites**: Search Indian cities and districts with instant bookmarking.
- **Settings & FAQ**: Unit toggles (°C/°F, km/h), language switcher, and IMD meteorological knowledge base.

---

## 🛠 Technology Stack

### Frontend
- **Framework**: Next.js 15 (App Router, React 19, TypeScript)
- **Styling**: Tailwind CSS (with custom Mausam color variables)
- **Icons**: Lucide React (clean outline icons)
- **Maps**: Leaflet + React-Leaflet + OpenStreetMap tiles

### Backend
- **Framework**: Python FastAPI
- **Data Validation**: Pydantic v2
- **ORM / Database**: SQLAlchemy + SQLite (`mausam.db`)
- **CORS**: Configured for Next.js frontend

---

## 📂 Folder Structure

```
AeroCoders-main/
├── backend/
│   ├── app/
│   │   ├── main.py                  # FastAPI app entry with CORS & router mounting
│   │   ├── database.py              # SQLite + SQLAlchemy session setup
│   │   ├── models/
│   │   │   ├── __init__.py
│   │   │   └── weather_models.py    # Locations, Favourites, Notifications, Alerts, CrowdReports, Settings
│   │   ├── schemas/
│   │   │   ├── __init__.py
│   │   │   └── weather_schemas.py   # Pydantic schemas for request/response validation
│   │   ├── services/
│   │   │   ├── __init__.py
│   │   │   └── weather_service.py   # IMD demo weather calculation & provider service
│   │   ├── seed/
│   │   │   ├── __init__.py
│   │   │   └── demo_data.py         # Realistic seed data matching reference app
│   │   └── routers/
│   │       ├── __init__.py
│   │       ├── weather.py           # /api/weather (current, forecast, hourly, aqi, alerts)
│   │       ├── locations.py         # /api/locations (search, default, all)
│   │       ├── favourites.py        # /api/favourites (CRUD)
│   │       ├── notifications.py     # /api/notifications
│   │       ├── radar.py             # /api/radar
│   │       ├── rain_alert.py        # /api/rain-alert
│   │       ├── cyclone.py           # /api/cyclone
│   │       ├── lightning.py         # /api/lightning
│   │       ├── aviation.py          # /api/aviation
│   │       ├── agromet.py           # /api/agromet
│   │       ├── route_nowcast.py     # /api/route-nowcast
│   │       ├── crowd_source.py      # /api/crowd-source
│   │       └── settings.py          # /api/settings
│   └── requirements.txt
│
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── layout.tsx           # Global shell & font (Roboto)
│   │   │   ├── page.tsx             # Mausam Mobile Home Screen
│   │   │   ├── forecast/page.tsx    # 7-Day & 3-Hourly Detailed Forecast
│   │   │   ├── radar/page.tsx       # Doppler Radar Map Screen
│   │   │   ├── rain-alert/page.tsx  # Rain Alert Map & Timeline Screen
│   │   │   ├── cyclone/page.tsx     # Cyclone Tracking Screen
│   │   │   ├── lightning/page.tsx   # Lightning Activity Screen
│   │   │   ├── aviation/page.tsx    # Aviation Weather Screen
│   │   │   ├── agromet/page.tsx     # Agromet Advisory Screen
│   │   │   ├── crowd-source/page.tsx# Crowd Sourced Weather Reporting
│   │   │   ├── route-nowcast/page.tsx# Route Weather Nowcast
│   │   │   ├── favourites/page.tsx  # Bookmarked Locations Screen
│   │   │   ├── notifications/page.tsx# Weather Warnings Feed
│   │   │   ├── settings/page.tsx    # App Settings & Units
│   │   │   ├── faq/page.tsx         # IMD Meteorological FAQs
│   │   │   └── globals.css          # Theme tokens & Leaflet styles
│   │   ├── components/
│   │   │   ├── Header.tsx           # Status bar & title header
│   │   │   ├── SideDrawer.tsx       # Slide-out navigation drawer
│   │   │   ├── WeatherHero.tsx      # Current temp & metrics hero
│   │   │   ├── WindCompass.tsx      # Circular wind instrument
│   │   │   ├── AQICard.tsx          # Air quality index pill
│   │   │   ├── HourlyForecastCard.tsx # 3-hourly forecast card
│   │   │   ├── WeatherAlertCard.tsx # Yellow Ghaziabad alert card
│   │   │   ├── FeatureButtons.tsx   # Agromet & Crowd Source buttons
│   │   │   ├── DailyForecastList.tsx# 7-Day range bars & map trigger
│   │   │   ├── LocationSearchModal.tsx # Location autocomplete modal
│   │   │   ├── Map/
│   │   │   │   └── LeafletMap.tsx   # Leaflet map with layers & controls
│   │   │   ├── RainTimeline.tsx     # Rain alert playback & intensity
│   │   │   ├── LoadingState.tsx
│   │   │   └── ErrorState.tsx
│   │   ├── context/
│   │   │   └── WeatherContext.tsx   # Global location & state provider
│   │   ├── lib/
│   │   │   └── api.ts               # Typed REST client
│   │   └── types/
│   │       └── weather.ts           # TypeScript interfaces
│   ├── package.json
│   └── tsconfig.json
└── README.md
```

---

## 🚀 Installation & Setup

### 1. Prerequisites
- **Node.js**: v18.0.0 or higher
- **Python**: 3.10 or higher
- **npm** or **pnpm**

### 2. Backend Setup
```bash
# Navigate to backend directory
cd backend

# Install Python dependencies
pip install -r requirements.txt

# Run the FastAPI development server
python -m uvicorn app.main:app --host 127.0.0.1 --port 8000 --reload
```
The FastAPI backend will be available at `http://127.0.0.1:8000`.
Interactive API documentation is accessible at `http://127.0.0.1:8000/docs`.

### 3. Frontend Setup
```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Run the Next.js development server
npm run dev
```
Open `http://localhost:3000` in your browser.

---

## 🌐 Environment Variables

### Frontend (`frontend/.env.local`)
```env
NEXT_PUBLIC_API_BASE_URL=http://127.0.0.1:8000
```

---

## 📡 REST API Endpoints Summary

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/health` | Backend health status |
| `GET` | `/api/weather/current` | Current weather (Temp, Humidity, Wind, AQI) |
| `GET` | `/api/weather/forecast` | 7-day weather forecast with min/max temperatures |
| `GET` | `/api/weather/hourly` | 3-hourly weather forecast columns |
| `GET` | `/api/weather/aqi` | Air Quality Index and pollutant parameters |
| `GET` | `/api/weather/alerts` | Active severe weather alerts |
| `GET` | `/api/locations/search` | Search Indian cities and districts (`?q=...`) |
| `GET` | `/api/locations/default` | Default seed location (Ghaziabad) |
| `GET` | `/api/favourites` | List saved favourite locations |
| `POST` | `/api/favourites` | Add a new favourite location |
| `DELETE` | `/api/favourites/{id}` | Remove a favourite location |
| `GET` | `/api/notifications` | Chronological weather warning notifications |
| `GET` | `/api/radar` | Doppler weather radar data & reflectivity points |
| `GET` | `/api/rain-alert` | Precipitation nowcast timeline & steps |
| `GET` | `/api/cyclone` | Active cyclonic storm track and landfall ETA |
| `GET` | `/api/lightning` | Live lightning strikes and safety advisories |
| `GET` | `/api/aviation` | Aerodrome METAR / TAF reports and flight categories |
| `GET` | `/api/agromet` | District Krishi Mausam bulletins & crop advisories |
| `GET` | `/api/route-nowcast` | Weather along travel route (Origin & Destination) |
| `GET` | `/api/crowd-source` | Feed of citizen weather reports |
| `POST` | `/api/crowd-source` | Submit a citizen weather observation |
| `GET` | `/api/settings` | Get user settings and units |
| `PUT` | `/api/settings` | Update user preferences |

---

## 🎯 Next Step (Phase 2): SIH Problem Statement 26076
In Phase 2, this baseline will be enhanced to implement:
- **User Persona Engine**: Contextual homepages tailored for Farmers, Commuters, Travelers, Event Planners, Runners, and Parents.
- **Smart Adaptive Cards**: Personalized comfort indices, running windows, packing suggestions, and agricultural actionable tips.
- **AI Recommendation Engine**: Predictive advice based on live weather data.
