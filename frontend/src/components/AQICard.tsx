"use client";

import React from "react";
import { AQIInfo } from "@/types/weather";

interface AQICardProps {
  aqiData?: AQIInfo;
}

export const AQICard: React.FC<AQICardProps> = ({ aqiData }) => {
  if (!aqiData) return null;

  return (
    <section className="px-4 py-2 select-none">
      <div className="flex flex-col items-start">
        {/* Badges row */}
        <div className="flex items-center gap-2">
          {/* AQI Value Pill */}
          <div className="bg-[#A7C0D6] text-[#06345C] font-bold text-xs sm:text-sm px-3 py-1 rounded-md shadow-xs">
            AQI {aqiData.aqi}
          </div>

          {/* Status Green Pill */}
          <div
            className="text-[#06345C] font-bold text-xs sm:text-sm px-3 py-1 rounded-md shadow-xs"
            style={{ backgroundColor: aqiData.color || "#8ED329" }}
          >
            {aqiData.status}
          </div>
        </div>

        {/* Source Subtitle */}
        <p className="text-[11px] text-white/70 mt-1 font-normal tracking-wide">
          {aqiData.source || "National AQI-Source-CPCB"}
        </p>
      </div>
    </section>
  );
};
