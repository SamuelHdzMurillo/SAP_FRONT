import LayoutC from "@/components/LayoutC";
import TemplateDetail from "@/components/TemplateDetail";
import PromotorsForm from "../components/PromotorsForm";
import { usePromotorC } from "../hooks/usePromotorC";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { usePromotorStore } from "../store";
import TableC from "@/components/TableC";
import { usePromotedC } from "@/module/promoted/hooks/usePromotedC";
const URL = import.meta.env.VITE_API_URL;
const PromotorDetail = () => {
  const { form, handleGetPromotor } = usePromotorC();
  const { columns, handleTableChange, tableParams } = usePromotedC();
  const promotorStore = usePromotorStore((state) => state.promotor);
  const [loading, setLoading] = useState(false);

  const { id } = useParams();
  useEffect(() => {
    setLoading(true);
    handleGetPromotor(parseInt(id));
    setLoading(false);
  }, []);
  return (
    <LayoutC
      items={[
        {
          title: "Promotores",
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
          title="Detalle del Promotor"
          module="promotores"
          attributeProfile="profile_path"
          data={promotorStore}
          isProfilePhoto={true}
          form={
            <div
              style={{
                margin: "0 auto",
                width: 700,
                maxWidth: "100%",
              }}
            >
              <PromotorsForm form={form} isDetail={true} />
              <p
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  marginTop: 20,
                  marginBottom: 0,
                }}
              >
                Ine
              </p>
              <img
                src={`${URL}/storage/${promotorStore.ine_path}`}
                style={{
                  width: 300,
                  maxWidth: "100%",
                  objectFit: "contain",
                  borderRadius: "10px",
                }}
                alt=""
              />
            </div>
          }
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
