// import { createElement, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { ContactsOutlined, UserOutlined } from "@ant-design/icons";
import { Dropdown, Layout, Menu, Space, Typography, theme } from "antd";
import logo from "../assets/imgs/logo.svg";
const { Header, Sider } = Layout;

const MainC = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const navigate = useNavigate();
  const { pathname: pathLocation } = useLocation();
  const items2 = [
    {
      label: "Usuarios",
      key: "/usuarios-menu",
      icon: <UserOutlined />,
      children: [
        {
          label: "Registrar",
          key: "/usuarios-registrar",
          onClick: () => navigate("/usuarios-registrar"),
        },
        {
          label: "Administrar",
          key: "/usuarios",
          onClick: () => navigate("/usuarios"),
        },
      ],
    },
    {
      label: "Empresas",
      key: "/empresas-menu",
      icon: <ContactsOutlined />,
      children: [
        {
          label: "Registrar",
          key: "/empresas-registrar",
          onClick: () => navigate("/empresas-registrar"),
        },
        {
          label: "Administrar",
          key: "/empresas",
          onClick: () => navigate("/empresas"),
        },
        {
          label: "Administrar Contactos",
          key: "/contactos",
          onClick: () => navigate("/contactos"),
        },
      ],
    },
  ];
  const handleLogout = async () => {};
  return (
    // <ProtectedRoute redirectTo={"/login"}>
    <Layout>
      <Header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          alignContent: "center",
          height: "48px",
        }}
      >
        <img src={logo} alt="Logo tendencia" srcSet="" />
        <Dropdown
          menu={{
            items: [
              {
                key: 1,
                label: "Cerrar Sesión",
                onClick: () => handleLogout(),
              },
            ],
            selectable: true,
          }}
        >
          <Typography.Paragraph
            style={{
              color: "#FFFFFF",
            }}
          >
            <Space>{``}</Space>
          </Typography.Paragraph>
        </Dropdown>
      </Header>
      <Layout>
        <Sider
          width={200}
          style={{
            background: colorBgContainer,
          }}
          breakpoint="lg"
          collapsedWidth="0"
        >
          <Menu
            mode="inline"
            defaultSelectedKeys={[pathLocation]}
            defaultOpenKeys={[pathLocation]}
            style={{
              height: "100%",
              borderRight: 0,
            }}
            items={items2}
          />
        </Sider>

        <Layout>
          <Outlet />
        </Layout>
      </Layout>
    </Layout>
    // </ProtectedRoute>
  );
};

export default MainC;
