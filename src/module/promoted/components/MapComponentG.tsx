import { Wrapper } from "@googlemaps/react-wrapper";
const KEY_GOOGLE = import.meta.env.VITE_API_KEY_GOOGLE;
import MapComponenteC from "./MapComponenteC";
import { SpinC } from "@/module/dashboard/components/Spinner";

const MapComponentG = ({
  defaultMarker,
}: {
  defaultMarker: { lat: number; lng: number };
}) => {
  return (
    <div style={{ height: "50vh", width: "100%", margin: "0 auto" }}>
      <Wrapper apiKey={KEY_GOOGLE} render={SpinC}>
        <MapComponenteC defaultMarker={defaultMarker} />
      </Wrapper>
    </div>
  );
};

export default MapComponentG;
