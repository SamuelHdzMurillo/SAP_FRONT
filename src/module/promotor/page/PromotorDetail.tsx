import LayoutC from "@/components/LayoutC";
import TemplateDetail from "@/components/TemplateDetail";
import PromotorsForm from "../components/PromotorsForm";
import { usePromotorC } from "../hooks/usePromotorC";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { usePromotorStore } from "../store";
import TableC from "@/components/TableC";
import { usePromotedC } from "@/module/promoted/hooks/usePromotedC";

const PromotorDetail = () => {
  const { form, handleGetPromotor } = usePromotorC();
  const { columns, handleTableChange, tableParams, loading } = usePromotedC();
  const promotorStore = usePromotorStore((state) => state.promotor);
  const { id } = useParams();
  useEffect(() => {
    handleGetPromotor(parseInt(id));
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
          title="Detalle del Promotor"
          module="promotores"
          attributeProfile="profile_path"
          data={promotorStore}
          isProfilePhoto={true}
          form={<PromotorsForm form={form} isDetail={true} />}
          isTable={true}
          titleTable="Promovidos"
          table={
            <TableC
              dataSource={promotorStore.promoteds}
              columns={columns}
              pagination={tableParams.pagination}
              handleTableChange={handleTableChange}
              loading={loading}
              children={"Agregar Usuario"}
            />
          }
        />
      </div>
    </LayoutC>
  );
};

export default PromotorDetail;
