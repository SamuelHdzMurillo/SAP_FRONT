import { Modal } from "antd";
const { confirm } = Modal;
import { ExclamationCircleFilled } from "@ant-design/icons";
import DropDownC from "@/components/DropDownC";
import { useNavigate } from "react-router-dom";
import { useAlertStore } from "@/components/alerts/alertStore";
import { Admin, useAdminStore } from "../store";
import { destroyAdmin } from "../api";
interface DropDownAdminProps {
  record: Admin;
  handleOpenModal: (type: string, record: Admin) => void;
}
const DropDownAdmin = ({ record, handleOpenModal }: DropDownAdminProps) => {
  const deleteAdmin = useAdminStore((state) => state.deleteAdmin);
  const naviagate = useNavigate();
  const setAlert = useAlertStore((state) => state.setAlert);
  const clearAlert = useAlertStore((state) => state.clearAlert);
  const handleGetItemsDropdown = (record: Admin) => {
    return [
      {
        key: "3",
        label: "Editar",
        onClick: () => handleOpenModal("put", record),
      },
      {
        key: "2",
        label: "Detalles",
        onClick: () => naviagate(`/administradores/${record.id}`),
      },
      {
        key: "1",
        label: "Eliminar",
        onClick: () => showPromiseConfirm(record),
      },
    ];
  };
  const showPromiseConfirm = (record: Admin) => {
    confirm({
      title: "¿Quieres eliminar este administrador?",
      icon: <ExclamationCircleFilled />,
      content:
        "Si le das a Ok, se eliminará por completo y no habrá vuelta atrás",
      async onOk() {
        try {
          const { data } = await destroyAdmin(record.id);
          deleteAdmin(data.id);
          setAlert({
            type: "success",
            message: "Administrador eliminado correctamente",
            isShow: true,
          });
        } catch (error) {
          setAlert({
            type: "error",
            message: "Ocurrio un error al eliminar el administrador",
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
export default DropDownAdmin;
