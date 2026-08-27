"use client";

import React, { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { LoadingState } from "@/components/LoadingState";
import { WeatherAPI } from "@/lib/api";
import { AgrometData } from "@/types/weather";
import { Sprout, CloudRain, Thermometer, Droplets, BookOpen, CheckCircle } from "lucide-react";

export default function AgrometPage() {
  const [agrometData, setAgrometData] = useState<AgrometData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadAgromet() {
      try {
        const data = await WeatherAPI.getAgrometData("Ghaziabad");
        setAgrometData(data);
      } catch (err) {
        console.error("Agromet load error:", err);
      } finally {
        setIsLoading(false);
      }
    }
    loadAgromet();
  }, []);

  if (isLoading || !agrometData || agrometData.bulletins.length === 0) {
    return (
      <div className="min-h-screen bg-[#0055A6]">
        <Header showBack={true} title="Agromet Advisory" subtitle="Gramin Krishi Mausam Sewa" />
        <LoadingState message="Loading Agromet Advisory Bulletins..." />
      </div>
    );
  }

  const bulletin = agrometData.bulletins[0];

  return (
    <div className="min-h-screen bg-[#0055A6] pb-10 select-none flex flex-col">
      <Header showBack={true} title="Agromet Products" subtitle="Gramin Krishi Mausam Sewa" />

      <div className="p-4 space-y-4 flex-1">
        {/* District Agromet Bulletin Banner */}
        <div className="bg-[#3C709F] rounded-2xl p-4 shadow-md text-white space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sprout className="w-6 h-6 text-[#8ED329]" />
              <div>
                <h2 className="font-bold text-base">District Krishi Bulletin</h2>
                <p className="text-xs text-white/80">
                  {bulletin.district}, {bulletin.state} ({bulletin.bulletin_date})
                </p>
              </div>
            </div>
            <span className="px-2.5 py-1 bg-[#8ED329] text-[#06345C] font-bold text-xs rounded-lg">
              GKMS
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs pt-1 border-t border-white/15">
            <div className="bg-black/10 p-2.5 rounded-xl">
              <span className="text-white/70 block flex items-center gap-1">
                <CloudRain className="w-3.5 h-3.5 text-[#00DDE5]" />
                Rainfall Forecast
              </span>
              <span className="font-medium text-[11px] block mt-0.5">
                {bulletin.rainfall_forecast}
              </span>
            </div>

            <div className="bg-black/10 p-2.5 rounded-xl">
              <span className="text-white/70 block flex items-center gap-1">
                <Thermometer className="w-3.5 h-3.5 text-[#FFBE00]" />
                Temp & Humidity
              </span>
              <span className="font-medium text-[11px] block mt-0.5">
                {bulletin.temp_forecast} ({bulletin.humidity_forecast})
              </span>
            </div>
          </div>
        </div>

        {/* General Farming Advisory */}
        <div className="bg-[#06345C] text-white p-4 rounded-2xl border border-white/20 shadow-md space-y-2">
          <div className="flex items-center gap-2 text-[#FFBE00] font-bold text-xs uppercase tracking-wider">
            <BookOpen className="w-4 h-4" />
            <span>General Advisory for Farmers</span>
          </div>
          <p className="text-xs leading-relaxed text-white/90">
            {bulletin.general_advisory}
          </p>
        </div>

        {/* Crop-Wise Action Plan */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold text-white/70 uppercase tracking-wider px-1">
            Crop-Specific Advisories ({bulletin.crop_advisories.length})
          </h3>

          <div className="space-y-2.5">
            {bulletin.crop_advisories.map((crop, idx) => (
              <div
                key={idx}
                className="bg-[#3C709F] rounded-2xl p-3.5 text-white shadow-sm border border-white/10 space-y-1.5"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-[#00DDE5]">
                    🌱 {crop.crop}
                  </span>
                  <span className="text-[10px] bg-black/20 px-2 py-0.5 rounded-md font-medium text-white/80">
                    Stage: {crop.stage}
                  </span>
                </div>
                <p className="text-xs text-white/90 leading-relaxed">
                  {crop.advisory}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
