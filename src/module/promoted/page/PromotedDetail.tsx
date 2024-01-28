import LayoutC from "@/components/LayoutC";
import TemplateDetail from "@/components/TemplateDetail";
import { usePromotedStore } from "../store";
import PromotedForm from "../components/PromotedForm";
import { usePromotedC } from "../hooks/usePromotedC";
import Problems from "../components/Problems/Problems";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import MapComponentG from "../components/MapComponentG";

const PromotedDetail = () => {
  const { form, handleGetPromtoed } = usePromotedC();
  const promotedStore = usePromotedStore((state) => state.promoted);
  const params = useParams<{ id: string }>();
  useEffect(() => {
    handleGetPromtoed(params.id);
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
          title="Detalle del Promovido"
          data={promotedStore}
          form={<PromotedForm form={form} isTitle={false} />}
          isProblem
          titleTable="Problemas"
          problem={
            <Problems
              problems={
                promotedStore.problems.length > 0 ? promotedStore.problems : []
              }
            />
          }
          isMap
          map={
            <MapComponentG
              defaultMarker={{
                lat: parseFloat(promotedStore.latitude),
                lng: parseFloat(promotedStore.longitude),
              }}
            />
          }
        />
      </div>
    </LayoutC>
  );
};

export default PromotedDetail;