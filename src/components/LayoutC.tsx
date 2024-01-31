import { Content } from "antd/es/layout/layout";
// import BreadCrum from "./BreadCrum";
import { theme } from "antd";
import BreadCrum from "./BreadCrum";
import AlertC from "./alerts/AlertC";
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
  return (
    <>
      <BreadCrum items={items} title={title} />
      <Content
        style={{
          padding: 24,
          margin: 12,
          minHeight: "850px",
          background: colorBgContainer,
        }}
      >
        
        <AlertC />
        {children}
      </Content>
    </>
  );
};
export default LayoutC;
