import PointerIcon from "@/public/svgs/pointer.svg";
import ReactMapGL, { Marker, ViewStateChangeEvent } from "react-map-gl";
import { useState, useEffect, FC } from "react";

const TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

interface MapProps {
  longitude?: number;
  latitude?: number;
  updateCoordinates?: (latitude: number, longitude: number) => void;
}

const Map: FC<MapProps> = ({ longitude, latitude, updateCoordinates }) => {
  const [viewport, setViewport] = useState({
    latitude,
    longitude,
    zoom: 16,
  });

  const [marker, setMarker] = useState({
    latitude,
    longitude,
  });

  useEffect(() => {
    setViewport((oldViewport) => ({
      ...oldViewport,
      latitude,
      longitude,
    }));
  }, [latitude, longitude]);

  const handleMarkerDrag = (event: mapboxgl.MapboxEvent<MouseEvent>) => {
    const latitude = event.lngLat.lat;
    const longitude = event.lngLat.lng;

    setMarker({ latitude, longitude });
    updateCoordinates(latitude, longitude);
  };

  const handleMove = (event: ViewStateChangeEvent) => {
    setViewport(event.viewState);
  };

  return (
    <div className="map relative">
      <ReactMapGL
        {...viewport}
        mapboxAccessToken={TOKEN}
        mapStyle="mapbox://styles/mapbox/streets-v12"
        onMove={handleMove}
      >
        <Marker
          latitude={marker.latitude}
          longitude={marker.longitude}
          draggable={true}
          onDragEnd={handleMarkerDrag}
        />
      </ReactMapGL>
    </div>
  );
};

export default Map;
