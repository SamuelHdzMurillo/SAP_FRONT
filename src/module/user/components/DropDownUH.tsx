import { Modal } from "antd";
const { confirm } = Modal;
import { ExclamationCircleFilled } from "@ant-design/icons";
import DropDownC from "@/components/DropDownC";
import { User, useUserStore } from "../store";
import { destroyUser } from "../api";
interface DropDownUHProps {
  record: User;
  handleOpenModal: (type: string, record: User) => void;
}
const DropDownUH = ({ record, handleOpenModal }: DropDownUHProps) => {
  const deleteUser = useUserStore((state) => state.deleteUser);

  const handleGetItemsDropdown = (record: User) => {
    return [
      {
        key: "3",
        label: "Editar",
        onClick: () => handleOpenModal("put", record),
      },
      // {
      //   key: "2",
      //   label: "Cambiar contraseña",
      //   onClick: () => handleOpenModal("password", record),
      // },
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
        const { data } = await destroyUser(record.id);
        deleteUser(data.id);
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
