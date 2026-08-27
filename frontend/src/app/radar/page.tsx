"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { Header } from "@/components/Header";
import { LoadingState } from "@/components/LoadingState";
import { WeatherAPI } from "@/lib/api";
import { RadarData } from "@/types/weather";
import { Radio, AlertTriangle, Info, Clock, MapPin } from "lucide-react";

// Dynamically import LeafletMap with SSR disabled
const LeafletMap = dynamic(
  () => import("@/components/Map/LeafletMap").then((mod) => mod.LeafletMap),
  { ssr: false, loading: () => <LoadingState message="Loading Doppler Radar Map..." /> }
);

export default function RadarPage() {
  const [radarData, setRadarData] = useState<RadarData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadRadar() {
      try {
        const data = await WeatherAPI.getRadarData();
        setRadarData(data);
      } catch (err) {
        console.error("Failed to load radar data:", err);
      } finally {
        setIsLoading(false);
      }
    }
    loadRadar();
  }, []);

  const radarMarkers =
    radarData?.reflectivity_points.map((p, idx) => ({
      id: idx,
      lat: p.lat,
      lon: p.lon,
      title: `Radar Cell (${p.intensity} dBZ)`,
      subtitle: `Precipitation Level: ${p.level}`,
      intensity: `${p.intensity} dBZ (${p.level})`,
      color:
        p.intensity >= 50
          ? "#FF2020"
          : p.intensity >= 40
          ? "#FF9900"
          : p.intensity >= 30
          ? "#00CC44"
          : "#00DDE5",
    })) || [];

  return (
    <div className="min-h-screen bg-[#0055A6] pb-10 select-none flex flex-col">
      {/* Header */}
      <Header showBack={true} title="Doppler Weather Radar" subtitle="IMD Radar Network" />

      <div className="p-4 space-y-4 flex-1">
        {/* Radar Station Info Box */}
        <div className="bg-[#06345C] text-white p-3.5 rounded-2xl border border-white/20 shadow-md flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-[#0055A6] flex items-center justify-center text-[#00DDE5]">
              <Radio className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <p className="text-xs text-white/70 flex items-center gap-1">
                <MapPin className="w-3 h-3 text-[#00DDE5]" />
                {radarData?.station || "DWR Palam, Delhi (IMD)"}
              </p>
              <p className="text-xs font-semibold text-white mt-0.5 flex items-center gap-1">
                <Clock className="w-3 h-3 text-[#FFBE00]" />
                {radarData?.timestamp || "26 Aug 2026, 19:30 IST"} (250 km)
              </p>
            </div>
          </div>

          <span className="px-2.5 py-1 bg-green-500/20 text-[#8ED329] text-[11px] font-bold rounded-lg border border-green-500/30">
            ONLINE
          </span>
        </div>

        {/* Leaflet Interactive Radar Map */}
        <div className="relative">
          <LeafletMap
            center={[28.6692, 77.4538]}
            zoom={9}
            markers={radarMarkers}
            showRadarSimulation={true}
            height="380px"
          />
        </div>

        {/* Reflectivity dBZ Intensity Scale */}
        <div className="bg-[#3C709F] rounded-2xl p-3 shadow-md space-y-2">
          <div className="flex justify-between text-xs font-semibold text-white/90">
            <span>dBZ Reflectivity Scale</span>
            <span className="text-[#00DDE5]">Precipitation Intensity</span>
          </div>

          <div className="grid grid-cols-5 h-3 rounded-lg overflow-hidden border border-white/20">
            <div className="bg-[#00DDE5] text-[9px] text-black font-bold flex items-center justify-center">15</div>
            <div className="bg-[#0088FF] text-[9px] text-white font-bold flex items-center justify-center">30</div>
            <div className="bg-[#00CC44] text-[9px] text-black font-bold flex items-center justify-center">40</div>
            <div className="bg-[#FFBE00] text-[9px] text-black font-bold flex items-center justify-center">50</div>
            <div className="bg-[#FF2020] text-[9px] text-white font-bold flex items-center justify-center">60+</div>
          </div>

          <div className="flex justify-between text-[10px] text-white/70">
            <span>Light</span>
            <span>Moderate</span>
            <span>Heavy</span>
            <span>Severe / Hail</span>
          </div>
        </div>

        {/* Radar Warnings Bulletins */}
        {radarData?.active_warnings && radarData.active_warnings.length > 0 && (
          <div className="bg-[#FFBE00] text-gray-950 p-3.5 rounded-2xl border border-yellow-400 shadow-md">
            <div className="flex items-center gap-1.5 font-bold text-xs uppercase tracking-wide mb-1">
              <AlertTriangle className="w-4 h-4 text-gray-950" />
              <span>Active Radar Convective Warning</span>
            </div>
            <p className="text-xs font-medium leading-relaxed">
              {radarData.active_warnings[0]}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
