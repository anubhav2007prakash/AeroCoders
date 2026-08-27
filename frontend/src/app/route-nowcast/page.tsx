"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { Header } from "@/components/Header";
import { LoadingState } from "@/components/LoadingState";
import { WeatherAPI } from "@/lib/api";
import { RouteNowcastData } from "@/types/weather";
import { Navigation, MapPin, AlertTriangle, ArrowRight, Car } from "lucide-react";

const LeafletMap = dynamic(
  () => import("@/components/Map/LeafletMap").then((mod) => mod.LeafletMap),
  { ssr: false, loading: () => <LoadingState message="Loading Route Map..." /> }
);

export default function RouteNowcastPage() {
  const [origin, setOrigin] = useState("Delhi");
  const [destination, setDestination] = useState("Ghaziabad");
  const [routeData, setRouteData] = useState<RouteNowcastData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchRoute = async () => {
    setIsLoading(true);
    try {
      const data = await WeatherAPI.getRouteNowcast(origin, destination);
      setRouteData(data);
    } catch (err) {
      console.error("Route nowcast error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRoute();
  }, []);

  const waypoints = routeData?.waypoints || [];
  const polylinePoints = waypoints.map((w) => [w.lat, w.lon] as [number, number]);
  const markers = waypoints.map((w, idx) => ({
    id: idx,
    lat: w.lat,
    lon: w.lon,
    title: `${w.name} (${w.temp}°C)`,
    subtitle: `${w.condition} | Rain: ${w.rain_probability}%`,
    color: idx === 0 ? "#00DDE5" : idx === waypoints.length - 1 ? "#FF2020" : "#FFBE00",
  }));

  return (
    <div className="min-h-screen bg-[#0055A6] pb-10 select-none flex flex-col">
      <Header showBack={true} title="Route Now Cast" subtitle="Highway & Commute Weather" />

      <div className="p-4 space-y-4 flex-1">
        {/* Route Selector Card */}
        <div className="bg-[#3C709F] rounded-2xl p-4 shadow-md text-white border border-white/15 space-y-3">
          <div className="flex items-center gap-2">
            <Car className="w-5 h-5 text-[#00DDE5]" />
            <h2 className="font-bold text-sm">Plan Commute Route</h2>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <div>
              <label className="text-white/70 block mb-1">From</label>
              <input
                type="text"
                value={origin}
                onChange={(e) => setOrigin(e.target.value)}
                className="w-full bg-black/20 text-white rounded-xl px-3 py-2 border border-white/20 outline-none"
              />
            </div>

            <div>
              <label className="text-white/70 block mb-1">To</label>
              <input
                type="text"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="w-full bg-black/20 text-white rounded-xl px-3 py-2 border border-white/20 outline-none"
              />
            </div>
          </div>

          <button
            onClick={fetchRoute}
            className="w-full py-2 bg-[#A7C0D6] text-[#06345C] font-bold text-xs rounded-xl shadow-xs hover:bg-white transition active:scale-95"
          >
            Check Route Weather
          </button>
        </div>

        {/* Route Summary Banner */}
        {routeData && (
          <div className="bg-[#06345C] text-white p-3.5 rounded-2xl border border-white/20 shadow-md space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-[#FFBE00]">
                {routeData.origin} → {routeData.destination}
              </span>
              <span className="text-white/80">
                {routeData.total_distance_km} km ({routeData.estimated_time})
              </span>
            </div>
            <p className="text-xs text-white/90 leading-relaxed">
              {routeData.route_condition_summary}
            </p>
          </div>
        )}

        {/* Leaflet Route Map */}
        <div className="relative">
          <LeafletMap
            center={[28.6432, 77.3750]}
            zoom={11}
            markers={markers}
            polylines={[{ points: polylinePoints, color: "#FFBE00", weight: 4 }]}
            height="320px"
          />
        </div>

        {/* Waypoint Weather Breakdowns */}
        <div className="space-y-2">
          <h3 className="text-xs font-bold text-white/70 uppercase tracking-wider px-1">
            Weather Along Route ({waypoints.length} Points)
          </h3>

          <div className="space-y-2">
            {waypoints.map((point, idx) => (
              <div
                key={idx}
                className="bg-[#3C709F] rounded-xl p-3 text-white flex items-center justify-between shadow-xs border border-white/10"
              >
                <div>
                  <div className="flex items-center gap-1.5 font-bold text-xs">
                    <MapPin className="w-3.5 h-3.5 text-[#00DDE5]" />
                    <span>{point.name}</span>
                  </div>
                  <p className="text-[11px] text-white/80 mt-0.5">
                    {point.condition} | 💧 Rain: {point.rain_probability}%
                  </p>
                  {point.warning && (
                    <span className="text-[10px] font-semibold text-[#FFBE00] flex items-center gap-1 mt-0.5">
                      <AlertTriangle className="w-3 h-3 text-[#FFBE00]" />
                      {point.warning}
                    </span>
                  )}
                </div>

                <div className="text-right shrink-0">
                  <span className="text-base font-extrabold text-white">
                    {point.temp.toFixed(1)}°
                  </span>
                  <span className="text-[10px] text-white/70 block">
                    {point.distance_km} km
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
