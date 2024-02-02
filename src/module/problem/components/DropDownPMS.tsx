import { Modal } from "antd";
const { confirm } = Modal;
import { ExclamationCircleFilled } from "@ant-design/icons";
import DropDownC from "@/components/DropDownC";
import { Problem, useProblemStore } from "../store";
import { destroyProblem } from "../api";
import { useAlertStore } from "@/components/alerts/alertStore";
// import { destroyProblem } from "../api";
interface DropDownPMSProps {
  record: Problem;
  handleOpenModal: (type: string, record: Problem) => void;
}
const DropDownPMS = ({ record, handleOpenModal }: DropDownPMSProps) => {
  const deleteProblem = useProblemStore((state) => state.deleteProblem);
  const setAlert = useAlertStore((state) => state.setAlert);
  const clearAlert = useAlertStore((state) => state.clearAlert);
  const handleGetItemsDropdown = (record: Problem) => {
    return [
      {
        key: "3",
        label: "Mostrar",
        onClick: () => handleOpenModal("problem", record),
      },
      {
        key: "1",
        label: "Eliminar",
        onClick: () => showPromiseConfirm(record),
      },
    ];
  };
  const showPromiseConfirm = (record: Problem) => {
    confirm({
      title: "¿Quieres eliminar este promovido?",
      icon: <ExclamationCircleFilled />,
      content:
        "Si le das a Ok, se eliminará por completo y no habrá vuelta atrás",
      async onOk() {
        try {
          const { data } = await destroyProblem({ id: record.id });
          deleteProblem(data.id);
          setAlert({
            type: "success",
            message: "Problema eliminado correctamente",
            isShow: true,
          });
        } catch (error) {
          setAlert({
            type: "error",
            message: "Ocurrio un error al eliminar el Problema",
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
export default DropDownPMS;
