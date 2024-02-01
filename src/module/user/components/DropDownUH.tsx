import { Modal } from "antd";
const { confirm } = Modal;
import { ExclamationCircleFilled } from "@ant-design/icons";
import DropDownC from "@/components/DropDownC";
import { User, useUserStore } from "../store";
import { destroyUser } from "../api";
import { useNavigate } from "react-router-dom";
import { useAlertStore } from "@/components/alerts/alertStore";
interface DropDownUHProps {
  record: User;
  handleOpenModal: (type: string, record: User) => void;
}
const DropDownUH = ({ record, handleOpenModal }: DropDownUHProps) => {
  const deleteUser = useUserStore((state) => state.deleteUser);
  const naviagate = useNavigate();
  const setAlert = useAlertStore((state) => state.setAlert);
  const clearAlert = useAlertStore((state) => state.clearAlert);
  const handleGetItemsDropdown = (record: User) => {
    return [
      {
        key: "3",
        label: "Editar",
        onClick: () => handleOpenModal("put", record),
      },
      {
        key: "2",
        label: "Detalles",
        onClick: () => naviagate(`/usuarios/${record.id}`),
      },
      {
        key: "1",
        label: "Eliminar",
        onClick: () => showPromiseConfirm(record),
      },
    ];
  };
  const showPromiseConfirm = (record: User) => {
    confirm({
      title: "¿Quieres eliminar este usuario?",
      icon: <ExclamationCircleFilled />,
      content:
        "Si le das a Ok, se eliminará por completo y no habrá vuelta atrás",
      async onOk() {
        try {
          const { data } = await destroyUser(record.id);
          deleteUser(data.id);
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
export default DropDownUH;
