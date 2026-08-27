"use client";

import React, { useEffect, useRef, useState } from "react";
import { Layers, Locate, Plus, Minus } from "lucide-react";

export interface MapMarker {
  id: string | number;
  lat: number;
  lon: number;
  title: string;
  subtitle?: string;
  color?: string;
  radius?: number;
  intensity?: string;
}

export interface MapPolyline {
  points: [number, number][];
  color?: string;
  dashArray?: string;
  weight?: number;
}

interface LeafletMapProps {
  center?: [number, number];
  zoom?: number;
  markers?: MapMarker[];
  polylines?: MapPolyline[];
  overlayCircles?: {
    lat: number;
    lon: number;
    radius: number;
    color: string;
    fillOpacity?: number;
  }[];
  showRadarSimulation?: boolean;
  onMarkerClick?: (marker: MapMarker) => void;
  height?: string;
}

export const LeafletMap: React.FC<LeafletMapProps> = ({
  center = [28.6692, 77.4538],
  zoom = 10,
  markers = [],
  polylines = [],
  overlayCircles = [],
  showRadarSimulation = false,
  onMarkerClick,
  height = "420px",
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const layerGroupRef = useRef<any>(null);
  const [activeTileLayer, setActiveTileLayer] = useState<"standard" | "satellite" | "dark">("standard");
  const [showLayerMenu, setShowLayerMenu] = useState(false);

  const tileUrls = {
    standard: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    satellite: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    dark: "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",
  };

  useEffect(() => {
    let isMounted = true;

    async function initMap() {
      if (typeof window === "undefined" || !mapContainerRef.current) return;

      const L = (await import("leaflet")).default;

      // Fix default marker icon paths in webpack/Next.js
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
        iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
        shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
      });

      if (!mapInstanceRef.current && isMounted) {
        const map = L.map(mapContainerRef.current, {
          center: center,
          zoom: zoom,
          zoomControl: false,
          attributionControl: true,
        });

        const currentTile = L.tileLayer(tileUrls[activeTileLayer], {
          attribution: '&copy; IMD Mausam & OpenStreetMap contributors',
          maxZoom: 18,
        }).addTo(map);

        (map as any)._tileLayer = currentTile;

        const layerGroup = L.layerGroup().addTo(map);
        layerGroupRef.current = layerGroup;
        mapInstanceRef.current = map;
      }
    }

    initMap();

    return () => {
      isMounted = false;
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Update Tile Layer
  useEffect(() => {
    if (!mapInstanceRef.current) return;
    const map = mapInstanceRef.current;
    import("leaflet").then((L) => {
      if (map._tileLayer) {
        map.removeLayer(map._tileLayer);
      }
      const newTile = L.tileLayer(tileUrls[activeTileLayer], {
        attribution: '&copy; IMD Mausam & OpenStreetMap contributors',
        maxZoom: 18,
      }).addTo(map);
      map._tileLayer = newTile;
    });
  }, [activeTileLayer]);

  // Update Markers, Circles and Polylines
  useEffect(() => {
    if (!mapInstanceRef.current || !layerGroupRef.current) return;
    const layerGroup = layerGroupRef.current;
    layerGroup.clearLayers();

    import("leaflet").then((L) => {
      // Draw simulated radar reflectivity bands if enabled
      if (showRadarSimulation) {
        const radarBands = [
          { lat: 28.6692, lon: 77.4538, radius: 18000, color: "#FF9900", fillOpacity: 0.35 },
          { lat: 28.6820, lon: 77.4800, radius: 12000, color: "#FF2020", fillOpacity: 0.45 },
          { lat: 28.9845, lon: 77.7064, radius: 15000, color: "#FF00FF", fillOpacity: 0.4 },
          { lat: 28.5355, lon: 77.3910, radius: 14000, color: "#FFFF00", fillOpacity: 0.35 },
          { lat: 28.6315, lon: 77.2167, radius: 16000, color: "#00CC44", fillOpacity: 0.3 },
          { lat: 28.4595, lon: 77.0266, radius: 10000, color: "#00DDE5", fillOpacity: 0.25 },
        ];

        radarBands.forEach((band) => {
          L.circle([band.lat, band.lon], {
            radius: band.radius,
            color: band.color,
            fillColor: band.color,
            fillOpacity: band.fillOpacity,
            weight: 1.5,
          }).addTo(layerGroup);
        });
      }

      // Overlay circles (e.g. rain cells, lightning clusters)
      overlayCircles.forEach((circle) => {
        L.circle([circle.lat, circle.lon], {
          radius: circle.radius,
          color: circle.color,
          fillColor: circle.color,
          fillOpacity: circle.fillOpacity || 0.4,
          weight: 1.5,
        }).addTo(layerGroup);
      });

      // Polylines (e.g., cyclone tracks, travel routes)
      polylines.forEach((poly) => {
        L.polyline(poly.points, {
          color: poly.color || "#FFBE00",
          dashArray: poly.dashArray,
          weight: poly.weight || 3.5,
        }).addTo(layerGroup);
      });

      // Markers
      markers.forEach((marker) => {
        const customIcon = L.divIcon({
          className: "custom-map-pin",
          html: `
            <div style="
              background-color: ${marker.color || "#0055A6"};
              width: 26px;
              height: 26px;
              border-radius: 50%;
              border: 2px solid white;
              display: flex;
              align-items: center;
              justify-content: center;
              box-shadow: 0 2px 6px rgba(0,0,0,0.5);
              color: white;
              font-size: 11px;
              font-weight: bold;
            ">
              📍
            </div>
          `,
          iconSize: [26, 26],
          iconAnchor: [13, 26],
        });

        const m = L.marker([marker.lat, marker.lon], { icon: customIcon }).addTo(
          layerGroup
        );

        if (marker.title) {
          m.bindPopup(`
            <div style="font-family: Roboto, sans-serif; padding: 2px; color: #111;">
              <strong style="font-size: 13px; color: #0055A6;">${marker.title}</strong>
              ${
                marker.subtitle
                  ? `<div style="font-size: 11px; color: #555; margin-top: 2px;">${marker.subtitle}</div>`
                  : ""
              }
              ${
                marker.intensity
                  ? `<div style="font-size: 11px; font-weight: bold; color: #FF2020; margin-top: 2px;">Intensity: ${marker.intensity}</div>`
                  : ""
              }
            </div>
          `);
        }

        m.on("click", () => {
          if (onMarkerClick) onMarkerClick(marker);
        });
      });
    });
  }, [markers, polylines, overlayCircles, showRadarSimulation, onMarkerClick]);

  const handleZoomIn = () => {
    if (mapInstanceRef.current) mapInstanceRef.current.zoomIn();
  };

  const handleZoomOut = () => {
    if (mapInstanceRef.current) mapInstanceRef.current.zoomOut();
  };

  const handleRecenter = () => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.setView(center, zoom);
    }
  };

  return (
    <div className="relative w-full rounded-2xl overflow-hidden shadow-inner border border-white/20" style={{ height }}>
      {/* Leaflet Map DOM Target */}
      <div ref={mapContainerRef} className="w-full h-full" />

      {/* Floating Map Controls */}
      <div className="absolute top-3 right-3 z-[400] flex flex-col gap-1.5">
        {/* Layer Switcher */}
        <div className="relative">
          <button
            onClick={() => setShowLayerMenu(!showLayerMenu)}
            aria-label="Map Layers"
            className="w-8 h-8 bg-[#06345C]/90 text-white rounded-lg flex items-center justify-center shadow-md border border-white/20 hover:bg-[#06345C] transition"
          >
            <Layers className="w-4 h-4" />
          </button>

          {showLayerMenu && (
            <div className="absolute right-0 top-10 w-28 bg-[#06345C] text-white text-xs rounded-xl shadow-xl border border-white/20 p-1.5 space-y-1">
              <button
                onClick={() => {
                  setActiveTileLayer("standard");
                  setShowLayerMenu(false);
                }}
                className={`w-full text-left px-2 py-1 rounded-md transition ${
                  activeTileLayer === "standard" ? "bg-[#0055A6] font-bold" : "hover:bg-white/10"
                }`}
              >
                Standard
              </button>
              <button
                onClick={() => {
                  setActiveTileLayer("satellite");
                  setShowLayerMenu(false);
                }}
                className={`w-full text-left px-2 py-1 rounded-md transition ${
                  activeTileLayer === "satellite" ? "bg-[#0055A6] font-bold" : "hover:bg-white/10"
                }`}
              >
                Satellite
              </button>
              <button
                onClick={() => {
                  setActiveTileLayer("dark");
                  setShowLayerMenu(false);
                }}
                className={`w-full text-left px-2 py-1 rounded-md transition ${
                  activeTileLayer === "dark" ? "bg-[#0055A6] font-bold" : "hover:bg-white/10"
                }`}
              >
                Clean Light
              </button>
            </div>
          )}
        </div>

        {/* Recenter */}
        <button
          onClick={handleRecenter}
          aria-label="Recenter Map"
          className="w-8 h-8 bg-[#06345C]/90 text-white rounded-lg flex items-center justify-center shadow-md border border-white/20 hover:bg-[#06345C] transition"
        >
          <Locate className="w-4 h-4 text-[#00DDE5]" />
        </button>

        {/* Zoom In */}
        <button
          onClick={handleZoomIn}
          aria-label="Zoom In"
          className="w-8 h-8 bg-[#06345C]/90 text-white rounded-lg flex items-center justify-center shadow-md border border-white/20 hover:bg-[#06345C] transition"
        >
          <Plus className="w-4 h-4" />
        </button>

        {/* Zoom Out */}
        <button
          onClick={handleZoomOut}
          aria-label="Zoom Out"
          className="w-8 h-8 bg-[#06345C]/90 text-white rounded-lg flex items-center justify-center shadow-md border border-white/20 hover:bg-[#06345C] transition"
        >
          <Minus className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
