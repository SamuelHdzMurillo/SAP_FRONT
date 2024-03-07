import LayoutC from "@/components/LayoutC";
import TemplateDetail from "@/components/TemplateDetail";
import UsersForm from "../components/UsersForm";
import { useUserC } from "../hooks/useUserC";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useUserStore } from "../store";

const UserDetail = () => {
  const { form, handleGetUser } = useUserC();
  const userStore = useUserStore((state) => state.user);
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    handleGetUser(parseInt(id));
    setLoading(false);
  }, []);
  return (
    <LayoutC
      items={[
        {
          title: "Usuarios",
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
          title="Detalle del usuario"
          data={userStore}
          isProfilePhoto={true}
          form={<UsersForm form={form} isDetail={true} />}
        />
      </div>
    </LayoutC>
  );
};

export default UserDetail;
