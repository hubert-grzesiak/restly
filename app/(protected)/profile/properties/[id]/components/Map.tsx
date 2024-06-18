"use client";

import { useEffect } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css"; // Import Mapbox GL CSS

type Property = {
  id: string;
  name: string;
  city: string;
  country: string;
  street: string;
  houseNumber: string;
  geometry: {
    coordinates: [number, number];
  } | null;
  urls: string[];
  facility: { id: string; name: string; objectId: string }[];
  prices: {
    id: string;
    objectId: string;
    year: number;
    month: number;
    dailyRate: number;
  }[];
  description: string;
  ownerId: string;
};

const Map = ({ property }: { property: Property }) => {
  // Ensure the token is set correctly
  if (!process.env.NEXT_PUBLIC_MAPBOX_TOKEN) {
    console.error("Mapbox token is not defined in environment variables.");
  } else {
    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
  }

  useEffect(() => {
    if (!mapboxgl.accessToken || !property.geometry) {
      return;
    }

    const map = new mapboxgl.Map({
      container: "map", // container ID
      style: "mapbox://styles/mapbox/streets-v12", // style URL, using a night mode style for nicer look
      center: property.geometry.coordinates, // starting position [lng, lat]
      zoom: 13, // starting zoom
    });

    const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(`
      <div">
        <h3 style="margin: 0; color: #333;">${property.name}</h3>
        <p style="margin: 5px 0 0; font-size: 14px; color: #668;">${property.city}</p>
        <p style="margin: 5px 0 0; font-size: 14px; color: #668;">${property.street}, ${property.houseNumber}</p>
      </div>
    `);

    new mapboxgl.Marker()
      .setLngLat(property.geometry.coordinates)
      .setPopup(popup)
      .addTo(map);

    return () => map.remove(); // Clean up on unmount
  }, [property.geometry, property]);

  return <div id="map" className="w-[700px] h-[585px]"></div>;
};

export default Map;
