"use client";

import React, { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { LoadingState } from "@/components/LoadingState";
import { WeatherAPI } from "@/lib/api";
import { AviationData } from "@/types/weather";
import { Plane, Eye, Wind, Gauge, AlertCircle, FileText } from "lucide-react";

export default function AviationPage() {
  const [aviationData, setAviationData] = useState<AviationData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [expandedIcao, setExpandedIcao] = useState<string | null>("VIDP");

  useEffect(() => {
    async function loadAviation() {
      try {
        const data = await WeatherAPI.getAviationData();
        setAviationData(data);
      } catch (err) {
        console.error("Aviation load error:", err);
      } finally {
        setIsLoading(false);
      }
    }
    loadAviation();
  }, []);

  if (isLoading || !aviationData) {
    return (
      <div className="min-h-screen bg-[#0055A6]">
        <Header showBack={true} title="Aviation Weather" subtitle="METAR / TAF Services" />
        <LoadingState message="Loading Aviation Meteorological Data..." />
      </div>
    );
  }

  const getFlightRuleBadge = (rule: string) => {
    switch (rule) {
      case "VFR":
        return "bg-green-500 text-white";
      case "MVFR":
        return "bg-[#00DDE5] text-[#06345C]";
      case "IFR":
        return "bg-[#FFBE00] text-black";
      default:
        return "bg-red-500 text-white";
    }
  };

  return (
    <div className="min-h-screen bg-[#0055A6] pb-10 select-none flex flex-col">
      <Header showBack={true} title="Aviation Weather" subtitle="IMD Aerodrome Forecast" />

      <div className="p-4 space-y-4 flex-1">
        {/* FIR SIGMET Banner */}
        {aviationData.sigmet && (
          <div className="bg-[#06345C] rounded-2xl p-3.5 border border-white/20 text-white space-y-1">
            <div className="flex items-center gap-2 text-[#FFBE00] font-bold text-xs">
              <AlertCircle className="w-4 h-4" />
              <span>SIGMET Warning - {aviationData.fir}</span>
            </div>
            <p className="text-[11px] font-mono text-white/80 break-words leading-relaxed">
              {aviationData.sigmet}
            </p>
          </div>
        )}

        {/* Airport Weather Cards List */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold text-white/70 uppercase tracking-wider px-1">
            Major Indian Aerodromes ({aviationData.airports.length})
          </h3>

          {aviationData.airports.map((apt) => {
            const isExpanded = expandedIcao === apt.icao;
            return (
              <div
                key={apt.icao}
                className="bg-[#3C709F] rounded-2xl p-4 shadow-md text-white border border-white/10 space-y-3"
              >
                {/* Header */}
                <div
                  className="flex items-center justify-between cursor-pointer"
                  onClick={() => setExpandedIcao(isExpanded ? null : apt.icao)}
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-full bg-[#0055A6] flex items-center justify-center text-white">
                      <Plane className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-base">{apt.icao}</span>
                        <span className="text-xs text-white/80">({apt.city})</span>
                      </div>
                      <p className="text-[11px] text-white/70 truncate max-w-[180px]">
                        {apt.name}
                      </p>
                    </div>
                  </div>

                  <span
                    className={`px-2.5 py-1 text-xs font-bold rounded-lg ${getFlightRuleBadge(
                      apt.flight_rules
                    )}`}
                  >
                    {apt.flight_rules}
                  </span>
                </div>

                {/* Primary Metrics Grid */}
                <div className="grid grid-cols-3 gap-2 py-2 border-t border-white/15 text-center text-xs">
                  <div className="bg-black/10 rounded-xl p-2">
                    <span className="text-[10px] text-white/70 block">Visibility</span>
                    <span className="font-bold text-sm text-[#00DDE5]">
                      {apt.visibility_m} m
                    </span>
                  </div>

                  <div className="bg-black/10 rounded-xl p-2">
                    <span className="text-[10px] text-white/70 block">Wind</span>
                    <span className="font-bold text-sm">
                      {apt.wind_direction_deg}° / {apt.wind_speed_kt} kt
                    </span>
                  </div>

                  <div className="bg-black/10 rounded-xl p-2">
                    <span className="text-[10px] text-white/70 block">Temp / Dew</span>
                    <span className="font-bold text-sm">
                      {apt.temp}° / {apt.dew_point}°
                    </span>
                  </div>
                </div>

                {/* Raw METAR & TAF Reports */}
                {isExpanded && (
                  <div className="space-y-2 pt-2 border-t border-white/15 text-xs">
                    <div>
                      <span className="text-[10px] font-bold text-white/70 uppercase tracking-wider block mb-0.5">
                        Current METAR:
                      </span>
                      <p className="bg-[#06345C] p-2.5 rounded-xl font-mono text-[11px] text-green-300 break-words leading-relaxed">
                        {apt.metar}
                      </p>
                    </div>

                    <div>
                      <span className="text-[10px] font-bold text-white/70 uppercase tracking-wider block mb-0.5">
                        Aerodrome Forecast (TAF):
                      </span>
                      <p className="bg-[#06345C] p-2.5 rounded-xl font-mono text-[11px] text-yellow-200 break-words leading-relaxed">
                        {apt.taf}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
