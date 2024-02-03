import { useEffect, useState } from "react";
import { getPromoteds } from "@/api/MapHttp";
import { APIProvider, Map } from "@vis.gl/react-google-maps";
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
const KEY_GOOGLE_ID = import.meta.env.VITE_API_KEY_GOOGLE_ID;
const DashboardMap = () => {
  const [promoteds, setPromoteds] = useState<PromotedMarker[]>([]);
  useEffect(() => {
    const handleGetPromoteds = async () => {
      const { data } = await getPromoteds();
      setPromoteds(data);
    };
    handleGetPromoteds();
  }, []);
  return (
    <div style={{ height: "96vh", width: "100%", margin: "0 auto" }}>
      {/* <Wrapper apiKey={KEY_GOOGLE} render={SpinC}>
        <MapComponent promoteds={promoteds} />
      </Wrapper> */}
      <APIProvider apiKey={KEY_GOOGLE}>
        <Map
          zoom={8}
          center={{ lat: 25.205641832427236, lng: -111.46940701659838 }}
          gestureHandling={"greedy"}
          disableDefaultUI={true}
          mapId={KEY_GOOGLE_ID}
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
        </Map>
      </APIProvider>
    </div>
  );
};

export default DashboardMap;
