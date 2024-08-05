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
    googleMapsApiKey: 'AIzaSyDmNimGxOWu8ZSqYLWgfUsAIagyGvnTXBM',
    libraries,
  });

  const onLoad = useCallback((autocomplete) => {
    autocompleteRef.current = autocomplete;
  }, []);

  const onPlaceChanged = useCallback(() => {
    if (autocompleteRef.current) {
      const place = autocompleteRef.current.getPlace();
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

  if (loadError) {
    return <div>Error loading maps</div>;
  }

  if (!isLoaded) {
    return <div>Loading Maps</div>;
  }

  return (
    <>
      <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
        <input type="text" placeholder="Search for a location" />
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
