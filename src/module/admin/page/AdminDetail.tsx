import LayoutC from "@/components/LayoutC";
import TemplateDetail from "@/components/TemplateDetail";
import UsersForm from "../components/AdminsForm";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAdminC } from "../hooks/useAdminC";
import { useAdminStore } from "../store";

const AdminDetail = () => {
  const { form, handleGetAdmin } = useAdminC();
  const adminStore = useAdminStore((state) => state.admin);
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    handleGetAdmin(parseInt(id));
    setLoading(false);
  }, []);
  return (
    <LayoutC
      items={[
        {
          title: "Administradores",
        },
        { title: "Detalles" },
      ]}
      title={""}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        <TemplateDetail
          loading={loading}
          title="Detalle del administrador"
          data={adminStore}
          isProfilePhoto={true}
          form={<UsersForm form={form} isDetail={true} />}
        />
      </div>
    </LayoutC>
  );
};

export default AdminDetail;
