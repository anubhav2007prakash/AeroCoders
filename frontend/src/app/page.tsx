"use client";

import React, { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { WeatherHero } from "@/components/WeatherHero";
import { AQICard } from "@/components/AQICard";
import { HourlyForecastCard } from "@/components/HourlyForecastCard";
import { FeatureButtons } from "@/components/FeatureButtons";
import { WeatherAlertCard } from "@/components/WeatherAlertCard";
import { DailyForecastList } from "@/components/DailyForecastList";
import { LoadingState } from "@/components/LoadingState";
import { ErrorState } from "@/components/ErrorState";
import { useWeather } from "@/context/WeatherContext";
import { WeatherAPI } from "@/lib/api";
import { HourlyForecastItem, DailyForecastItem, WeatherAlert } from "@/types/weather";

export default function HomePage() {
  const { currentWeather, isLoading, error, refreshWeather, activeLocation } = useWeather();
  const [hourlyItems, setHourlyItems] = useState<HourlyForecastItem[]>([]);
  const [dailyItems, setDailyItems] = useState<DailyForecastItem[]>([]);
  const [alerts, setAlerts] = useState<WeatherAlert[]>([]);
  const [pageLoading, setPageLoading] = useState(true);

  useEffect(() => {
    async function loadForecastData() {
      try {
        const [hourly, daily, alertList] = await Promise.all([
          WeatherAPI.getHourlyForecast(),
          WeatherAPI.getDailyForecast(),
          WeatherAPI.getAlerts(),
        ]);
        setHourlyItems(hourly);
        setDailyItems(daily);
        setAlerts(alertList);
      } catch (err) {
        console.warn("Forecast data load fallback:", err);
      } finally {
        setPageLoading(false);
      }
    }

    loadForecastData();
  }, [activeLocation]);

  return (
    <main className="min-h-screen bg-[#0055A6] pb-8 flex flex-col justify-between">
      <div>
        {/* Top App Header */}
        <Header />

        {/* Loading / Error States */}
        {isLoading && !currentWeather ? (
          <LoadingState message="Fetching live Mausam weather..." />
        ) : error && !currentWeather ? (
          <ErrorState message={error} onRetry={refreshWeather} />
        ) : currentWeather ? (
          <div className="space-y-1 animate-fade-in">
            {/* Current Weather Hero + Wind Compass */}
            <WeatherHero weather={currentWeather} />

            {/* AQI Status Component */}
            <AQICard aqiData={currentWeather.aqi} />

            {/* 3-Hourly Forecast Card */}
            <HourlyForecastCard items={hourlyItems} />

            {/* Two Primary Feature Buttons (Agromet & Crowd Source) */}
            <FeatureButtons />

            {/* Weather Alert Yellow Card */}
            {alerts.length > 0 && <WeatherAlertCard alert={alerts[0]} />}

            {/* Interactive Map Button & 7-Day Forecast */}
            <DailyForecastList forecasts={dailyItems} />
          </div>
        ) : null}
      </div>

      {/* Footer Branding */}
      <footer className="mt-8 px-4 text-center text-xs text-white/50 pb-2">
        <p>© India Meteorological Department (IMD), Ministry of Earth Sciences</p>
        <p className="text-[10px] mt-0.5 text-white/40">National Weather Forecasting Centre, New Delhi</p>
      </footer>
    </main>
  );
}
