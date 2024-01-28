import { Modal } from "antd";
const { confirm } = Modal;
import { ExclamationCircleFilled } from "@ant-design/icons";
import DropDownC from "@/components/DropDownC";
import { Promotor, usePromotorStore } from "../store";
import { destroyPromotor } from "../api";
import { useNavigate } from "react-router-dom";
interface DropDownPromoProps {
  record: Promotor;
  handleOpenModal: (type: string, record: Promotor) => void;
}
const DropDownPromo = ({ record, handleOpenModal }: DropDownPromoProps) => {
  const deletePromotor = usePromotorStore((state) => state.deletePromotor);
  const navigate = useNavigate();
  const handleGetItemsDropdown = (record: Promotor) => {
    return [
      {
        key: "3",
        label: "Editar",
        onClick: () => handleOpenModal("put", record),
      },
      {
        key: "2",
        label: "Detalles",
        onClick: () => navigate(`/promotores/${record.id}`),
      },
      {
        key: "1",
        label: "Eliminar",
        onClick: () => showPromiseConfirm(record),
      },
    ];
  };
  const showPromiseConfirm = (record: Promotor) => {
    confirm({
      title: "¿Quieres eliminar este usuario?",
      icon: <ExclamationCircleFilled />,
      content:
        "Si le das a Ok, se eliminará por completo y no habrá vuelta atrás",
      async onOk() {
        const { data } = await destroyPromotor(record.id);
        deletePromotor(data.id);
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
export default DropDownPromo;
