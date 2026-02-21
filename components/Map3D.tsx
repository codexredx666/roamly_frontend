"use client";

import { useEffect, useRef, useState } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

interface Map3DProps {
  places?: Array<{
    id: string;
    name: string;
    location: { lat: number; lng: number };
  }>;
  center?: [number, number];
  zoom?: number;
  onPlaceClick?: (placeId: string) => void;
}

export default function Map3D({
  places = [],
  center = [0, 0],
  zoom = 2,
  onPlaceClick,
}: Map3DProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<maplibregl.Map | null>(null);
  const markersRef = useRef<maplibregl.Marker[]>([]);

  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: {
        version: 8,
        sources: {
          "osm-tiles": {
            type: "raster",
            tiles: [
              "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
            ],
            tileSize: 256,
            attribution:
              '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          },
        },
        layers: [
          {
            id: "osm-tiles",
            type: "raster",
            source: "osm-tiles",
            minzoom: 0,
            maxzoom: 19,
          },
        ],
      },
      center,
      zoom,
      pitch: 45,
      bearing: 0,
    });

    map.current.addControl(new maplibregl.NavigationControl(), "top-right");

    return () => {
      map.current?.remove();
      map.current = null;
    };
  }, []);

  useEffect(() => {
    if (!map.current || !places.length) return;

    markersRef.current.forEach((marker) => marker.remove());
    markersRef.current = [];

    places.forEach((place) => {
      const el = document.createElement("div");
      el.className = "custom-marker";
      el.innerHTML = `
        <div class="w-4 h-4 bg-primary rounded-full border-2 border-white shadow-lg cursor-pointer"></div>
      `;
      el.style.cursor = "pointer";

      el.addEventListener("click", () => {
        if (onPlaceClick) {
          onPlaceClick(place.id);
        }
        if (map.current) {
          map.current.flyTo({
            center: [place.location.lng, place.location.lat],
            zoom: 12,
            duration: 1500,
          });
        }
      });

      const marker = new maplibregl.Marker({ element: el })
        .setLngLat([place.location.lng, place.location.lat])
        .addTo(map.current!);

      markersRef.current.push(marker);
    });
  }, [places, onPlaceClick]);

  useEffect(() => {
    if (!map.current) return;

    map.current.flyTo({
      center,
      zoom,
      duration: 1500,
    });
  }, [center, zoom]);

  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `
      .custom-marker {
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .maplibregl-popup-content {
        background: hsl(var(--card));
        color: hsl(var(--foreground));
        border-radius: 0.5rem;
        padding: 0.75rem;
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <div className="w-full h-full relative rounded-lg overflow-hidden">
      <div ref={mapContainer} className="w-full h-full" />
    </div>
  );
}
