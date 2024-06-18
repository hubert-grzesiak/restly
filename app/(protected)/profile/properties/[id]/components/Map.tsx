"use client";

import { useEffect } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css"; // Import Mapbox GL CSS

const Map = ({ coordinates, property }) => {
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
      container: "map", // container ID
      style: "mapbox://styles/mapbox/streets-v12", // style URL, using a night mode style for nicer look
      center: coordinates, // starting position [lng, lat]
      zoom: 13, // starting zoom
    });
    const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(`
      <div">
        <h3 style="margin: 0; color: #333;">${property.name}</h3>
        <p style="margin: 5px 0 0; font-size: 14px; color: #668;">${property.city}</p>
        <p style="margin: 5px 0 0; font-size: 14px; color: #668;">${property.street}, ${property.houseNumber}</p>
      </div>
    `);
    new mapboxgl.Marker().setLngLat(coordinates).setPopup(popup).addTo(map);

    return () => map.remove(); // Clean up on unmount
  }, [coordinates, property]);

  return <div id="map" className="w-[700px] h-[585px]"></div>;
};

export default Map;
