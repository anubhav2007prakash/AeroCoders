"use client";

import React from "react";
import { AlertTriangle, MapPin, Calendar, Clock } from "lucide-react";
import { WeatherAlert } from "@/types/weather";

interface WeatherAlertCardProps {
  alert?: WeatherAlert;
}

export const WeatherAlertCard: React.FC<WeatherAlertCardProps> = ({ alert }) => {
  if (!alert) return null;

  return (
    <section className="px-4 py-2 select-none">
      <div className="bg-[#FFBE00] text-gray-900 rounded-2xl p-4 shadow-lg border border-yellow-400">
        {/* Location Header */}
        <div className="flex items-center gap-1.5 text-gray-900 font-bold text-[18px] tracking-wide uppercase mb-2">
          <MapPin className="w-5 h-5 text-gray-900 fill-gray-900/20" />
          <span>{alert.location_name || "GHAZIABAD"}</span>
        </div>

        {/* Warning Description */}
        <div className="flex items-start gap-2 text-gray-900 font-medium text-[14px] leading-snug mb-3">
          <AlertTriangle className="w-5 h-5 text-gray-900 shrink-0 mt-0.5" />
          <span>- {alert.description}</span>
        </div>

        {/* Issue and Validity Box Grid */}
        <div className="grid grid-cols-2 gap-2 mb-3">
          {/* Date of Issue */}
          <div className="bg-[#F0AE00]/80 rounded-xl p-2 text-gray-900">
            <div className="flex items-center gap-1 text-[11px] font-semibold text-gray-800">
              <Calendar className="w-3.5 h-3.5" />
              <span>Date of Issue</span>
            </div>
            <p className="text-[12px] font-bold text-gray-900 mt-0.5">
              {alert.date_of_issue}
            </p>
          </div>

          {/* Valid Up To */}
          <div className="bg-[#F0AE00]/80 rounded-xl p-2 text-gray-900">
            <div className="flex items-center gap-1 text-[11px] font-semibold text-gray-800">
              <Clock className="w-3.5 h-3.5" />
              <span>Valid up to</span>
            </div>
            <p className="text-[12px] font-bold text-gray-900 mt-0.5">
              {alert.valid_upto}
            </p>
          </div>
        </div>

        {/* Action Button */}
        <div className="w-full py-2.5 bg-[#F0AE00] text-gray-950 font-bold text-center text-[13px] tracking-wider rounded-xl shadow-xs border border-yellow-600/30">
          {alert.status_text || "ALERT (BE PREPARED)"}
        </div>
      </div>
    </section>
  );
};
