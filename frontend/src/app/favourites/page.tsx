"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Header } from "@/components/Header";
import { useWeather } from "@/context/WeatherContext";
import { Heart, Trash2, MapPin, Plus, ChevronRight, CloudSun } from "lucide-react";

export default function FavouritesPage() {
  const { favourites, removeFavouriteLocation, setLocation, openSearch } = useWeather();
  const router = useRouter();

  const handleSelect = (locName: string, lat?: number, lon?: number) => {
    setLocation(locName, lat, lon);
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-[#0055A6] pb-10 select-none flex flex-col">
      <Header showBack={true} title="Saved Locations" subtitle="My Favourites" />

      <div className="p-4 space-y-4 flex-1">
        {/* Add Location Card */}
        <button
          onClick={openSearch}
          className="w-full p-3.5 bg-white/10 hover:bg-white/15 active:scale-[0.98] border border-white/20 rounded-2xl flex items-center justify-center gap-2 text-white font-semibold text-sm transition shadow-sm"
        >
          <Plus className="w-5 h-5 text-[#00DDE5]" />
          <span>Add New Location to Favourites</span>
        </button>

        {/* Favourites Cards List */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold text-white/70 uppercase tracking-wider px-1">
            Saved Places ({favourites.length})
          </h3>

          {favourites.length === 0 ? (
            <div className="bg-[#3C709F]/60 rounded-2xl p-8 text-center text-white/80 space-y-2 border border-white/10">
              <Heart className="w-10 h-10 text-white/40 mx-auto" />
              <p className="font-semibold text-sm">No favourite locations saved</p>
              <p className="text-xs text-white/60">
                Click the heart icon on any city to bookmark it here for quick access.
              </p>
            </div>
          ) : (
            <div className="space-y-2.5">
              {favourites.map((fav) => (
                <div
                  key={fav.id}
                  className="bg-[#3C709F] rounded-2xl p-4 text-white shadow-md border border-white/10 flex items-center justify-between group hover:bg-[#467dae] transition"
                >
                  <div
                    onClick={() => handleSelect(fav.location_name, fav.latitude, fav.longitude)}
                    className="flex-1 cursor-pointer"
                  >
                    <div className="flex items-center gap-1.5 font-bold text-base">
                      <MapPin className="w-4 h-4 text-[#00DDE5]" />
                      <span>{fav.location_name}</span>
                    </div>
                    <p className="text-xs text-white/70 mt-0.5">
                      {fav.district}, {fav.state}
                    </p>
                    <p className="text-xs text-[#00DDE5] font-medium mt-1">
                      {fav.condition}
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <div
                      onClick={() => handleSelect(fav.location_name, fav.latitude, fav.longitude)}
                      className="text-right cursor-pointer"
                    >
                      <span className="text-2xl font-bold block leading-none">
                        {fav.current_temp.toFixed(1)}°
                      </span>
                      <span className="text-[10px] text-white/70 block mt-1">
                        {fav.min_temp.toFixed(0)}° / {fav.max_temp.toFixed(0)}°
                      </span>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        removeFavouriteLocation(fav.id);
                      }}
                      aria-label="Remove favourite"
                      className="p-2 text-white/50 hover:text-red-400 hover:bg-black/10 rounded-full transition"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
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
