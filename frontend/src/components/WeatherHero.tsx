"use client";

import React from "react";
import { Droplets } from "lucide-react";
import { CurrentWeather } from "@/types/weather";
import { WindCompass } from "@/components/WindCompass";

interface WeatherHeroProps {
  weather: CurrentWeather;
}

export const WeatherHero: React.FC<WeatherHeroProps> = ({ weather }) => {
  return (
    <section className="px-4 pt-2 pb-3 select-none">
      <div className="flex items-center justify-between gap-2">
        {/* Left: Weather Metrics */}
        <div className="flex-1 flex flex-col justify-start">
          {/* Main Huge Temperature */}
          <div className="text-[58px] sm:text-[64px] font-bold text-white leading-none tracking-tight">
            {weather.temperature.toFixed(2)}
          </div>

          {/* Metric Rows */}
          <div className="mt-3 space-y-1 text-[13px] sm:text-[14px]">
            <div className="flex items-center justify-between max-w-[170px] text-white/85">
              <span className="font-normal">Updated At</span>
              <span className="font-medium text-white">{weather.updated_at}</span>
            </div>

            <div className="flex items-center justify-between max-w-[170px] text-white/85">
              <span className="font-normal">Feels Like</span>
              <span className="font-medium text-white">{weather.feels_like.toFixed(1)}</span>
            </div>

            <div className="flex items-center justify-between max-w-[170px] text-white/85">
              <span className="font-normal">Maximum</span>
              <span className="font-medium text-white">{weather.maximum.toFixed(1)}</span>
            </div>

            <div className="flex items-center justify-between max-w-[170px] text-white/85">
              <span className="font-normal">Minimum</span>
              <span className="font-medium text-white">{weather.minimum.toFixed(1)}</span>
            </div>

            {/* Humidity / Moisture */}
            <div className="flex items-center gap-1 text-white font-medium pt-1">
              <Droplets className="w-4 h-4 text-[#00DDE5] fill-[#00DDE5]/30" />
              <span>{weather.humidity}%</span>
            </div>
          </div>
        </div>

        {/* Right: Wind Compass Instrument */}
        <div className="shrink-0 pl-1">
          <WindCompass
            windSpeed={weather.wind_speed}
            windDirection={weather.wind_direction}
            windDirectionDeg={weather.wind_direction_deg}
          />
        </div>
      </div>
    </section>
  );
};
