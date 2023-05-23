import React, { useEffect, useRef, useMemo } from 'react';
import mapboxgl from 'mapbox-gl';
mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;

export function Map({ searchValue }) {
  const mapContainerRef = useRef(null); //hook to create a reference to the map container element.
  const defaultCentre = useMemo(() => [-4.3891, 54.3592], []);
  const defaultZoom = 5;

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: defaultCentre,
      zoom: defaultZoom,
    });

    const geolocateControl = new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true,
      },
      trackUserLocation: true,
      showUserHeading: true,
    });

    map.addControl(geolocateControl);

    geolocateControl.on('geolocate', () => {
      map.flyTo({
        center: defaultCentre,
        zoom: defaultZoom,
      });
    });

    return () => {
      map.remove(); // Clean up the map instance when the component is unmounted
    };
  }, [defaultCentre]);

  return <div id="map" ref={mapContainerRef}></div>;
}

export default Map;
