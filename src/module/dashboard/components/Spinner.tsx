import { Status } from "@googlemaps/react-wrapper";
import { Spin } from "antd";

export const SpinC = (status: Status) => (
  <div style={{ height: "96vh", width: "100%", margin: "0 auto" }}>
    <Spin />
  </div>
);
