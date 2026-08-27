"use client";

import React, { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { LoadingState } from "@/components/LoadingState";
import { WeatherAPI } from "@/lib/api";
import { NotificationItem } from "@/types/weather";
import { Bell, AlertTriangle, CloudRain, Zap, Compass, CheckCircle } from "lucide-react";

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadNotifications() {
      try {
        const data = await WeatherAPI.getNotifications();
        setNotifications(data);
      } catch (err) {
        console.error("Notifications load error:", err);
      } finally {
        setIsLoading(false);
      }
    }
    loadNotifications();
  }, []);

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case "thunderstorm":
        return <AlertTriangle className="w-5 h-5 text-[#FFBE00]" />;
      case "heavy rain":
        return <CloudRain className="w-5 h-5 text-[#00DDE5]" />;
      case "lightning":
        return <Zap className="w-5 h-5 text-yellow-400" />;
      case "cyclone":
        return <Compass className="w-5 h-5 text-red-400" />;
      default:
        return <Bell className="w-5 h-5 text-white" />;
    }
  };

  const getSeverityBadge = (severity: string) => {
    switch (severity.toLowerCase()) {
      case "red":
        return "bg-red-600 text-white";
      case "orange":
        return "bg-orange-500 text-white";
      case "yellow":
        return "bg-yellow-400 text-gray-950 font-bold";
      default:
        return "bg-green-500 text-white";
    }
  };

  return (
    <div className="min-h-screen bg-[#0055A6] pb-10 select-none flex flex-col">
      <Header showBack={true} title="Weather Alerts" subtitle="IMD Nowcast Notifications" />

      <div className="p-4 space-y-4 flex-1">
        {isLoading ? (
          <LoadingState message="Loading alert notifications..." />
        ) : notifications.length === 0 ? (
          <div className="bg-[#3C709F] rounded-2xl p-8 text-center text-white/80 space-y-2">
            <Bell className="w-10 h-10 text-white/40 mx-auto" />
            <p className="font-semibold text-sm">No active weather alerts</p>
            <p className="text-xs text-white/60">
              You will receive live IMD warnings when severe weather is detected.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-white/70 uppercase tracking-wider px-1">
              Active Warnings ({notifications.length})
            </h3>

            <div className="space-y-2.5">
              {notifications.map((item) => (
                <div
                  key={item.id}
                  className="bg-[#06345C] rounded-2xl p-4 text-white shadow-md border border-white/15 space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 rounded-full bg-white/10">
                        {getCategoryIcon(item.category)}
                      </div>
                      <span className="font-bold text-sm leading-tight">
                        {item.title}
                      </span>
                    </div>

                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-md font-bold ${getSeverityBadge(
                        item.severity
                      )}`}
                    >
                      {item.severity} Alert
                    </span>
                  </div>

                  <p className="text-xs text-white/90 leading-relaxed">
                    {item.description}
                  </p>

                  <div className="flex items-center justify-between pt-1 border-t border-white/10 text-[10px] text-white/60">
                    <span>Region: {item.area}</span>
                    <span>{item.timestamp}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
