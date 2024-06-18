"use client";

import { useEffect } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css"; // Import Mapbox GL CSS

const Map = ({ coordinates }) => {
  // Ensure the token is set correctly
  if (!process.env.NEXT_PUBLIC_MAPBOX_TOKEN) {
    console.error("Mapbox token is not defined in environment variables.");
  } else {
    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
  }

  useEffect(() => {
    if (!mapboxgl.accessToken) {
      return;
    }

    const map = new mapboxgl.Map({
      container: "map",
      center: coordinates,
      zoom: 13,
      style: "mapbox://styles/mapbox/standard",
      config: {
        // Initial configuration for the Mapbox Standard style set above. By default, its ID is `basemap`.
        basemap: {
          // Here, we're setting the light preset to `night`.
          lightPreset: "night",
        },
      },
    });
    new mapboxgl.Marker().setLngLat(coordinates).addTo(map);

    return () => map.remove(); // Clean up on unmount
  }, []);

  return <div id="map" className="w-[900px] h-[500px]"></div>;
};

export default Map;
