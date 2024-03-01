import { useEffect, useState, useRef } from "react";
import { getPromoteds } from "@/api/MapHttp";
import {
  GoogleMap,
  useJsApiLoader,
} from "@react-google-maps/api";
import { MarkerInfo } from "../components/MarkerInfo";

export interface PromotedMarker {
  id: number;
  lat: string;
  lng: string;
  name: string;
  phone_number: string;
  section: string;
  email: string;
}

const KEY_GOOGLE = import.meta.env.VITE_API_KEY_GOOGLE;

const DashboardMap = () => {
  const [promoteds, setPromoteds] = useState<PromotedMarker[]>([]);
  const mapRef = useRef(null);

  useEffect(() => {
    const handleGetPromoteds = async () => {
      const { data } = await getPromoteds();
      setPromoteds(data);
    };
    handleGetPromoteds();
  }, []);

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: KEY_GOOGLE,
  });

  useEffect(() => {
    if (isLoaded && !loadError && mapRef.current) {
      console.log("mapRef", mapRef.current);
    }
  }, [isLoaded, loadError]);

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading maps</div>;

  return (
    <div style={{ height: "96vh", width: "100%", margin: "0 auto" }}>
      <GoogleMap
        mapContainerStyle={{ width: "100%", height: "100%" }}
        zoom={8}
        center={{ lat: 25.205641832427236, lng: -111.46940701659838 }}
        onLoad={(map) => {
          mapRef.current = map;
          new google.maps.KmlLayer({
            url: "https://cotizaciones.tendenciaelartedeviajar.com/tendencia-cotizador-api/public/kml/prueba_20.kmz",
            map: mapRef.current,
            preserveViewport: true,
          });
        }}
      >
        {promoteds.map((promoted) => (
          <MarkerInfo
            key={promoted.id}
            lat={parseFloat(promoted.lat)}
            lng={parseFloat(promoted.lng)}
            email={promoted.email}
            name={promoted.name}
            section={promoted.section}
            phone_number={promoted.phone_number}
          />
        ))}
      </GoogleMap>
    </div>
  );
};

export default DashboardMap;
