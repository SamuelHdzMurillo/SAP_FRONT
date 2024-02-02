import { Modal } from "antd";
const { confirm } = Modal;
import { ExclamationCircleFilled } from "@ant-design/icons";
import DropDownC from "@/components/DropDownC";
import { Problem, useProblemStore } from "../store";
import { destroyProblem } from "../api";
// import { destroyProblem } from "../api";
interface DropDownPMSProps {
  record: Problem;
  handleOpenModal: (type: string, record: Problem) => void;
}
const DropDownPMS = ({ record, handleOpenModal }: DropDownPMSProps) => {
  const deleteProblem = useProblemStore((state) => state.deleteProblem);
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
        const { data } = await destroyProblem({ id: record.id });
        deleteProblem(data.id);
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
