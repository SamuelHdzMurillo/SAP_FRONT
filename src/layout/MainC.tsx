// import { createElement, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  UserAddOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";
import { Dropdown, Layout, Menu, Typography, theme } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMap,
  faUserTie,
  faChartSimple,
  faAddressBook,
  faTriangleExclamation,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";

import logo from "../assets/imgs/HD_LOGOTIPOS_V_S.png";
import { postLogout } from "@/module/auth/api";
import { useAuthStore } from "@/module/auth/auth";
import profilePhoto from "@/assets/imgs/foto_default.png";
const URL = import.meta.env.VITE_API_URL;
const { Header, Sider } = Layout;

const MainC = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const navigate = useNavigate();
  const userAuth = useAuthStore((state) => state.user);
  const user_type = useAuthStore((state) => state.user_type);
  const setToken = useAuthStore((state) => state.setToken);
  const setUser = useAuthStore((state) => state.setUserData);
  const setUserType = useAuthStore((state) => state.setUserType);
  const { pathname: pathLocation } = useLocation();
  const items2 = [
    {
      label: "Estadisticas",
      key: "/Dashboard",
      onClick: () => navigate("/"),
      icon: <FontAwesomeIcon icon={faChartSimple} />,
    },
    {
      label: "Mapa",
      key: "/mapa",
      onClick: () => navigate("/mapa"),
      icon: <FontAwesomeIcon icon={faMap} />,
    },
    {
      label: "Administradores",
      key: "/usuarios",
      onClick: () => navigate("/usuarios"),
      icon: <FontAwesomeIcon icon={faUserTie} />,
    },
    {
      label: "Promotores",
      key: "/promotores",
      onClick: () => navigate("/promotores"),
      icon: <FontAwesomeIcon icon={faAddressBook} />,
    },
    {
      label: "Problemas",
      key: "/problemas",
      onClick: () => navigate("/problemas"),
      icon: <FontAwesomeIcon icon={faTriangleExclamation} />,
    },
    {
      label: "Metas",
      key: "/metas",
      icon: <FontAwesomeIcon icon={faChartSimple} />,
      children: [
        {
          label: "Municipio",
          key: "/metas-municipio",
          onClick: () => navigate("/metas"),
        },
        {
          label: "Distrito",
          key: "/metas-distrito",
          onClick: () => navigate("/metas-distrito"),
        },
        {
          label: "Sección",
          key: "/metas-seccion",
          onClick: () => navigate("/metas-seccion"),
        },
      ],
    },
    {
      label: "Secciones Prioritarias",
      key: "/prioridades",
      onClick: () => navigate("/secciones-prioritarias"),
    },
    {
      label: "Promovidos",
      key: "/promovidos-menu",
      icon: <FontAwesomeIcon icon={faUsers} />,
      children: [
        {
          label: "Registrar",
          key: "/promovidos-registrar",
          onClick: () => navigate("/promovidos-registrar"),
          icon: <UserAddOutlined />,
        },
        {
          label: "Administrar",
          key: "/promovidos",
          onClick: () => navigate("/promovidos"),
          icon: <UsergroupAddOutlined />,
        },
      ],
    },
  ];
  const items3 = [
    {
      label: "Perfil",
      key: "/promotores",
      onClick: () => navigate("/promotores/" + userAuth.id),
      icon: <FontAwesomeIcon icon={faUserTie} />,
    },
    {
      label: "Problemas",
      key: "/problemas",
      onClick: () => navigate("/problemas"),
      icon: <FontAwesomeIcon icon={faTriangleExclamation} />,
    },
    {
      label: "Promovidos",
      key: "/promovidos-menu",
      icon: <FontAwesomeIcon icon={faUsers} />,
      children: [
        {
          label: "Registrar",
          key: "/promovidos-registrar",
          onClick: () => navigate("/promovidos-registrar"),
          icon: <UserAddOutlined />,
        },
        {
          label: "Administrar",
          key: "/promovidos",
          onClick: () => navigate("/promovidos"),
          icon: <UsergroupAddOutlined />,
        },
      ],
    },
    {
      label: "Metas",
      key: "/metas",
      icon: <FontAwesomeIcon icon={faChartSimple} />,
      children: [
        {
          label: "Municipio",
          key: "/metas-municipio",
          onClick: () => navigate("/metas"),
        },
        {
          label: "Distrito",
          key: "/metas-distrito",
          onClick: () => navigate("/metas-distrito"),
        },
        {
          label: "Sección",
          key: "/metas-seccion",
          onClick: () => navigate("/metas-seccion"),
        },
      ],
    },
  ];
  const handleLogout = async () => {
    await postLogout();
    setToken("");
    setUserType("");
    setUser({
      id: 0,
      name: "",
      email: "",
      password: "",
      phone_number: "",
    });
    navigate("/login");
  };
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
          backgroundColor: "#1C1C1C",
        }}
      >
        <img
          style={{
            maxWidth: "120px",
          }}
          src={logo}
          alt="Logo tendencia"
          srcSet=""
        />
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
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "10px",
              }}
            >
              <img
                src={
                  userAuth.profile_img_path !== null ||
                  userAuth.profile_img_path.length > 0
                    ? `${URL}/storage/${userAuth.profile_img_path}`
                    : profilePhoto
                }
                alt="profile"
                style={{
                  width: "30px",
                  height: "30px",
                  borderRadius: "50%",
                }}
              />
              {`${userAuth.name}`}
            </div>
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
            items={user_type === "promotor" ? items3 : items2}
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
