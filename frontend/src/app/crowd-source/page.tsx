"use client";

import React, { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { LoadingState } from "@/components/LoadingState";
import { WeatherAPI } from "@/lib/api";
import { CrowdReportItem } from "@/types/weather";
import { useWeather } from "@/context/WeatherContext";
import {
  Users,
  Send,
  Camera,
  MapPin,
  CheckCircle,
  AlertTriangle,
  Clock,
} from "lucide-react";

export default function CrowdSourcePage() {
  const { activeLocation } = useWeather();
  const [reports, setReports] = useState<CrowdReportItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  // Form State
  const [locationName, setLocationName] = useState(activeLocation);
  const [condition, setCondition] = useState("Moderate Rain");
  const [severity, setSeverity] = useState("Moderate");
  const [description, setDescription] = useState("");
  const [reporterName, setReporterName] = useState("");

  const loadReports = async () => {
    try {
      const data = await WeatherAPI.getCrowdReports();
      setReports(data);
    } catch (err) {
      console.error("Failed to load reports:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadReports();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim()) return;

    setIsSubmitting(true);
    try {
      await WeatherAPI.submitCrowdReport({
        location_name: locationName,
        condition,
        severity,
        description,
        reporter_name: reporterName.trim() || "Citizen Reporter",
      });
      setSubmittedSuccess(true);
      setDescription("");
      await loadReports();
      setTimeout(() => setSubmittedSuccess(false), 3000);
    } catch (err) {
      console.error("Submit error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0055A6] pb-10 select-none flex flex-col">
      <Header showBack={true} title="Crowd Source Weather" subtitle="Citizen Weather Reporting" />

      <div className="p-4 space-y-4 flex-1">
        {/* Reporting Form Card */}
        <div className="bg-[#3C709F] rounded-2xl p-4 shadow-md text-white border border-white/15 space-y-3">
          <div className="flex items-center gap-2 text-white font-bold text-base">
            <Users className="w-5 h-5 text-[#00DDE5]" />
            <h2>Report Current Weather</h2>
          </div>

          {submittedSuccess && (
            <div className="p-3 bg-green-500/20 text-[#8ED329] rounded-xl border border-green-500/40 text-xs font-bold flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              <span>Your report has been submitted to IMD Mausam feed!</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-3 text-xs">
            {/* Location Input */}
            <div>
              <label className="block text-white/80 font-medium mb-1">Your Location</label>
              <div className="relative flex items-center">
                <MapPin className="w-4 h-4 text-[#00DDE5] absolute left-3" />
                <input
                  type="text"
                  value={locationName}
                  onChange={(e) => setLocationName(e.target.value)}
                  required
                  placeholder="e.g. Raj Nagar Extension, Ghaziabad"
                  className="w-full bg-black/20 text-white rounded-xl pl-9 pr-3 py-2 border border-white/20 focus:border-[#00DDE5] outline-none"
                />
              </div>
            </div>

            {/* Condition & Severity Row */}
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-white/80 font-medium mb-1">Condition</label>
                <select
                  value={condition}
                  onChange={(e) => setCondition(e.target.value)}
                  className="w-full bg-[#06345C] text-white rounded-xl px-2.5 py-2 border border-white/20 focus:border-[#00DDE5] outline-none"
                >
                  <option value="Moderate Rain">Moderate Rain</option>
                  <option value="Heavy Downpour">Heavy Downpour</option>
                  <option value="Thunder & Lightning">Thunder & Lightning</option>
                  <option value="Hailstorm">Hailstorm</option>
                  <option value="Waterlogging / Flooding">Waterlogging</option>
                  <option value="Clear / Partly Cloudy">Clear / Partly Cloudy</option>
                  <option value="Dense Fog">Dense Fog</option>
                </select>
              </div>

              <div>
                <label className="block text-white/80 font-medium mb-1">Severity</label>
                <select
                  value={severity}
                  onChange={(e) => setSeverity(e.target.value)}
                  className="w-full bg-[#06345C] text-white rounded-xl px-2.5 py-2 border border-white/20 focus:border-[#00DDE5] outline-none"
                >
                  <option value="Low">Low (Mild)</option>
                  <option value="Moderate">Moderate</option>
                  <option value="High">High (Severe)</option>
                  <option value="Dangerous">Dangerous</option>
                </select>
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-white/80 font-medium mb-1">Observation Details</label>
              <textarea
                rows={2}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                placeholder="Describe wind speed, water accumulation, visibility..."
                className="w-full bg-black/20 text-white rounded-xl p-2.5 border border-white/20 focus:border-[#00DDE5] outline-none resize-none"
              />
            </div>

            {/* Reporter Name */}
            <div>
              <label className="block text-white/80 font-medium mb-1">Your Name (Optional)</label>
              <input
                type="text"
                value={reporterName}
                onChange={(e) => setReporterName(e.target.value)}
                placeholder="e.g. Amit Sharma"
                className="w-full bg-black/20 text-white rounded-xl px-3 py-2 border border-white/20 focus:border-[#00DDE5] outline-none"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-2.5 bg-[#A7C0D6] hover:bg-white text-[#06345C] font-bold rounded-xl flex items-center justify-center gap-2 shadow-sm transition active:scale-[0.98]"
            >
              <Send className="w-4 h-4" />
              <span>{isSubmitting ? "Submitting..." : "Submit Weather Report"}</span>
            </button>
          </form>
        </div>

        {/* Live Crowd Observations Feed */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold text-white/70 uppercase tracking-wider px-1">
            Recent Ground Observations ({reports.length})
          </h3>

          {isLoading ? (
            <LoadingState message="Loading community reports..." />
          ) : (
            <div className="space-y-2.5">
              {reports.map((item) => (
                <div
                  key={item.id}
                  className="bg-[#06345C] rounded-2xl p-3.5 border border-white/15 text-white shadow-sm space-y-1.5"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 font-bold text-sm">
                      <MapPin className="w-3.5 h-3.5 text-[#00DDE5]" />
                      <span className="truncate max-w-[200px]">{item.location_name}</span>
                    </div>
                    <span
                      className={`text-[10px] font-extrabold px-2 py-0.5 rounded-md ${
                        item.severity === "High" || item.severity === "Dangerous"
                          ? "bg-red-500/30 text-red-300 border border-red-500/40"
                          : "bg-yellow-500/20 text-[#FFBE00] border border-yellow-500/30"
                      }`}
                    >
                      {item.severity}
                    </span>
                  </div>

                  <p className="text-xs text-white/90 leading-snug">
                    <span className="font-semibold text-[#00DDE5]">{item.condition}: </span>
                    {item.description}
                  </p>

                  <div className="flex items-center justify-between pt-1 border-t border-white/10 text-[10px] text-white/60 font-medium">
                    <span>Reported by: {item.reporter_name}</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-white/50" />
                      {item.timestamp}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
