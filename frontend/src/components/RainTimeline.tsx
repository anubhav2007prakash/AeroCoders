"use client";

import React, { useState, useEffect } from "react";
import { Play, Pause, RotateCcw } from "lucide-react";
import { RainTimelineData } from "@/types/weather";

interface RainTimelineProps {
  timelineData: RainTimelineData;
  activeStep: number;
  onStepChange: (step: number) => void;
}

export const RainTimeline: React.FC<RainTimelineProps> = ({
  timelineData,
  activeStep,
  onStepChange,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        onStepChange((activeStep + 1) % timelineData.total_steps);
      }, 1400);
    }
    return () => clearInterval(interval);
  }, [isPlaying, activeStep, timelineData.total_steps, onStepChange]);

  const togglePlay = () => setIsPlaying(!isPlaying);

  return (
    <div className="bg-[#06345C] text-white p-3.5 rounded-2xl shadow-xl border border-white/20 select-none space-y-3">
      {/* Top Range & Play Control */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            onClick={togglePlay}
            aria-label={isPlaying ? "Pause" : "Play"}
            className="w-8 h-8 rounded-full bg-[#FFBE00] text-[#06345C] flex items-center justify-center font-bold shadow-md hover:bg-yellow-400 active:scale-95 transition"
          >
            {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
          </button>
          <div>
            <span className="text-[11px] text-white/70 block leading-tight">Rain Nowcast Window</span>
            <span className="text-[13px] font-bold text-white leading-tight">{timelineData.time_range}</span>
          </div>
        </div>

        {/* Active Step Time badge */}
        <div className="bg-white/10 px-2.5 py-1 rounded-lg border border-white/20 text-[12px] font-bold text-[#00DDE5]">
          {timelineData.intervals[activeStep] || "Live"}
        </div>
      </div>

      {/* Timeline Slider */}
      <div className="space-y-1">
        <input
          type="range"
          min="0"
          max={timelineData.total_steps - 1}
          value={activeStep}
          onChange={(e) => onStepChange(Number(e.target.value))}
          className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer accent-[#FFBE00]"
        />

        {/* Intervals ticks */}
        <div className="flex justify-between text-[10px] text-white/60 font-medium px-0.5">
          {timelineData.intervals.map((t, idx) => (
            <span
              key={idx}
              className={`cursor-pointer ${
                idx === activeStep ? "text-[#FFBE00] font-bold" : "hover:text-white"
              }`}
              onClick={() => onStepChange(idx)}
            >
              {t.split(" ")[0]}
            </span>
          ))}
        </div>
      </div>

      {/* Precipitation Intensity Color Legend */}
      <div className="pt-1 border-t border-white/10">
        <div className="flex justify-between text-[10px] text-white/70 font-semibold mb-1">
          <span>Light</span>
          <span>Rain Intensity (mm/h)</span>
          <span>Heavy</span>
        </div>
        <div className="grid grid-cols-8 h-2.5 rounded-md overflow-hidden border border-white/20">
          {timelineData.legend.map((item, idx) => (
            <div
              key={idx}
              className="h-full relative group cursor-pointer"
              style={{ backgroundColor: item.color }}
              title={item.label}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
