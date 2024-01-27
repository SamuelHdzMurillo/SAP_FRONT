import { Status, Wrapper } from "@googlemaps/react-wrapper";
import MapComponent from "../components/MapComponent";

const KEY_GOOGLE = import.meta.env.VITE_API_KEY_GOOGLE;
const DashboardMap = () => {
  const render = (status: Status) => <h1>{status}</h1>;
  console.log(KEY_GOOGLE);
  return (
    <div style={{ height: "95vh", maxWidth: 1280, width: "100%" }}>
      <Wrapper apiKey={KEY_GOOGLE} render={render}>
        <MapComponent />
      </Wrapper>
    </div>
  );
};

export default DashboardMap;
