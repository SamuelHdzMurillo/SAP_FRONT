import { Modal } from "antd";
const { confirm } = Modal;
import { ExclamationCircleFilled } from "@ant-design/icons";
import DropDownC from "@/components/DropDownC";
import { Promoted, usePromotedStore } from "../store";
import { destroyPromoted } from "../api";
import { useNavigate } from "react-router-dom";
import { useAlertStore } from "@/components/alerts/alertStore";
interface DropDownPVProps {
  record: Promoted;
  handleOpenModal: (type: string, record: Promoted) => void;
}
const DropDownPV = ({ record, handleOpenModal }: DropDownPVProps) => {
  const deletePromoted = usePromotedStore((state) => state.deletePromoted);
  const navigate = useNavigate();
  const setAlert = useAlertStore((state) => state.setAlert);
  const clearAlert = useAlertStore((state) => state.clearAlert);
  const handleGetItemsDropdown = (record: Promoted) => {
    const currentPath = window.location.pathname;
    const showOption3 = currentPath.includes(`/distritos/`);
    const items = [
      {
        key: "4",
        label: "Mostar Detalles",
        onClick: () => navigate(`/promovidos/${record.id}`),
      },

      {
        key: "1",
        label: "Eliminar",
        onClick: () => showPromiseConfirm(record),
      },
    ];

    if (!showOption3) {
      items.push({
        key: "3",
        label: "Editar",
        onClick: () => navigate(`/promovidos-editar/${record.id}`),
      });
      items.push({
        key: "2",
        label: "Generar un problema",
        onClick: () => handleOpenModal("problem", record),
      });
    }

    return items;
  };
  const showPromiseConfirm = (record: Promoted) => {
    confirm({
      title: "¿Quieres eliminar este promovido?",
      icon: <ExclamationCircleFilled />,
      content:
        "Si le das a Ok, se eliminará por completo y no habrá vuelta atrás",
      async onOk() {
        try {
          const { data } = await destroyPromoted(record.id);
          deletePromoted(data.id);
          setAlert({
            type: "success",
            message: "Promovido eliminado correctamente",
            isShow: true,
          });
        } catch (error) {
          setAlert({
            type: "error",
            message: "Ocurrio un error al eliminar el promovido",
            isShow: true,
          });
        }
        setTimeout(() => {
          clearAlert();
        }, 3000);
      },
      onCancel() {},
    });
  };
  return (
    <DropDownC
      handleGetItemsDropdown={handleGetItemsDropdown}
      record={record}
    />
  );
};
export default DropDownPV;
