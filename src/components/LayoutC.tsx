import { Content } from "antd/es/layout/layout";
// import BreadCrum from "./BreadCrum";
import { theme } from "antd";
import BreadCrum from "./BreadCrum";
import AlertC from "./alerts/AlertC";
import { useLocation } from "react-router-dom";
interface Item {
  title: string;
}
interface LayoutCProps {
  children: React.ReactNode;
  items: Item[];
  title: string;
}

const LayoutC = ({ children, items, title }: LayoutCProps) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const location = useLocation();
  const match = location.pathname.match(/\/usuarios\/\d+/);
  return (
    <>
      <Content
        style={{
          padding: 24,
          margin: 12,
          minHeight: "850px",
          background: colorBgContainer,
        }}
      >
        {!match && <AlertC />}
        <BreadCrum items={items} title={title} />
        {children}
      </Content>
    </>
  );
};
export default LayoutC;
