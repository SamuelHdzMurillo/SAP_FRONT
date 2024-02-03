import { useState } from "react";
import {
  AdvancedMarker,
  InfoWindow,
  useAdvancedMarkerRef,
} from "@vis.gl/react-google-maps";
import { Card, Descriptions } from "antd";
import Title from "antd/es/typography/Title";

export const MarkerInfo = ({
  lat,
  lng,
  name,
  phone_number,
  section,
  email,
}: {
  lat: number;
  lng: number;
  name: string;
  phone_number: string;
  section: string;
  email: string;
}) => {
  const [infowindowOpen, setInfowindowOpen] = useState(false);
  const [markerRef, marker] = useAdvancedMarkerRef();

  return (
    <>
      <AdvancedMarker
        ref={markerRef}
        onClick={() => setInfowindowOpen(!infowindowOpen)}
        position={{ lat, lng }}
      />
      {infowindowOpen && (
        <InfoWindow
          anchor={marker}
          maxWidth={300}
          onCloseClick={() => setInfowindowOpen(false)}
        >
          <Card bordered={false} style={{ maxWidth: "100%", padding: "0px" }}>
            <Title style={{ padding: "0px", margin: "0px" }} level={4}>
              Información del Promovido
            </Title>
            <Descriptions column={1} layout="vertical">
              <Descriptions.Item
                style={{ padding: "0px", margin: "0px" }}
                label="Nombre"
              >
                {name}
              </Descriptions.Item>
              <Descriptions.Item
                style={{ padding: "0px", margin: "0px" }}
                label="Número Telefónico"
              >
                {phone_number}
              </Descriptions.Item>
              <Descriptions.Item
                style={{ padding: "0px", margin: "0px" }}
                label="Correo Electrónico"
              >
                {email}
              </Descriptions.Item>
              <Descriptions.Item
                style={{ padding: "0px", margin: "0px" }}
                label="Sección"
              >
                {section}
              </Descriptions.Item>
            </Descriptions>
          </Card>
        </InfoWindow>
      )}
    </>
  );
};
