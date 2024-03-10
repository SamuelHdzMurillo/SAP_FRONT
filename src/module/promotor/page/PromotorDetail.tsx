import LayoutC from "@/components/LayoutC";
import TemplateDetail from "@/components/TemplateDetail";
import PromotorsForm from "../components/PromotorsForm";
import { usePromotorC } from "../hooks/usePromotorC";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { usePromotorStore } from "../store";
import TableC from "@/components/TableC";
import { usePromotedC } from "@/module/promoted/hooks/usePromotedC";
import { Modal } from "antd";

import { Button } from "antd"; // Importa Card, Select y Button de antd
import { useAuthStore } from "@/module/auth/auth";
import { usePromotedStore } from "@/module/promoted/store";

const URL = import.meta.env.VITE_API_URL;
const PromotorDetail = () => {
  const { form, handleGetPromotor } =
    usePromotorC();
  const user_type = useAuthStore((state) => state.user_type);
  const { handleTableChange , handleGetPromotedsByPromotor, tableParams, columns} = usePromotedC();
  const promotorStore = usePromotorStore((state) => state.promotor);
  const promotesdStore = usePromotedStore((state) => state.promoteds);
  const setPromoteds = usePromotedStore((state) => state.setPromoteds);
  const [loading, setLoading] = useState(false);
  const [showImage, setShowImage] = useState(false); // Estado para controlar la visibilidad de la imagen
  const [showModal, setShowModal] = useState(false);

  // Función para manejar el clic en el botón, cambia la visibilidad de la imagen
  const toggleImageVisibility = () => {
    setShowImage(!showImage);
    setShowModal(!showImage); // Se muestra el modal al hacer clic en el botón
  };
  const closeModal = () => {
    setShowModal(false);
  };

  const { id } = useParams();
  useEffect(() => {
    setPromoteds([]);
    setLoading(true);
    handleGetPromotor(parseInt(id));
    handleGetPromotedsByPromotor(parseInt(id));
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
        <Modal
          open={showModal}
          onCancel={closeModal}
          footer={null}
          width={400} // Ajusta el ancho del modal según tus necesidades
        >
          <img
            src={`${URL}/storage/${promotorStore.ine_path}`}
            style={{
              width: "100%",
              objectFit: "contain",
              borderRadius: "10px",
            }}
            alt=""
          />
        </Modal>

        <TemplateDetail
          loading={loading}
          title="Detalle del promotor"
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
              <Button onClick={toggleImageVisibility}>Mostar INE</Button>
              <PromotorsForm form={form} isDetail={true} />
            </div>
          }
          isTable={user_type === "superadmin" || user_type === "admin"}
          titleTable="Promovidos"
          table={
            <TableC
              dataSource={promotesdStore}
              columns={columns}
              pagination={tableParams.pagination}
              handleTableChange={handleTableChange}
              loading={loading}
              children={"Agregar usuario"}
            />
          }
        />
      </div>
    </LayoutC>
  );
};

export default PromotorDetail;
