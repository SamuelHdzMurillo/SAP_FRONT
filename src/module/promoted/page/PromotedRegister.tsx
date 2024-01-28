import { Form } from "antd";
import "../promoted.css";
import LayoutC from "@/components/LayoutC";
import PromotedForm from "../components/PromotedForm";

// eslint-disable-next-line react-refresh/only-export-components
export interface MunicipalCatalog {
  value: number;
  label: string;
}

const PromotedRegister = () => {
  const [form] = Form.useForm();

  return (
    <LayoutC
      items={[
        {
          title: "Promovidos",
        },
        {
          title: "Registro",
        },
      ]}
      title={"Promovidos"}
    >
      <PromotedForm form={form} />
    </LayoutC>
  );
};

export default PromotedRegister;
