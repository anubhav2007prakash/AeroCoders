"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { Header } from "@/components/Header";
import { RainTimeline } from "@/components/RainTimeline";
import { LoadingState } from "@/components/LoadingState";
import { WeatherAPI } from "@/lib/api";
import { RainTimelineData } from "@/types/weather";
import { CloudRain, MapPin, AlertCircle } from "lucide-react";

// Dynamically import LeafletMap with SSR disabled
const LeafletMap = dynamic(
  () => import("@/components/Map/LeafletMap").then((mod) => mod.LeafletMap),
  { ssr: false, loading: () => <LoadingState message="Loading Rain Alert Map..." /> }
);

export default function RainAlertPage() {
  const [timelineData, setTimelineData] = useState<RainTimelineData | null>(null);
  const [activeStep, setActiveStep] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadRainAlerts() {
      try {
        const data = await WeatherAPI.getRainAlertData();
        setTimelineData(data);
      } catch (err) {
        console.error("Rain alert data error:", err);
      } finally {
        setIsLoading(false);
      }
    }
    loadRainAlerts();
  }, []);

  const currentPoint = timelineData?.forecast_points[activeStep];

  const rainCircles = currentPoint
    ? [
        {
          lat: currentPoint.lat,
          lon: currentPoint.lon,
          radius: currentPoint.radius,
          color: currentPoint.color,
          fillOpacity: 0.5,
        },
        {
          lat: currentPoint.lat,
          lon: currentPoint.lon,
          radius: currentPoint.radius * 0.5,
          color: "#FF2020",
          fillOpacity: 0.6,
        },
      ]
    : [];

  const markers = currentPoint
    ? [
        {
          id: "rain-center",
          lat: currentPoint.lat,
          lon: currentPoint.lon,
          title: `Rain Cell (${currentPoint.intensity})`,
          subtitle: `Time: ${currentPoint.time}`,
          intensity: currentPoint.intensity,
          color: currentPoint.color,
        },
      ]
    : [];

  return (
    <div className="min-h-screen bg-[#0055A6] pb-10 select-none flex flex-col">
      {/* Header */}
      <Header showBack={true} title="Rain Alert & Nowcast" subtitle="Precipitation Tracking" />

      <div className="p-4 space-y-4 flex-1">
        {/* Info Header Banner */}
        <div className="bg-[#3C709F] text-white p-3 rounded-2xl shadow-sm flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CloudRain className="w-5 h-5 text-[#00DDE5]" />
            <div>
              <p className="text-xs font-semibold">Active Rain Spell (Ghaziabad-Noida)</p>
              <p className="text-[11px] text-white/80">
                Movement: ENE at 18 km/h | Severity: {currentPoint?.intensity || "Moderate"}
              </p>
            </div>
          </div>
          <span className="text-xs font-bold text-[#FFBE00] bg-black/20 px-2 py-1 rounded-md">
            {timelineData?.intervals[activeStep] || "7:43 PM"}
          </span>
        </div>

        {/* Rain Alert Map */}
        <div className="relative">
          <LeafletMap
            center={[28.6750, 77.4650]}
            zoom={11}
            markers={markers}
            overlayCircles={rainCircles}
            height="360px"
          />
        </div>

        {/* Rain Alert Timeline Player & 8-step Intensity Legend */}
        {timelineData && (
          <RainTimeline
            timelineData={timelineData}
            activeStep={activeStep}
            onStepChange={setActiveStep}
          />
        )}
      </div>
    </div>
  );
}
