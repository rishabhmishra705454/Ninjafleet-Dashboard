"use client";

import { useEffect, useRef, useState } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  Autocomplete,
} from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "400px",
};

// Default center if location access is denied
const defaultCenter = {
  lat: -3.745,
  lng: -38.523,
};

interface MapPickerProps {
  onSelect: (lat: number, lng: number) => void;
}

const MapPicker: React.FC<MapPickerProps> = ({ onSelect }) => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyCsxg49JRl5z4IiZQv9j2mH3B2hvoDtaTY", // Replace with your API key
    libraries: ["places"], // Include places library
  });

  const [center, setCenter] = useState(defaultCenter);
  const [autocomplete, setAutocomplete] = useState<google.maps.places.Autocomplete | null>(null);
  const [currentLocationError, setCurrentLocationError] = useState<string | null>(null);
  const mapRef = useRef<google.maps.Map | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Fetch user's current location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCenter({ lat: latitude, lng: longitude });
        },
        (error) => {
          setCurrentLocationError("Unable to access your location. Please search manually.");
          console.error("Error accessing location: ", error);
        }
      );
    } else {
      setCurrentLocationError("Geolocation is not supported by this browser.");
    }
  }, []);

  const handlePlaceSelect = () => {
    if (autocomplete && inputRef.current) {
      const place = autocomplete.getPlace();
      if (place.geometry && place.geometry.location) {
        const lat = place.geometry.location.lat();
        const lng = place.geometry.location.lng();
        setCenter({ lat, lng });
        onSelect(lat, lng); // Pass selected coordinates to parent
      } else {
        console.error("Place geometry or location is undefined.");
      }
    }
  };

  const handleMapIdle = () => {
    // When the map is moved, get the center and update selected coordinates
    if (mapRef.current) {
      const newCenter = mapRef.current.getCenter();
      if (newCenter) {
        const lat = newCenter.lat();
        const lng = newCenter.lng();
        onSelect(lat, lng); // Pass updated center coordinates to parent
      }
    }
  };

  return isLoaded ? (
    <div>
      <Autocomplete
        onLoad={(autocomplete) => setAutocomplete(autocomplete)}
        onPlaceChanged={handlePlaceSelect}
      >
        <input
          ref={inputRef}
          type="text"
          placeholder="Search for a place"
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "10px",
            borderRadius: "4px",
            border: "1px solid #ccc",
          }}
        />
      </Autocomplete>

      {currentLocationError && (
        <p style={{ color: "red" }}>{currentLocationError}</p>
      )}

      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={15}
        onLoad={(map) => {
            mapRef.current = map; // Corrected: Just assign, no return
          }}
        onIdle={handleMapIdle} // Update location when the map stops moving
      >
        {/* Fixed Pin at the center */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -100%)",
            zIndex: 1,
          }}
        >
          📍
        </div>
      </GoogleMap>
    </div>
  ) : <></>;
};

export default MapPicker;
