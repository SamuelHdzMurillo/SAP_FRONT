import { useEffect, useRef, useState } from "react";
const MapComponenteC = ({
  defaultMarker,
}: {
  defaultMarker: { lat: number; lng: number };
}) => {
  const mapRef = useRef(null);
  const [map, setMap] = useState<google.maps.Map>();

  useEffect(() => {
    if (mapRef.current && !map) {
      setMap(
        new window.google.maps.Map(mapRef.current, {
          center: { lat: defaultMarker.lat, lng: defaultMarker.lng },
          zoom: 8,
        })
      );
    }
  }, [defaultMarker]);
  useEffect(() => {
    if (map && defaultMarker) {
      new window.google.maps.Marker({
        position: {
          lat: defaultMarker.lat,
          lng: defaultMarker.lng,
        },
        map: map,
      });
    }
  }, [map, defaultMarker]);

  return <div ref={mapRef} style={{ height: "100%", width: "100%" }}></div>;
};

export default MapComponenteC;
