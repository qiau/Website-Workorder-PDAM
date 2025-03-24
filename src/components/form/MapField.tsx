"use client";
import { useState, useCallback, useRef } from "react";
import {
  GoogleMap,
  Marker,
  Autocomplete,
  LoadScriptNext,
} from "@react-google-maps/api";
import { Input } from "../ui/input";

const libraries: "places"[] = ["places"];
const containerStyle = { width: "100%", height: "300px", borderRadius: "8px" };
const center = { lat: -7.265437, lng: 112.754072 };

export default function MapField({
  onLocationSelect,
  showSearch = false,
}: {
  onLocationSelect: (lat: number, lng: number) => void;
  showSearch?: boolean;
}) {
  const [mapCenter, setMapCenter] = useState(center);
  const [markerPosition, setMarkerPosition] = useState(center);
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);

  const onLoadAutocomplete = (
    autocomplete: google.maps.places.Autocomplete
  ) => {
    autocompleteRef.current = autocomplete;
  };

  const onPlaceChanged = () => {
    if (autocompleteRef.current) {
      const place = autocompleteRef.current.getPlace();
      if (place.geometry) {
        const newCenter = {
          lat: Number(place.geometry.location?.lat().toFixed(6)) ?? 0,
          lng: Number(place.geometry.location?.lng().toFixed(6)) ?? 0,
        };
        setMapCenter(newCenter);
        setMarkerPosition(newCenter);
        onLocationSelect(newCenter.lat, newCenter.lng);
      }
    }
  };

  const onMapClick = (event: google.maps.MapMouseEvent) => {
    if (event.latLng) {
      const newMarkerPosition = {
        lat: Number(event.latLng.lat().toFixed(6)),
        lng: Number(event.latLng.lng().toFixed(6)),
      };
      setMarkerPosition(newMarkerPosition);
      onLocationSelect(newMarkerPosition.lat, newMarkerPosition.lng);
    }
  };

  return (
    <LoadScriptNext
      googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}
      libraries={libraries}
    >
      <div className="space-y-4">
        {showSearch && (
          <Autocomplete
            onLoad={onLoadAutocomplete}
            onPlaceChanged={onPlaceChanged}
          >
            <Input label="Cari Lokasi" placeholder="Cari lokasi..." />
          </Autocomplete>
        )}
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={mapCenter}
          zoom={15}
          onClick={onMapClick}
        >
          <Marker position={markerPosition} />
        </GoogleMap>
      </div>
    </LoadScriptNext>
  );
}
