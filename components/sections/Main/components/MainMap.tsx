"use client";

import { useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css"; // Import Mapbox GL CSS
import { Property } from "@prisma/client";
import { cn } from "@/lib/utils";

export interface PropertyInterface extends Property {
  geometry: {
    id: string;
    type: string;
    coordinates: [number, number];
  } | null;
  prices: {
    from: string;
    to: string;
    price: number;
  }[];
  urls: string[];
  averageRating: number;
  numberOfReviews: number;
}

const MainMap = ({
  properties,
  isMapHidden,
}: {
  properties: PropertyInterface[];
  isMapHidden: boolean;
}) => {
  const [isLoading, setIsLoading] = useState(true);

  if (!process.env.NEXT_PUBLIC_MAPBOX_TOKEN) {
    console.error("Mapbox token is not defined in environment variables.");
  } else {
    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
  }

  useEffect(() => {
    if (!mapboxgl.accessToken) {
      return;
    }
    const defaultCenter = properties[0]?.geometry?.coordinates || [0, 0];

    const map = new mapboxgl.Map({
      container: "map", 
      style: "mapbox://styles/mapbox/streets-v12", 
      center: defaultCenter,
      zoom: 13, 
    });

    map.on("load", () => {
      setIsLoading(false);
    });

    properties.forEach((property) => {
      if (property.geometry) {
        const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(`
          <div>
            <h3 style="margin: 0; color: #333;">${property.name}</h3>
            <p style="margin: 5px 0 0; font-size: 14px; color: #668;">${property.city}</p>
            <p style="margin: 5px 0 0; font-size: 14px; color: #668;">${property.street}, ${property.houseNumber}</p>
          </div>
        `);

        new mapboxgl.Marker()
          .setLngLat(property.geometry.coordinates)
          .setPopup(popup)
          .addTo(map);
      }
    });

    return () => map.remove(); // Clean up on unmount
  }, [properties]);

  return (
    <div
      className={cn(
        "relative h-full rounded-md",
        isMapHidden ? "w-[30px]" : "w-full min-w-[300px] lg:min-w-[700px]",
      )}
    >
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center text-lg">
          Map is loading...
        </div>
      )}
      <div id="map" className="h-full w-full"></div>
    </div>
  );
};

export default MainMap;
