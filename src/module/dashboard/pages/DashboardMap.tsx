import { Wrapper } from "@googlemaps/react-wrapper";
import MapComponent from "../components/MapComponent";
import { SpinC } from "../components/Spinner";
import { useEffect, useState } from "react";
import { getPromoteds } from "@/api/MapHttp";
export interface PromotedMarker {
  id: number;
  lat: string;
  lng: string;
}
const KEY_GOOGLE = import.meta.env.VITE_API_KEY_GOOGLE;
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
      <Wrapper apiKey={KEY_GOOGLE} render={SpinC}>
        <MapComponent promoteds={promoteds} />
      </Wrapper>
    </div>
  );
};

export default DashboardMap;
