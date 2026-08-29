import React, { useState, useCallback, useRef } from 'react';
import { GoogleMap, useJsApiLoader, Marker, Autocomplete } from '@react-google-maps/api';

const libraries = ['places'];

const mapContainerStyle = {
  height: '400px',
  width: '100%',
};

const center = {
  lat: 40.712776, // Default latitude
  lng: -74.005974, // Default longitude
};

const MapComponent = ({ onLocationSelect }) => {
  const [mapCenter, setMapCenter] = useState(center);
  const [markerPosition, setMarkerPosition] = useState(null);
  const autocompleteRef = useRef(null);

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY || '',
    libraries,
  });

  const onLoad = useCallback((autocomplete) => {
    autocompleteRef.current = autocomplete;
  }, []);

  const onPlaceChanged = useCallback(() => {
    if (autocompleteRef.current) {
      const place = autocompleteRef.current.getPlace();
      if (!place.geometry?.location) return;
      const location = place.geometry.location;
      setMapCenter({
        lat: location.lat(),
        lng: location.lng(),
      });
      setMarkerPosition({
        lat: location.lat(),
        lng: location.lng(),
      });
      onLocationSelect({
        type: 'Point',
        coordinates: [location.lng(), location.lat()],
      });
    }
  }, [onLocationSelect]);

  if (!process.env.REACT_APP_GOOGLE_MAPS_API_KEY) {
    return <p className="map-message">Add a Google Maps key to enable location search.</p>;
  }

  if (loadError) {
    return <p className="map-message">The map could not load. Check the configured Maps key and try again.</p>;
  }

  if (!isLoaded) {
    return <p className="map-message">Loading map…</p>;
  }

  return (
    <>
      <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
        <input type="text" aria-label="Search for a run location" placeholder="Search for a meeting place" required />
      </Autocomplete>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={10}
        center={mapCenter}
        onClick={(event) => {
          const lat = event.latLng.lat();
          const lng = event.latLng.lng();
          setMarkerPosition({ lat, lng });
          onLocationSelect({
            type: 'Point',
            coordinates: [lng, lat],
          });
        }}
      >
        {markerPosition && <Marker position={markerPosition} />}
      </GoogleMap>
    </>
  );
};

export default MapComponent;
