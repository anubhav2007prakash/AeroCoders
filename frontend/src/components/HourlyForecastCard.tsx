"use client";

import React from "react";
import { useRouter } from "next/navigation";
import {
  Cloud,
  CloudSun,
  CloudRain,
  CloudLightning,
  Sun,
  Droplets,
  ChevronRight,
} from "lucide-react";
import { HourlyForecastItem } from "@/types/weather";

interface HourlyForecastCardProps {
  items: HourlyForecastItem[];
}

export const HourlyForecastCard: React.FC<HourlyForecastCardProps> = ({
  items,
}) => {
  const router = useRouter();

  // Pick first 3 items or display available
  const displayItems = items.slice(0, 3);

  const renderWeatherIcon = (iconName: string, condition: string) => {
    const c = condition.toLowerCase();
    if (c.includes("lightning") || c.includes("thunder")) {
      return <CloudLightning className="w-8 h-8 text-white stroke-[1.8]" />;
    }
    if (c.includes("rain") || c.includes("drizzle")) {
      return <CloudRain className="w-8 h-8 text-white stroke-[1.8]" />;
    }
    if (c.includes("sun") || c.includes("partly")) {
      return <CloudSun className="w-8 h-8 text-white stroke-[1.8]" />;
    }
    if (c.includes("clear")) {
      return <Sun className="w-8 h-8 text-white stroke-[1.8]" />;
    }
    return <Cloud className="w-8 h-8 text-white stroke-[1.8]" />;
  };

  return (
    <section className="px-4 py-2 select-none">
      <div className="bg-[#3C709F] rounded-2xl p-4 shadow-md flex flex-col justify-between">
        {/* 3 Forecast Columns */}
        <div className="grid grid-cols-3 divide-x divide-white/20 text-center pb-3">
          {displayItems.map((item, index) => (
            <div
              key={index}
              className={`flex flex-col items-center justify-center ${
                index === 0 ? "pr-2" : index === 1 ? "px-2" : "pl-2"
              }`}
            >
              {/* Date & Time */}
              <span className="text-[12px] text-white/80 font-normal leading-tight">
                {item.date_str}
              </span>
              <span className="text-[13px] text-white font-medium mb-2 leading-tight">
                {item.time_str}
              </span>

              {/* Weather Outline Icon */}
              <div className="my-1.5 flex items-center justify-center">
                {renderWeatherIcon(item.icon, item.condition)}
              </div>

              {/* Condition text */}
              <span className="text-[11px] text-white/90 font-normal truncate max-w-full my-0.5">
                {item.condition}
              </span>

              {/* Temperature */}
              <span className="text-[17px] font-bold text-white tracking-tight my-0.5">
                {item.temperature.toFixed(2)}
              </span>

              {/* Humidity / Rain */}
              <div className="flex items-center gap-1 text-[11px] text-[#00DDE5] font-medium mt-0.5">
                <Droplets className="w-3 h-3 fill-[#00DDE5]/30" />
                <span>{item.humidity}%</span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Navigation Button */}
        <button
          onClick={() => router.push("/forecast")}
          className="w-full mt-2 py-2.5 px-4 bg-[#A7C0D6] hover:bg-[#96b4cd] active:scale-[0.98] text-[#06345C] font-semibold text-sm rounded-xl flex items-center justify-center gap-1 shadow-sm transition-all"
        >
          <span>3-Hourly</span>
          <ChevronRight className="w-4 h-4 stroke-[2.5]" />
        </button>
      </div>
    </section>
  );
};
