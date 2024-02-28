import { useState } from "react";
import { Marker, InfoWindow } from "@react-google-maps/api";
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

  return (
    <Marker
      position={{ lat, lng }}
      onClick={() => setInfowindowOpen(!infowindowOpen)}
    >
      {infowindowOpen && (
        <InfoWindow onCloseClick={() => setInfowindowOpen(false)}>
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
    </Marker>
  );
};
