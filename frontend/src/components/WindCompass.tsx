"use client";

import React from "react";

interface WindCompassProps {
  windSpeed: number;
  windDirection?: string;
  windDirectionDeg?: number;
}

export const WindCompass: React.FC<WindCompassProps> = ({
  windSpeed,
  windDirection = "NW",
  windDirectionDeg = 315,
}) => {
  // Generate 24 tick marks around the circle (every 15 degrees)
  const ticks = Array.from({ length: 24 }, (_, i) => i * 15);

  return (
    <div className="relative flex flex-col items-center justify-center">
      {/* Outer Circular Dial */}
      <div className="relative w-32 h-32 sm:w-36 sm:h-36 rounded-full border border-white/40 flex items-center justify-center bg-white/5 shadow-inner">
        {/* Tick Marks around the circumference */}
        {ticks.map((deg) => (
          <div
            key={deg}
            className="absolute top-0 left-1/2 -translate-x-1/2 origin-bottom pointer-events-none"
            style={{
              height: "50%",
              transform: `rotate(${deg}deg)`,
            }}
          >
            <div
              className={`w-[1px] ${
                deg % 90 === 0
                  ? "h-2.5 bg-white/80"
                  : deg % 45 === 0
                  ? "h-2 bg-white/50"
                  : "h-1 bg-white/30"
              }`}
            />
          </div>
        ))}

        {/* Cardinal Direction Labels */}
        <span className="absolute top-1 text-[11px] font-bold text-white/90">N</span>
        <span className="absolute right-1.5 text-[11px] font-bold text-white/90">E</span>
        <span className="absolute bottom-1 text-[11px] font-bold text-white/90">S</span>
        <span className="absolute left-1.5 text-[11px] font-bold text-white/90">W</span>

        {/* Rotating Red Needle Arrow */}
        <div
          className="absolute inset-0 flex items-center justify-center transition-transform duration-700 ease-out pointer-events-none"
          style={{ transform: `rotate(${windDirectionDeg}deg)` }}
        >
          {/* Arrow pointing outwards from center to top edge */}
          <div className="relative w-full h-full flex flex-col items-center justify-start pt-3">
            <div className="w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-b-[18px] border-b-[#FF2020] drop-shadow-sm" />
            <div className="w-[2px] h-6 bg-[#FF2020]/80" />
          </div>
        </div>

        {/* Center Circular Readout */}
        <div className="relative z-10 w-20 h-20 rounded-full bg-[#0055A6]/90 border border-white/20 flex flex-col items-center justify-center text-center shadow-md">
          <span className="text-[22px] sm:text-[24px] font-bold text-white leading-none tracking-tight">
            {windSpeed.toFixed(1)}
          </span>
          <span className="text-[10px] text-white/70 font-medium tracking-wider mt-0.5">
            Km/h
          </span>
          <span className="text-[9px] text-[#A7C0D6] font-semibold">
            {windDirection}
          </span>
        </div>
      </div>
    </div>
  );
};
