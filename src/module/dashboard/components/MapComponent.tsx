import { MarkerClusterer } from "@googlemaps/markerclusterer";
import { useEffect, useRef, useState } from "react";

export default function MapComponent() {
  const [map, setMap] = useState<google.maps.Map>();
  const ref = useRef<HTMLDivElement>();
  // New Code Markers: 1
  const [markerCluster, setMarkerClusters] = useState<MarkerClusterer>();
  const [marker, setMarker] = useState<
    { lat: number; lng: number } | undefined
  >();
  // New Code Markers 1
  useEffect(() => {
    if (ref.current && !map) {
      setMap(
        new window.google.maps.Map(ref.current, {
          center: { lat: 4.4333479181711075, lng: -75.21505129646759 },
          zoom: 10,
        })
      );
    }
    // New Code markets: 2
    if (map && !markerCluster) {
      map.addListener("click", (e: google.maps.MapMouseEvent) => {
        if (e.latLng) {
          const { lat, lng } = e.latLng;
          setMarker({ lat: lat(), lng: lng() });
        }
      });
      setMarkerClusters(new MarkerClusterer({ map, markers: [] }));
    }
    // New Code markers: 2
  }, [map, markerCluster]);

  // New Code markers 3
  useEffect(() => {
    if (marker && markerCluster) {
      markerCluster.addMarker(
        new window.google.maps.Marker({
          position: { lat: marker.lat, lng: marker.lng },
        })
      );
    }
  }, [marker, markerCluster]);
  // New Code markers 3
  return (
    <>
      <div ref={ref} style={{ height: "100%", width: "100%" }}></div>
    </>
  );
}
