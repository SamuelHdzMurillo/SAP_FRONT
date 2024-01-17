import { Breadcrumb } from "antd";

interface Item {
  title: string;
}
interface BreadCrumProps {
  items: Item[];
  title: string;
}

const BreadCrum = ({ items, title }: BreadCrumProps) => {
  return (
    <div
      style={{
        backgroundColor: "#FFF",
        padding: "16px 24px",
        fontSize: "14px",
      }}
    >
      <Breadcrumb
        style={{
          fontSize: "14px",
        }}
        items={[
          {
            title: "Inicio",
          },
          ...items,
        ]}
      />
      <h2 style={{ fontSize: 20 }}>{title}</h2>
    </div>
  );
};
export default BreadCrum;
