"use client";

import { useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css"; // Import Mapbox GL CSS
import { Property } from "@prisma/client";
import { cn } from "@/lib/utils";
interface PropertyInterface extends Property {
  geometry: {
    id: string;
    type: string;
    coordinates: [number, number];
  } | null;
}

const Map = ({
  property,
  className,
}: {
  property: PropertyInterface;
  className: string;
}) => {
  const [isLoading, setIsLoading] = useState(true);

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

    map.on("load", () => {
      setIsLoading(false);
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

  return (
    <div className={cn("relative h-full rounded-md", className)}>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center text-lg">
          Map is loading...
        </div>
      )}
      <div id="map" className="h-full w-full"></div>
    </div>
  );
};

export default Map;
