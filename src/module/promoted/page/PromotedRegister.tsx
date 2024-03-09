import "../promoted.css";
import LayoutC from "@/components/LayoutC";
import PromotedForm from "../components/PromotedForm";
import { useEffect, useState } from "react";
import { useAlertStore } from "@/components/alerts/alertStore";
import { getPromotorsCatalog } from "@/api/CatalogHttp";

// eslint-disable-next-line react-refresh/only-export-components
export interface MunicipalCatalog {
  value: string;
  label: string;
}

const PromotedRegister = () => {
  const [usersCatalog, setUsersCatalog] = useState([]);
  const clearAlert = useAlertStore((state) => state.clearAlert);

  useEffect(() => {
    const handleGetUsersCatalog = async () => {
      const { data } = await getPromotorsCatalog();
      setUsersCatalog(data);
    };
    setTimeout(() => {
      clearAlert();
    }, 3000);
    handleGetUsersCatalog();
  }, []);
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
      <div>
        <PromotedForm usersCatalog={usersCatalog} />
      </div>
    </LayoutC>
  );
};

export default PromotedRegister;
