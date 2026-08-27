"use client";

import React, { useState } from "react";
import { Header } from "@/components/Header";
import { ChevronDown, ChevronUp, HelpCircle } from "lucide-react";

const FAQ_ITEMS = [
  {
    q: "What is a Weather Nowcast?",
    a: "Nowcasting is weather forecasting for a very short period (usually up to 3 to 6 hours) based on real-time observations from Doppler Weather Radars (DWR), satellite images, and automatic weather stations (AWS). It provides early warnings for thunderstorms, squalls, and heavy localized rainfall.",
  },
  {
    q: "How do I interpret the Doppler Radar Reflectivity (dBZ) scale?",
    a: "Reflectivity is measured in decibels (dBZ). Values below 20 dBZ represent cloud droplets or light drizzle (< 2.5 mm/h), 20-35 dBZ represent moderate rain, 35-45 dBZ represent heavy rain, and values above 50 dBZ indicate severe convective thunderstorms or possible hailstones.",
  },
  {
    q: "What are the color codes used in IMD Weather Warnings?",
    a: "IMD uses a 4-color warning system: Green (No warning / Be calm), Yellow (Watch / Be updated on changing weather), Orange (Alert / Be prepared for severe weather impacts), and Red (Warning / Take action to protect life and property).",
  },
  {
    q: "How does the Wind Compass instrument display data?",
    a: "The circular wind compass displays the current wind speed in kilometers per hour (Km/h) in the center, and a red indicator needle pointing in the direction of the wind with 360-degree cardinal coordinates (N, E, S, W).",
  },
  {
    q: "What is the National Air Quality Index (AQI) source?",
    a: "AQI data is continuously sourced from the Central Pollution Control Board (CPCB) air monitoring network. Levels between 0-50 are Good, 51-100 Satisfactory, 101-200 Moderate, 201-300 Poor, 301-400 Very Poor, and 401-500 Severe.",
  },
  {
    q: "How does the Agromet (GKMS) service assist farmers?",
    a: "Gramin Krishi Mausam Sewa (GKMS) provides bi-weekly district-level agrometeorological advisory bulletins. These contain weather forecasts and customized farm recommendations for sowing, irrigation, pesticide spraying, and crop protection.",
  },
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div className="min-h-screen bg-[#0055A6] pb-10 select-none flex flex-col">
      <Header showBack={true} title="Frequently Asked Questions" subtitle="IMD Weather Help" />

      <div className="p-4 space-y-4 flex-1">
        <div className="bg-[#3C709F] rounded-2xl p-4 text-white shadow-md space-y-1 border border-white/10">
          <div className="flex items-center gap-2 font-bold text-sm">
            <HelpCircle className="w-5 h-5 text-[#00DDE5]" />
            <h2>IMD Mausam Knowledge Base</h2>
          </div>
          <p className="text-xs text-white/80">
            Learn how IMD forecasts, radar maps, and severe weather warnings are generated.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-2.5">
          {FAQ_ITEMS.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-[#06345C] rounded-2xl overflow-hidden border border-white/15 shadow-sm transition"
              >
                <button
                  onClick={() => toggleAccordion(idx)}
                  className="w-full p-3.5 text-left text-white font-semibold text-xs sm:text-sm flex items-center justify-between gap-2 hover:bg-white/5 transition"
                >
                  <span>{item.q}</span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-[#00DDE5] shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-white/60 shrink-0" />
                  )}
                </button>

                {isOpen && (
                  <div className="px-3.5 pb-3.5 pt-1 text-xs text-white/80 leading-relaxed border-t border-white/10">
                    {item.a}
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
