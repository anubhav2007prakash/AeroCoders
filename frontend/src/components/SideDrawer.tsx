"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  UserCircle,
  Sprout,
  Plane,
  Users,
  Compass,
  Zap,
  Radio,
  CloudRain,
  Navigation,
  Languages,
  Heart,
  Bell,
  Share2,
  Star,
  HelpCircle,
  Settings,
  ChevronRight,
  X,
  CheckCircle,
} from "lucide-react";
import { useWeather } from "@/context/WeatherContext";

export const SideDrawer: React.FC = () => {
  const { isDrawerOpen, closeDrawer } = useWeather();
  const router = useRouter();
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [showRatingModal, setShowRatingModal] = useState<boolean>(false);
  const [rating, setRating] = useState<number>(5);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const handleNavigate = (path: string) => {
    closeDrawer();
    router.push(path);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "IMD Mausam Weather App",
          text: "Check current weather, radar and rain alerts on IMD Mausam app.",
          url: window.location.origin,
        });
      } catch (err) {
        // Share dismissed
      }
    } else {
      navigator.clipboard?.writeText(window.location.origin);
      showToast("Link copied to clipboard!");
    }
  };

  const handleRateApp = () => {
    setShowRatingModal(true);
  };

  if (!isDrawerOpen && !showRatingModal && !toastMessage) return null;

  return (
    <>
      {/* Toast message */}
      {toastMessage && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 bg-[#06345C] text-white px-4 py-2 rounded-lg text-sm shadow-xl flex items-center gap-2 border border-white/20 animate-fade-in">
          <CheckCircle className="w-4 h-4 text-[#8ED329]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Rating Modal */}
      {showRatingModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white text-gray-900 w-full max-w-xs rounded-2xl p-5 shadow-2xl animate-scale-up">
            <h3 className="text-lg font-bold text-[#0055A6]">Rate IMD Mausam</h3>
            <p className="text-xs text-gray-600 mt-1">
              How would you rate your weather forecast experience?
            </p>
            <div className="flex justify-center gap-2 my-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setRating(star)}
                  className="p-1 text-yellow-400 hover:scale-110 transition active:scale-95"
                >
                  <Star
                    className={`w-7 h-7 ${
                      star <= rating ? "fill-yellow-400" : "text-gray-300"
                    }`}
                  />
                </button>
              ))}
            </div>
            <div className="flex gap-2 justify-end">
              <button
                onClick={() => setShowRatingModal(false)}
                className="px-3 py-1.5 text-xs text-gray-600 font-medium hover:bg-gray-100 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowRatingModal(false);
                  showToast("Thank you for your feedback!");
                }}
                className="px-4 py-1.5 text-xs bg-[#0055A6] text-white font-medium rounded-lg hover:bg-[#004586]"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Dimmed Overlay */}
      {isDrawerOpen && (
        <div
          onClick={closeDrawer}
          className="fixed inset-0 z-40 bg-black/50 transition-opacity"
        />
      )}

      {/* Slide Drawer (62% width on mobile) */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-[68%] max-w-[280px] bg-white text-gray-800 shadow-2xl rounded-r-3xl flex flex-col transition-transform duration-300 ease-out overflow-y-auto ${
          isDrawerOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Profile / Auth Header */}
        <div className="p-4 pt-6 bg-gradient-to-b from-blue-50 to-white flex items-center gap-3 border-b border-gray-100">
          <div className="w-12 h-12 rounded-full bg-[#0055A6]/10 flex items-center justify-center text-[#0055A6]">
            <UserCircle className="w-9 h-9 stroke-[1.5]" />
          </div>
          <div className="flex-1 truncate">
            <h2 className="text-[16px] font-bold text-gray-900 leading-tight">Log In</h2>
            <p className="text-[12px] text-gray-500 truncate">You are not logged in</p>
          </div>
          <button
            onClick={closeDrawer}
            aria-label="Close Drawer"
            className="p-1 text-gray-400 hover:text-gray-700 rounded-full"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Primary Features Navigation */}
        <div className="py-2 flex-1">
          <DrawerItem
            icon={<Sprout className="w-5 h-5 text-[#0055A6]" />}
            label="Agromet Products"
            onClick={() => handleNavigate("/agromet")}
          />
          <DrawerItem
            icon={<Plane className="w-5 h-5 text-[#0055A6]" />}
            label="Aviation"
            onClick={() => handleNavigate("/aviation")}
          />
          <DrawerItem
            icon={<Users className="w-5 h-5 text-[#0055A6]" />}
            label="Crowd Source"
            onClick={() => handleNavigate("/crowd-source")}
          />
          <DrawerItem
            icon={<Compass className="w-5 h-5 text-[#0055A6]" />}
            label="Cyclone"
            onClick={() => handleNavigate("/cyclone")}
          />
          <DrawerItem
            icon={<Zap className="w-5 h-5 text-[#0055A6]" />}
            label="Lightning"
            onClick={() => handleNavigate("/lightning")}
          />
          <DrawerItem
            icon={<Radio className="w-5 h-5 text-[#0055A6]" />}
            label="Radar"
            onClick={() => handleNavigate("/radar")}
          />
          <DrawerItem
            icon={<CloudRain className="w-5 h-5 text-[#0055A6]" />}
            label="Rain Alert"
            onClick={() => handleNavigate("/rain-alert")}
          />
          <DrawerItem
            icon={<Navigation className="w-5 h-5 text-[#0055A6]" />}
            label="Route Now Cast"
            onClick={() => handleNavigate("/route-nowcast")}
          />

          <hr className="my-2 border-gray-200" />

          {/* Secondary Utility Links */}
          <DrawerItem
            icon={<Languages className="w-5 h-5 text-gray-600" />}
            label="English"
            extra={<ChevronRight className="w-4 h-4 text-gray-400" />}
            onClick={() => handleNavigate("/settings")}
          />
          <DrawerItem
            icon={<Heart className="w-5 h-5 text-gray-600" />}
            label="Favourites"
            onClick={() => handleNavigate("/favourites")}
          />
          <DrawerItem
            icon={<Bell className="w-5 h-5 text-gray-600" />}
            label="Notification"
            onClick={() => handleNavigate("/notifications")}
          />
          <DrawerItem
            icon={<Share2 className="w-5 h-5 text-gray-600" />}
            label="Share"
            onClick={handleShare}
          />
          <DrawerItem
            icon={<Star className="w-5 h-5 text-gray-600" />}
            label="Rate App"
            onClick={handleRateApp}
          />
          <DrawerItem
            icon={<HelpCircle className="w-5 h-5 text-gray-600" />}
            label="FAQ"
            onClick={() => handleNavigate("/faq")}
          />
          <DrawerItem
            icon={<Settings className="w-5 h-5 text-gray-600" />}
            label="Settings"
            onClick={() => handleNavigate("/settings")}
          />
        </div>

        {/* Footer Info */}
        <div className="p-3 bg-gray-50 border-t border-gray-100 text-center">
          <p className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">
            IMD Mausam v1.0 (Baseline)
          </p>
        </div>
      </aside>
    </>
  );
};

interface DrawerItemProps {
  icon: React.ReactNode;
  label: string;
  extra?: React.ReactNode;
  onClick: () => void;
}

const DrawerItem: React.FC<DrawerItemProps> = ({ icon, label, extra, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="w-full px-4 py-2.5 flex items-center justify-between text-left text-gray-700 hover:bg-blue-50/60 active:bg-blue-100/70 transition-colors"
    >
      <div className="flex items-center gap-3.5">
        <span className="shrink-0">{icon}</span>
        <span className="text-[14px] font-medium text-gray-800">{label}</span>
      </div>
      {extra && <div>{extra}</div>}
    </button>
  );
};
