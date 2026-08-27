"use client";

import React from "react";
import { useRouter } from "next/navigation";
import {
  Cloud,
  CloudSun,
  CloudRain,
  CloudLightning,
  Sun,
  ChevronRight,
  Map,
} from "lucide-react";
import { DailyForecastItem } from "@/types/weather";

interface DailyForecastListProps {
  forecasts: DailyForecastItem[];
}

export const DailyForecastList: React.FC<DailyForecastListProps> = ({
  forecasts,
}) => {
  const router = useRouter();

  const renderWeatherIcon = (iconName: string, condition: string) => {
    const c = condition.toLowerCase();
    if (c.includes("lightning") || c.includes("thunder")) {
      return <CloudLightning className="w-5 h-5 text-white stroke-[1.8]" />;
    }
    if (c.includes("rain") || c.includes("drizzle")) {
      return <CloudRain className="w-5 h-5 text-white stroke-[1.8]" />;
    }
    if (c.includes("sun") || c.includes("partly")) {
      return <CloudSun className="w-5 h-5 text-white stroke-[1.8]" />;
    }
    if (c.includes("clear")) {
      return <Sun className="w-5 h-5 text-white stroke-[1.8]" />;
    }
    return <Cloud className="w-5 h-5 text-white stroke-[1.8]" />;
  };

  return (
    <section className="px-4 py-2 select-none space-y-3">
      {/* Interactive Map Button (as shown in reference Image 4) */}
      <button
        onClick={() => router.push("/radar")}
        className="w-full py-3 px-4 bg-[#A7C0D6] hover:bg-[#96b4cd] active:scale-[0.98] text-[#06345C] font-semibold text-[15px] rounded-2xl flex items-center justify-center gap-2 shadow-sm transition-all"
      >
        <Map className="w-4 h-4 text-[#06345C]" />
        <span>Interactive Map</span>
        <ChevronRight className="w-4 h-4 stroke-[2.5]" />
      </button>

      {/* 7-Day Forecast Container Card */}
      <div className="bg-[#3C709F] rounded-2xl p-3.5 shadow-md">
        <div className="divide-y divide-white/15">
          {forecasts.map((item, index) => (
            <div
              key={index}
              onClick={() => router.push(`/forecast?day=${index}`)}
              className="py-3 flex items-center justify-between gap-2 text-white hover:bg-white/5 px-1 rounded-lg transition-colors cursor-pointer"
            >
              {/* Date & Weekday Column */}
              <div className="w-16 shrink-0 flex flex-col">
                <span className="text-[13px] font-semibold leading-tight">
                  {item.date_short}
                </span>
                <span className="text-[12px] text-white/80 leading-tight truncate">
                  {item.day_name}
                </span>
              </div>

              {/* Weather Icon */}
              <div className="shrink-0 flex items-center justify-center w-7">
                {renderWeatherIcon(item.icon, item.condition)}
              </div>

              {/* Min Temp */}
              <span className="text-[14px] font-medium text-white/90 shrink-0 w-11 text-right">
                {item.min_temp.toFixed(1)}°
              </span>

              {/* Temperature Spread Bar */}
              <div className="flex-1 mx-1.5 h-2 bg-black/20 rounded-full overflow-hidden relative">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[#FFBE00] via-[#FF8800] to-[#FF2020]"
                  style={{
                    width: `${Math.min(
                      100,
                      Math.max(
                        35,
                        ((item.max_temp - item.min_temp) / 15) * 100
                      )
                    )}%`,
                    marginLeft: `${Math.max(
                      0,
                      ((item.min_temp - 20) / 20) * 100
                    )}%`,
                  }}
                />
              </div>

              {/* Max Temp */}
              <span className="text-[14px] font-bold text-white shrink-0 w-11 text-left">
                {item.max_temp.toFixed(1)}°
              </span>

              {/* Right Arrow */}
              <ChevronRight className="w-4 h-4 text-white/60 shrink-0" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
