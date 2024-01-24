// import { createElement, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { UserOutlined } from "@ant-design/icons";
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
      key: "/usuarios",
      onClick: () => navigate("/usuarios"),
      icon: <UserOutlined />,
    },
    {
      label: "Promotores",
      key: "/promotores",
      onClick: () => navigate("/promotores"),
      icon: <UserOutlined />,
    },
    {
      label: "Problemas",
      key: "/problemas",
      onClick: () => navigate("/problemas"),
      icon: <UserOutlined />,
    },
    {
      label: "Promovidos",
      key: "/promovidos-menu",
      icon: <UserOutlined />,
      children: [
        {
          label: "Registrar",
          key: "/promovidos-registrar",
          onClick: () => navigate("/promovidos-registrar"),
        },
        {
          label: "Administrar",
          key: "/promovidos",
          onClick: () => navigate("/promovidos"),
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
