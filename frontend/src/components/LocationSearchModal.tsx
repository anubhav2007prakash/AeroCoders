"use client";

import React, { useState, useEffect } from "react";
import { Search, X, MapPin, Navigation, Loader2 } from "lucide-react";
import { useWeather } from "@/context/WeatherContext";
import { WeatherAPI } from "@/lib/api";
import { LocationItem } from "@/types/weather";

const POPULAR_CITIES = [
  "Raghunathpuri, Ghaziabad",
  "New Delhi",
  "Mumbai",
  "Lucknow",
  "Chennai",
  "Kolkata",
  "Bengaluru",
  "Jaipur",
  "Chandigarh",
  "Patna",
];

export const LocationSearchModal: React.FC = () => {
  const { isSearchOpen, closeSearch, setLocation, activeLocation } = useWeather();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<LocationItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const timer = setTimeout(async () => {
      setIsLoading(true);
      try {
        const data = await WeatherAPI.searchLocations(query.trim());
        setResults(data);
      } catch (err) {
        console.error("Search error:", err);
      } finally {
        setIsLoading(false);
      }
    }, 250);

    return () => clearTimeout(timer);
  }, [query]);

  if (!isSearchOpen) return null;

  const handleSelect = (name: string, lat?: number, lon?: number) => {
    setLocation(name, lat, lon);
    setQuery("");
    closeSearch();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex flex-col justify-start items-center p-3 sm:p-4 animate-fade-in">
      <div className="w-full max-w-[430px] bg-[#06345C] text-white rounded-2xl shadow-2xl border border-white/20 flex flex-col overflow-hidden max-h-[88vh]">
        {/* Search Header */}
        <div className="p-3.5 border-b border-white/15 flex items-center gap-2">
          <div className="flex-1 relative flex items-center">
            <Search className="w-5 h-5 text-white/70 absolute left-3 pointer-events-none" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search City, District or State..."
              autoFocus
              className="w-full bg-white/10 text-white placeholder-white/50 text-[15px] rounded-xl pl-10 pr-9 py-2.5 outline-none border border-white/20 focus:border-[#00DDE5] transition"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="absolute right-3 text-white/70 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
          <button
            onClick={closeSearch}
            className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-full text-sm font-medium"
          >
            Cancel
          </button>
        </div>

        {/* Search Body Content */}
        <div className="p-4 overflow-y-auto flex-1 space-y-4">
          {/* Current Location button */}
          <button
            onClick={() => handleSelect("Raghunathpuri, Ghaziabad", 28.6692, 77.4538)}
            className="w-full flex items-center gap-3 p-3 bg-white/5 hover:bg-white/10 rounded-xl transition text-left border border-white/10"
          >
            <div className="w-8 h-8 rounded-full bg-[#0055A6] flex items-center justify-center text-[#00DDE5]">
              <Navigation className="w-4 h-4" />
            </div>
            <div>
              <p className="text-sm font-semibold text-white">Use Current Location</p>
              <p className="text-xs text-white/70">Raghunathpuri, Ghaziabad (Default)</p>
            </div>
          </button>

          {/* Loading Indicator */}
          {isLoading && (
            <div className="flex items-center justify-center py-6 gap-2 text-white/80">
              <Loader2 className="w-5 h-5 animate-spin text-[#00DDE5]" />
              <span className="text-sm">Searching IMD locations...</span>
            </div>
          )}

          {/* Search Results */}
          {!isLoading && query.trim() && (
            <div className="space-y-1">
              <p className="text-xs font-semibold text-white/60 uppercase tracking-wider px-1">
                Search Results ({results.length})
              </p>
              {results.length === 0 ? (
                <div className="py-6 text-center text-white/70 text-sm">
                  No matching location found. Try searching &quot;Delhi&quot;, &quot;Ghaziabad&quot;, &quot;Mumbai&quot;.
                </div>
              ) : (
                <div className="divide-y divide-white/10 bg-white/5 rounded-xl overflow-hidden">
                  {results.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => handleSelect(item.name, item.latitude, item.longitude)}
                      className="w-full px-3 py-3 text-left hover:bg-white/10 flex items-center justify-between transition"
                    >
                      <div className="flex items-center gap-2.5">
                        <MapPin className="w-4 h-4 text-[#00DDE5] shrink-0" />
                        <div>
                          <p className="text-sm font-semibold text-white">{item.name}</p>
                          <p className="text-xs text-white/70">
                            {item.district}, {item.state}
                          </p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Popular Cities Chips */}
          {!query.trim() && (
            <div>
              <p className="text-xs font-semibold text-white/60 uppercase tracking-wider mb-2 px-1">
                Popular Locations
              </p>
              <div className="flex flex-wrap gap-2">
                {POPULAR_CITIES.map((city) => (
                  <button
                    key={city}
                    onClick={() => handleSelect(city)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                      activeLocation.toLowerCase() === city.toLowerCase()
                        ? "bg-[#00DDE5] text-[#06345C] font-bold"
                        : "bg-white/10 text-white hover:bg-white/20"
                    }`}
                  >
                    {city}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
