"use client";

import React, { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { WeatherAPI } from "@/lib/api";
import { UserSettings } from "@/types/weather";
import {
  Settings,
  Languages,
  Thermometer,
  Wind,
  Bell,
  Navigation,
  Info,
  Check,
  Droplets,
} from "lucide-react";

export default function SettingsPage() {
  const [settings, setSettings] = useState<UserSettings>({
    language: "English",
    temp_unit: "°C",
    wind_unit: "Km/h",
    rain_unit: "mm",
    push_notifications: true,
    auto_location: true,
  });
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    async function loadSettings() {
      try {
        const s = await WeatherAPI.getSettings();
        setSettings(s);
      } catch (err) {
        console.warn("Using local settings state:", err);
      }
    }
    loadSettings();
  }, []);

  const handleUpdate = async (updated: Partial<UserSettings>) => {
    const next = { ...settings, ...updated };
    setSettings(next);
    try {
      await WeatherAPI.updateSettings(next);
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 2000);
    } catch (e) {
      console.error("Save settings error:", e);
    }
  };

  return (
    <div className="min-h-screen bg-[#0055A6] pb-10 select-none flex flex-col">
      <Header showBack={true} title="App Settings" subtitle="Preferences & Units" />

      <div className="p-4 space-y-4 flex-1">
        {savedSuccess && (
          <div className="bg-green-500/20 text-[#8ED329] p-2.5 rounded-xl border border-green-500/30 text-xs font-bold text-center animate-fade-in flex items-center justify-center gap-1.5">
            <Check className="w-4 h-4" />
            <span>Settings updated successfully</span>
          </div>
        )}

        {/* Units Configuration */}
        <div className="bg-[#3C709F] rounded-2xl p-4 text-white shadow-md space-y-4 border border-white/10">
          <h3 className="text-xs font-bold uppercase tracking-wider text-white/70">
            Units of Measurement
          </h3>

          {/* Temperature Unit */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Thermometer className="w-5 h-5 text-[#FFBE00]" />
              <span className="text-sm font-medium">Temperature Unit</span>
            </div>
            <div className="flex bg-black/20 p-1 rounded-xl gap-1 text-xs font-bold">
              {["°C", "°F"].map((unit) => (
                <button
                  key={unit}
                  onClick={() => handleUpdate({ temp_unit: unit })}
                  className={`px-3 py-1 rounded-lg transition ${
                    settings.temp_unit === unit
                      ? "bg-[#00DDE5] text-[#06345C]"
                      : "text-white/70 hover:text-white"
                  }`}
                >
                  {unit}
                </button>
              ))}
            </div>
          </div>

          {/* Wind Unit */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Wind className="w-5 h-5 text-[#00DDE5]" />
              <span className="text-sm font-medium">Wind Speed Unit</span>
            </div>
            <div className="flex bg-black/20 p-1 rounded-xl gap-1 text-xs font-bold">
              {["Km/h", "m/s", "knots"].map((unit) => (
                <button
                  key={unit}
                  onClick={() => handleUpdate({ wind_unit: unit })}
                  className={`px-2.5 py-1 rounded-lg transition ${
                    settings.wind_unit === unit
                      ? "bg-[#00DDE5] text-[#06345C]"
                      : "text-white/70 hover:text-white"
                  }`}
                >
                  {unit}
                </button>
              ))}
            </div>
          </div>

          {/* Rain Unit */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Droplets className="w-5 h-5 text-[#00DDE5]" />
              <span className="text-sm font-medium">Rainfall Unit</span>
            </div>
            <div className="flex bg-black/20 p-1 rounded-xl gap-1 text-xs font-bold">
              {["mm", "in"].map((unit) => (
                <button
                  key={unit}
                  onClick={() => handleUpdate({ rain_unit: unit })}
                  className={`px-3 py-1 rounded-lg transition ${
                    settings.rain_unit === unit
                      ? "bg-[#00DDE5] text-[#06345C]"
                      : "text-white/70 hover:text-white"
                  }`}
                >
                  {unit}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Language Selection */}
        <div className="bg-[#3C709F] rounded-2xl p-4 text-white shadow-md space-y-3 border border-white/10">
          <h3 className="text-xs font-bold uppercase tracking-wider text-white/70">
            Language / भाषा
          </h3>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Languages className="w-5 h-5 text-white" />
              <span className="text-sm font-medium">Display Language</span>
            </div>
            <select
              value={settings.language}
              onChange={(e) => handleUpdate({ language: e.target.value })}
              className="bg-[#06345C] text-white text-xs font-bold rounded-xl px-3 py-1.5 border border-white/20 outline-none"
            >
              <option value="English">English</option>
              <option value="Hindi">हिंदी (Hindi)</option>
              <option value="Bengali">বাংলা (Bengali)</option>
              <option value="Tamil">தமிழ் (Tamil)</option>
              <option value="Telugu">తెలుగు (Telugu)</option>
              <option value="Marathi">मराठी (Marathi)</option>
            </select>
          </div>
        </div>

        {/* Notifications & System Toggles */}
        <div className="bg-[#3C709F] rounded-2xl p-4 text-white shadow-md space-y-4 border border-white/10">
          <h3 className="text-xs font-bold uppercase tracking-wider text-white/70">
            Permissions & Alerts
          </h3>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bell className="w-5 h-5 text-white" />
              <span className="text-sm font-medium">Severe Weather Alerts</span>
            </div>
            <button
              onClick={() =>
                handleUpdate({ push_notifications: !settings.push_notifications })
              }
              className={`w-11 h-6 rounded-full p-0.5 transition-colors ${
                settings.push_notifications ? "bg-[#8ED329]" : "bg-gray-500"
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white transition-transform ${
                  settings.push_notifications ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Navigation className="w-5 h-5 text-white" />
              <span className="text-sm font-medium">Auto Detect Location</span>
            </div>
            <button
              onClick={() =>
                handleUpdate({ auto_location: !settings.auto_location })
              }
              className={`w-11 h-6 rounded-full p-0.5 transition-colors ${
                settings.auto_location ? "bg-[#8ED329]" : "bg-gray-500"
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white transition-transform ${
                  settings.auto_location ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
          </div>
        </div>

        {/* About App Card */}
        <div className="bg-[#06345C] rounded-2xl p-4 text-white shadow-md border border-white/20 space-y-2">
          <div className="flex items-center gap-2 text-[#00DDE5] font-bold text-xs">
            <Info className="w-4 h-4" />
            <span>About IMD Mausam Application</span>
          </div>
          <p className="text-xs text-white/80 leading-relaxed">
            The official weather application of the India Meteorological Department (IMD), Ministry of Earth Sciences, Government of India. Providing accurate nowcasts, radar imagery, cyclone advisories, and agromet warnings.
          </p>
          <div className="pt-2 text-[10px] text-white/50 border-t border-white/10 flex justify-between">
            <span>App Version: 1.0.0 (Baseline)</span>
            <span>API: Connected</span>
          </div>
        </div>
      </div>
    </div>
  );
}
