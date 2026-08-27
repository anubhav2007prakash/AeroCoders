"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Header } from "@/components/Header";
import { LoadingState } from "@/components/LoadingState";
import { WeatherAPI } from "@/lib/api";
import { DailyForecastItem, HourlyForecastItem } from "@/types/weather";
import {
  Cloud,
  CloudSun,
  CloudRain,
  CloudLightning,
  Sun,
  Thermometer,
  Droplets,
  Wind,
  Compass,
  Gauge,
  Sunrise,
  Sunset,
} from "lucide-react";

function ForecastContent() {
  const searchParams = useSearchParams();
  const initialDayIndex = Number(searchParams?.get("day") || 0);

  const [dailyForecasts, setDailyForecasts] = useState<DailyForecastItem[]>([]);
  const [hourlyForecasts, setHourlyForecasts] = useState<HourlyForecastItem[]>([]);
  const [selectedDayIndex, setSelectedDayIndex] = useState<number>(initialDayIndex);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [daily, hourly] = await Promise.all([
          WeatherAPI.getDailyForecast(),
          WeatherAPI.getHourlyForecast(),
        ]);
        setDailyForecasts(daily);
        setHourlyForecasts(hourly);
      } catch (err) {
        console.error("Forecast load error:", err);
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, []);

  const activeDay = dailyForecasts[selectedDayIndex] || dailyForecasts[0];

  const renderWeatherIcon = (condition: string, sizeClass: string = "w-16 h-16") => {
    const c = (condition || "").toLowerCase();
    if (c.includes("lightning") || c.includes("thunder")) {
      return <CloudLightning className={`${sizeClass} text-white stroke-[1.5]`} />;
    }
    if (c.includes("rain") || c.includes("drizzle") || c.includes("spell")) {
      return <CloudRain className={`${sizeClass} text-white stroke-[1.5]`} />;
    }
    if (c.includes("clear")) {
      return <Sun className={`${sizeClass} text-white stroke-[1.5]`} />;
    }
    return <CloudSun className={`${sizeClass} text-white stroke-[1.5]`} />;
  };

  if (isLoading || !activeDay) {
    return (
      <div className="min-h-screen bg-[#0055A6]">
        <Header showBack={true} />
        <LoadingState message="Loading detailed IMD forecast..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0055A6] pb-10 select-none">
      {/* Top Header with Back Arrow */}
      <Header showBack={true} />

      {/* Horizontal Date Navigation Tabs */}
      <div className="overflow-x-auto scrollbar-none py-2 px-3 border-b border-white/15">
        <div className="flex gap-4 min-w-max">
          {dailyForecasts.map((item, idx) => {
            const isSelected = idx === selectedDayIndex;
            return (
              <button
                key={idx}
                onClick={() => setSelectedDayIndex(idx)}
                className={`flex flex-col items-center pb-1 text-center transition-all ${
                  isSelected
                    ? "text-[#00DDE5] font-bold border-b-2 border-[#00DDE5]"
                    : "text-white/75 font-normal hover:text-white"
                }`}
              >
                <span className="text-[14px] leading-tight">{item.date_short}</span>
                <span className="text-[12px] leading-tight capitalize">
                  {item.day_name}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Forecast Hero Card (Matching Reference Images 1, 2, 3) */}
      <div className="p-4">
        <div className="bg-[#3C709F] rounded-3xl p-6 shadow-xl flex flex-col items-center text-center">
          {/* Main Weather Outline Icon */}
          <div className="my-2">
            {renderWeatherIcon(activeDay.condition, "w-20 h-20")}
          </div>

          {/* Thermometer Temperature Values */}
          <div className="flex items-center justify-center gap-6 my-3">
            {/* Max Temperature with Red Thermometer */}
            <div className="flex items-center gap-1.5 text-white">
              <div className="text-[#FF2020]">
                <Thermometer className="w-7 h-7 stroke-[2.2]" />
              </div>
              <span className="text-[32px] sm:text-[36px] font-bold tracking-tight">
                {activeDay.max_temp.toFixed(1)}
              </span>
            </div>

            {/* Min Temperature with Blue Thermometer */}
            <div className="flex items-center gap-1.5 text-white">
              <div className="text-[#00DDE5]">
                <Thermometer className="w-7 h-7 stroke-[2.2]" />
              </div>
              <span className="text-[32px] sm:text-[36px] font-bold tracking-tight">
                {activeDay.min_temp.toFixed(1)}
              </span>
            </div>
          </div>

          {/* Condition Description */}
          <p className="text-[16px] text-white font-normal leading-snug max-w-xs mt-2">
            {activeDay.condition}
          </p>
        </div>
      </div>

      {/* Detailed Environmental Parameters Grid */}
      <div className="px-4 space-y-3">
        <h3 className="text-sm font-semibold text-white/80 uppercase tracking-wider px-1">
          Detailed Parameters
        </h3>

        <div className="grid grid-cols-2 gap-3">
          <div className="bg-[#3C709F]/80 rounded-2xl p-3.5 flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-[#00DDE5]">
              <Droplets className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs text-white/70 block">Humidity</span>
              <span className="text-base font-bold text-white">{activeDay.humidity || 65}%</span>
            </div>
          </div>

          <div className="bg-[#3C709F]/80 rounded-2xl p-3.5 flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-[#00DDE5]">
              <Wind className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs text-white/70 block">Wind Speed</span>
              <span className="text-base font-bold text-white">
                {activeDay.wind_speed || 9.4} Km/h ({activeDay.wind_direction || "NW"})
              </span>
            </div>
          </div>

          <div className="bg-[#3C709F]/80 rounded-2xl p-3.5 flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-[#00DDE5]">
              <Gauge className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs text-white/70 block">Pressure</span>
              <span className="text-base font-bold text-white">
                {activeDay.pressure || 1003.5} hPa
              </span>
            </div>
          </div>

          <div className="bg-[#3C709F]/80 rounded-2xl p-3.5 flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-[#FFBE00]">
              <Sunrise className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs text-white/70 block">Sun Timings</span>
              <span className="text-xs font-bold text-white">
                🌅 {activeDay.sunrise} / 🌇 {activeDay.sunset}
              </span>
            </div>
          </div>
        </div>

        {/* 3-Hourly Breakdown Section */}
        <h3 className="text-sm font-semibold text-white/80 uppercase tracking-wider px-1 pt-2">
          3-Hourly Breakdown
        </h3>

        <div className="bg-[#3C709F] rounded-2xl p-3 overflow-x-auto">
          <div className="flex divide-x divide-white/20 min-w-max">
            {hourlyForecasts.map((item, idx) => (
              <div key={idx} className="px-3.5 text-center flex flex-col items-center justify-center">
                <span className="text-xs text-white/80">{item.time_str}</span>
                <div className="my-2">{renderWeatherIcon(item.condition, "w-6 h-6")}</div>
                <span className="text-sm font-bold text-white">{item.temperature.toFixed(1)}°</span>
                <span className="text-[11px] text-[#00DDE5] mt-1 font-medium">💧 {item.humidity}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ForecastPage() {
  return (
    <Suspense fallback={<LoadingState message="Loading forecast..." />}>
      <ForecastContent />
    </Suspense>
  );
}
