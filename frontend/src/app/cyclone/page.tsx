"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { Header } from "@/components/Header";
import { LoadingState } from "@/components/LoadingState";
import { WeatherAPI } from "@/lib/api";
import { CycloneData } from "@/types/weather";
import { Compass, AlertOctagon, Wind, MapPin, ShieldAlert } from "lucide-react";

const LeafletMap = dynamic(
  () => import("@/components/Map/LeafletMap").then((mod) => mod.LeafletMap),
  { ssr: false, loading: () => <LoadingState message="Loading Cyclone Tracking Map..." /> }
);

export default function CyclonePage() {
  const [cycloneData, setCycloneData] = useState<CycloneData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadCyclone() {
      try {
        const data = await WeatherAPI.getCycloneData();
        setCycloneData(data);
      } catch (err) {
        console.error("Cyclone load error:", err);
      } finally {
        setIsLoading(false);
      }
    }
    loadCyclone();
  }, []);

  if (isLoading || !cycloneData) {
    return (
      <div className="min-h-screen bg-[#0055A6]">
        <Header showBack={true} title="Cyclone Warning" subtitle="IMD RSMC New Delhi" />
        <LoadingState message="Loading Cyclone Information..." />
      </div>
    );
  }

  const trackPoints = cycloneData.track.map((pt) => [pt.lat, pt.lon] as [number, number]);
  const markers = cycloneData.track.map((pt, idx) => ({
    id: `track-${idx}`,
    lat: pt.lat,
    lon: pt.lon,
    title: `${pt.time}: ${pt.category}`,
    subtitle: `Wind: ${pt.intensity_knots} Knots | Pressure: ${pt.pressure_hpa} hPa`,
    color: idx === 3 ? "#FF2020" : idx > 3 ? "#FF9900" : "#0055A6",
  }));

  const eyeCircle = [
    {
      lat: cycloneData.current_lat,
      lon: cycloneData.current_lon,
      radius: 45000,
      color: "#FF2020",
      fillOpacity: 0.35,
    },
  ];

  return (
    <div className="min-h-screen bg-[#0055A6] pb-10 select-none flex flex-col">
      <Header showBack={true} title="Cyclone Warning" subtitle="Regional Specialised Meteorological Centre" />

      <div className="p-4 space-y-4 flex-1">
        {/* Cyclone Status Hero Card */}
        <div className="bg-[#FF2020]/95 text-white p-4 rounded-2xl shadow-lg border border-red-400/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Compass className="w-6 h-6 animate-spin text-white" />
              <h2 className="text-lg font-bold">{cycloneData.name}</h2>
            </div>
            <span className="px-2.5 py-1 bg-white text-[#FF2020] text-xs font-extrabold rounded-lg">
              {cycloneData.warning_level}
            </span>
          </div>

          <p className="text-xs font-semibold text-white/90 mt-1">
            Status: {cycloneData.status} ({cycloneData.basin})
          </p>

          <div className="grid grid-cols-2 gap-2 mt-3 pt-3 border-t border-white/20 text-xs">
            <div>
              <span className="text-white/70 block">Max Wind Speed</span>
              <span className="font-bold">{cycloneData.max_wind_speed}</span>
            </div>
            <div>
              <span className="text-white/70 block">Estimated Landfall</span>
              <span className="font-bold">{cycloneData.estimated_landfall}</span>
            </div>
          </div>
        </div>

        {/* Cyclone Tracking Map */}
        <div className="relative">
          <LeafletMap
            center={[cycloneData.current_lat, cycloneData.current_lon]}
            zoom={6}
            markers={markers}
            overlayCircles={eyeCircle}
            polylines={[{ points: trackPoints, color: "#FFBE00", weight: 3.5 }]}
            height="340px"
          />
        </div>

        {/* Special Cyclone Bulletin */}
        <div className="bg-[#06345C] rounded-2xl p-4 border border-white/20 text-white space-y-2">
          <div className="flex items-center gap-2 text-[#FFBE00] font-bold text-xs uppercase tracking-wider">
            <ShieldAlert className="w-4 h-4" />
            <span>Official IMD Cyclone Bulletin</span>
          </div>
          <p className="text-xs leading-relaxed text-white/90">
            {cycloneData.bulletin_text}
          </p>
        </div>
      </div>
    </div>
  );
}
