import { Modal } from "antd";
const { confirm } = Modal;
import { ExclamationCircleFilled } from "@ant-design/icons";
import DropDownC from "@/components/DropDownC";
import { Promoted, usePromotedStore } from "../store";
import { destroyPromoted } from "../api";
import { useNavigate } from "react-router-dom";
interface DropDownPVProps {
  record: Promoted;
  handleOpenModal: (type: string, record: Promoted) => void;
}
const DropDownPV = ({ record, handleOpenModal }: DropDownPVProps) => {
  const deletePromoted = usePromotedStore((state) => state.deletePromoted);
  const navigate = useNavigate();
  const handleGetItemsDropdown = (record: Promoted) => {
    return [
      {
        key: "3",
        label: "Editar",
        onClick: () => navigate(`/promovidos-editar/${record.id}`),
      },
      {
        key: "1",
        label: "Eliminar",
        onClick: () => showPromiseConfirm(record),
      },
    ];
  };
  const showPromiseConfirm = (record: Promoted) => {
    confirm({
      title: "¿Quieres eliminar este promovido?",
      icon: <ExclamationCircleFilled />,
      content:
        "Si le das a Ok, se eliminará por completo y no habrá vuelta atrás",
      async onOk() {
        const { data } = await destroyPromoted(record.id);
        deletePromoted(data.id);
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
