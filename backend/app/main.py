from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database import engine, Base
from app.seed.demo_data import seed_database
from app.routers import (
    weather,
    locations,
    favourites,
    notifications,
    radar,
    rain_alert,
    cyclone,
    lightning,
    aviation,
    agromet,
    route_nowcast,
    crowd_source,
    settings
)

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Initialize SQLite database and seed with demo data
    seed_database()
    yield

app = FastAPI(
    title="IMD Mausam Weather API",
    description="Backend API recreating the official India Meteorological Department (IMD) Mausam application baseline",
    version="1.0.0",
    lifespan=lifespan
)

# Enable CORS for Next.js frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Health endpoint
@app.get("/api/health")
def health_check():
    return {
        "status": "healthy",
        "service": "IMD Mausam Weather API",
        "version": "1.0.0",
        "mode": "baseline"
    }

# Include all routers
app.include_router(weather.router)
app.include_router(locations.router)
app.include_router(favourites.router)
app.include_router(notifications.router)
app.include_router(radar.router)
app.include_router(rain_alert.router)
app.include_router(cyclone.router)
app.include_router(lightning.router)
app.include_router(aviation.router)
app.include_router(agromet.router)
app.include_router(route_nowcast.router)
app.include_router(crowd_source.router)
app.include_router(settings.router)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
