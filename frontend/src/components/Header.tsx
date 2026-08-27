"use client";

import React from "react";
import { Menu, Search, ArrowLeft, Heart } from "lucide-react";
import { useWeather } from "@/context/WeatherContext";
import { useRouter, usePathname } from "next/navigation";

interface HeaderProps {
  showBack?: boolean;
  title?: string;
  subtitle?: string;
}

export const Header: React.FC<HeaderProps> = ({ showBack, title, subtitle }) => {
  const {
    activeLocation,
    activeDate,
    toggleDrawer,
    openSearch,
    currentWeather,
    addFavouriteLocation,
    removeFavouriteLocation,
    isFavourite,
    favourites,
  } = useWeather();
  const router = useRouter();
  const pathname = usePathname();

  const displayTitle = title || activeLocation;
  const displaySubtitle = subtitle || activeDate;
  const isFav = isFavourite(displayTitle);

  const handleFavouriteToggle = () => {
    if (isFav) {
      const existing = favourites.find(
        (f) => f.location_name.toLowerCase() === displayTitle.toLowerCase()
      );
      if (existing) {
        removeFavouriteLocation(existing.id);
      }
    } else if (currentWeather) {
      addFavouriteLocation(currentWeather);
    }
  };

  return (
    <header className="sticky top-0 z-30 bg-[#0055A6] px-4 pt-2 pb-3 select-none">
      {/* Android Status Bar Simulation */}
      <div className="flex items-center justify-between text-xs text-white/80 pb-2 px-1 font-medium tracking-wide">
        <span>09:45</span>
        <div className="flex items-center gap-1.5 text-[11px]">
          <span>VoLTE</span>
          <span>📶 5G</span>
          <span>🔋 66%</span>
        </div>
      </div>

      {/* Main Header Bar */}
      <div className="flex items-center justify-between gap-2">
        {showBack ? (
          <button
            onClick={() => router.back()}
            aria-label="Back"
            className="p-1.5 -ml-1 text-white hover:bg-white/10 rounded-full transition active:scale-95"
          >
            <ArrowLeft className="w-6 h-6 stroke-[2.2]" />
          </button>
        ) : (
          <button
            onClick={toggleDrawer}
            aria-label="Open Menu"
            className="p-1.5 -ml-1 text-white hover:bg-white/10 rounded-full transition active:scale-95"
          >
            <Menu className="w-7 h-7 stroke-[2]" />
          </button>
        )}

        {/* Center Title & Date */}
        <div className="flex-1 text-center truncate px-1">
          <h1 className="text-[20px] sm:text-[22px] font-semibold text-white truncate leading-tight tracking-tight">
            {displayTitle}
          </h1>
          <p className="text-[13px] sm:text-[14px] text-white/80 font-normal tracking-wide mt-0.5">
            {displaySubtitle}
          </p>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-1">
          {pathname === "/" && (
            <button
              onClick={handleFavouriteToggle}
              aria-label="Toggle Favourite"
              className="p-1.5 text-white hover:bg-white/10 rounded-full transition active:scale-95"
              title={isFav ? "Remove from favourites" : "Add to favourites"}
            >
              <Heart
                className={`w-5 h-5 ${
                  isFav ? "fill-red-500 text-red-500" : "text-white/90"
                }`}
              />
            </button>
          )}

          <button
            onClick={openSearch}
            aria-label="Search Location"
            className="p-1.5 text-white hover:bg-white/10 rounded-full transition active:scale-95"
          >
            <Search className="w-6 h-6 stroke-[2]" />
          </button>
        </div>
      </div>
    </header>
  );
};
