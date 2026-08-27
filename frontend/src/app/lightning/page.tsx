"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { Header } from "@/components/Header";
import { LoadingState } from "@/components/LoadingState";
import { WeatherAPI } from "@/lib/api";
import { LightningData } from "@/types/weather";
import { Zap, ShieldCheck, AlertTriangle, Radio } from "lucide-react";

const LeafletMap = dynamic(
  () => import("@/components/Map/LeafletMap").then((mod) => mod.LeafletMap),
  { ssr: false, loading: () => <LoadingState message="Loading Lightning Activity Map..." /> }
);

export default function LightningPage() {
  const [lightningData, setLightningData] = useState<LightningData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadLightning() {
      try {
        const data = await WeatherAPI.getLightningData();
        setLightningData(data);
      } catch (err) {
        console.error("Lightning load error:", err);
      } finally {
        setIsLoading(false);
      }
    }
    loadLightning();
  }, []);

  if (isLoading || !lightningData) {
    return (
      <div className="min-h-screen bg-[#0055A6]">
        <Header showBack={true} title="Lightning Location" subtitle="Damini Network" />
        <LoadingState message="Loading Lightning Sensor Data..." />
      </div>
    );
  }

  const strikeMarkers = lightningData.strikes.map((s) => ({
    id: s.id,
    lat: s.lat,
    lon: s.lon,
    title: `Lightning Flash (${s.strike_type})`,
    subtitle: `Time: ${s.time} | Peak: ${s.peak_current_ka} kA`,
    color: "#FFBE00",
  }));

  const dangerZones = lightningData.strikes.map((s) => ({
    lat: s.lat,
    lon: s.lon,
    radius: 3500,
    color: "#FFBE00",
    fillOpacity: 0.35,
  }));

  return (
    <div className="min-h-screen bg-[#0055A6] pb-10 select-none flex flex-col">
      <Header showBack={true} title="Lightning Location" subtitle="Damini Sensor Network" />

      <div className="p-4 space-y-4 flex-1">
        {/* Status Card */}
        <div className="bg-[#06345C] text-white p-4 rounded-2xl border border-white/20 shadow-md">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Zap className="w-6 h-6 text-[#FFBE00] fill-[#FFBE00]" />
              <div>
                <h3 className="text-base font-bold">Lightning Sensor Activity</h3>
                <p className="text-xs text-white/70">{lightningData.station_area}</p>
              </div>
            </div>
            <div className="text-right">
              <span className="text-xl font-extrabold text-[#FFBE00]">
                {lightningData.total_strikes_last_hour}
              </span>
              <p className="text-[10px] text-white/70">Strikes / 1hr</p>
            </div>
          </div>
        </div>

        {/* Interactive Lightning Map */}
        <div className="relative">
          <LeafletMap
            center={[28.6692, 77.4538]}
            zoom={11}
            markers={strikeMarkers}
            overlayCircles={dangerZones}
            height="360px"
          />
        </div>

        {/* Safety Advisory Banner */}
        <div className="bg-[#FFBE00] text-gray-950 p-4 rounded-2xl border border-yellow-500 shadow-md space-y-1">
          <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-wide">
            <AlertTriangle className="w-4 h-4 text-gray-950" />
            <span>IMD Lightning Safety Advisory</span>
          </div>
          <p className="text-xs font-medium leading-relaxed">
            {lightningData.safety_advisory}
          </p>
        </div>
      </div>
    </div>
  );
}
