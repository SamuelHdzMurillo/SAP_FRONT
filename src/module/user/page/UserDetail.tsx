import LayoutC from "@/components/LayoutC";
import TemplateDetail from "@/components/TemplateDetail";
import UsersForm from "../components/UsersForm";
import { useUserC } from "../hooks/useUserC";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useUserStore } from "../store";

const UserDetail = () => {
  const { form, handleGetUser } = useUserC();
  const userStore = useUserStore((state) => state.user);
  const { id } = useParams();
  useEffect(() => {
    handleGetUser(parseInt(id));
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
      <TemplateDetail
        title="Detalle del Usuario"
        data={userStore}
        isProfilePhoto={true}
        form={<UsersForm form={form} isDetail={true} />}
      />
    </LayoutC>
  );
};

export default UserDetail;
