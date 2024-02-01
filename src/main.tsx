import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./assets/css/normalize.css";
import { ConfigProvider } from 'antd'; // Importa ConfigProvider de Ant Design
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/index.tsx";

// Define la configuración de tokens de tema
const theme = {
  token: {
    colorPrimary: "#8e2a2a",
    colorInfo: "#8e2a2a"
  }
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ConfigProvider theme={theme}> {/* Usa ConfigProvider para aplicar el tema */}
      <RouterProvider router={router} />
    </ConfigProvider>
  </React.StrictMode>
);
