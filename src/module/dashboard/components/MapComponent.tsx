import { MarkerClusterer } from "@googlemaps/markerclusterer";
import { useEffect, useRef, useState } from "react";
import { PromotedMarker } from "../pages/DashboardMap";

export default function MapComponent({
  promoteds,
}: {
  promoteds: PromotedMarker[];
}) {
  const [map, setMap] = useState<google.maps.Map>();
  const ref = useRef<HTMLDivElement>();
  // New Code Markers: 1
  const [markerCluster, setMarkerClusters] = useState<MarkerClusterer>();

  // New Code Markers 1
  useEffect(() => {
    if (ref.current && !map) {
      setMap(
        new window.google.maps.Map(ref.current, {
          center: { lat: 25.205641832427236, lng: -111.46940701659838 },
          zoom: 8,
        })
      );
    }
    // New Code markets: 2
    if (map && !markerCluster) {
      setMarkerClusters(new MarkerClusterer({ map, markers: [] }));
    }
    // New Code markers: 2
  }, [map, markerCluster]);

  // New Code markers 3
  // useEffect(() => {
  //   if (marker && markerCluster) {
  //     markerCluster.addMarker(
  //       new window.google.maps.Marker({
  //         position: { lat: marker.lat, lng: marker.lng },
  //       })
  //     );
  //   }
  // }, [marker, markerCluster]);
  useEffect(() => {
    if (map && promoteds.length > 0) {
      const markers = promoteds.map(
        (promoted) =>
          new window.google.maps.Marker({
            position: {
              lat: parseFloat(promoted.lat),
              lng: parseFloat(promoted.lng),
            },
            map: map,
          })
      );

      setMarkerClusters(new MarkerClusterer({ map, markers }));
    }
  }, [map, promoteds]);
  // New Code markers 3
  return (
    <>
      <div ref={ref} style={{ height: "100%", width: "100%" }}></div>
    </>
  );
}
