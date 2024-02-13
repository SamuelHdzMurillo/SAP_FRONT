import { Form } from "antd";
import { useGoalStore } from "../store";
import { useState } from "react";
import { deleteGoal, getGoalCharts } from "../goal.api";
import { AnyObject } from "yup";
import { useAlertStore } from "@/components/alerts/alertStore";
import confirm from "antd/es/modal/confirm";
import { ExclamationCircleFilled } from "@ant-design/icons";
export const useGoalC = () => {
  const setGoals = useGoalStore((state) => state.setGoals);
  const deleteGoalS = useGoalStore((state) => state.deleteGoalS);
  const setTypeForm = useGoalStore((state) => state.setTypeForm);
  const setAlert = useAlertStore((state) => state.setAlert);
  const clearAlert = useAlertStore((state) => state.clearAlert);
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleOpenModal = () => {
    // console.log(record, "useGoalC")
    setLoading(true);
    form.resetFields();
    setTypeForm("post");
    setIsModalOpen(true);
    setLoading(false);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleGetGoals = async () => {
    setLoading(true);
    const { goals } = await getGoalCharts();
    const formatedGoals = goals.map((goal: AnyObject) => {
      return {
        id: goal.id,
        goalName: goal.goal_name,
        goalValue: goal.goal_value,
        promoted_count: goal.promoted_count,
        muncipal_name: goal.municipal_name,
      };
    });

    setGoals(formatedGoals);
    setLoading(false);
  };

  const handleDeleteGoal = async (id: number) => {
    confirm({
      title: "¿Quieres eliminar esta meta?",
      icon: <ExclamationCircleFilled />,
      content:
        "Si le das a Ok, se eliminará por completo y no habrá vuelta atrás",
      async onOk() {
        try {
          await deleteGoal(id);
          deleteGoalS(id);
          setAlert({
            type: "success",
            message: "meta eliminado correctamente",
            isShow: true,
          });
        } catch (error) {
          setAlert({
            type: "error",
            message: "Ocurrio un error al eliminar la meta",
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
  return {
    isModalOpen,
    form,
    loading,
    handleCloseModal,
    handleOpenModal,
    setLoading,
    handleGetGoals,
    handleDeleteGoal,
  };
};
