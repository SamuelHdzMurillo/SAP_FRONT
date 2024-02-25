import { Form } from "antd";
import { useGoalStore } from "../store";
import { useState } from "react";
import { deleteGoal, getGoalCharts } from "../goal.api";
import { AnyObject } from "yup";
import { useAlertStore } from "@/components/alerts/alertStore";
import confirm from "antd/es/modal/confirm";
import { ExclamationCircleFilled } from "@ant-design/icons";
import { MunicipalCatalog } from "@/module/promoted/page/PromotedRegister";
import {
  getDistrictByMunicipal,
  getMunicipalCatalog,
  getSectionCatalogByDistrict,
} from "@/api/CatalogHttp";
export const useGoalC = () => {
  const setGoals = useGoalStore((state) => state.setGoals);
  const deleteGoalS = useGoalStore((state) => state.deleteGoalS);
  const setTypeForm = useGoalStore((state) => state.setTypeForm);
  const setAlert = useAlertStore((state) => state.setAlert);
  const clearAlert = useAlertStore((state) => state.clearAlert);
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [typeMeta, setTypeMeta] = useState("");
  const [municipal, setMunicipal] = useState<MunicipalCatalog[]>([]);
  const [districts, setDistricts] = useState<MunicipalCatalog[]>([]);
  const [sections, setSections] = useState<MunicipalCatalog[]>([]);
  const [loading, setLoading] = useState(false);
  const handleOpenModal = async (typeMeta: string) => {
    // console.log(record, "useGoalC")
    setDistricts([]);
    setSections([]);
    setLoading(true);
    setTypeMeta(typeMeta);
    form.resetFields();
    setTypeForm("post");
    setIsModalOpen(true);
    setLoading(false);
    const data = await getMunicipalCatalog();
    setMunicipal(data);
  };
  const handleGetDistrictByMunicap = async (id: number) => {
    const { data } = await getDistrictByMunicipal({ municipal_id: id });
    setDistricts(data);
  };
  const handleGetSectionsByDistrict = async (id: number) => {
    const { data } = await getSectionCatalogByDistrict({ district_id: id });
    setSections(data);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleGetGoals = async (type: string) => {
    setLoading(true);
    setTypeMeta(type);
    const { goals } = await getGoalCharts(type);
    const formatedGoals = goals.map((goal: AnyObject) => {
      if (type === "district") {
        return {
          id: goal.id,
          goalName: goal.goal_name,
          goalValue: goal.goal_value,
          promoted_count: goal.promoted_count,
          muncipal_name: goal.district_name,
          district_name: goal.district_name,
        };
      }
      if (type === "section") {
        return {
          id: goal.id,
          goalName: goal.goal_name,
          goalValue: goal.goal_value,
          promoted_count: goal.promoted_count,
          muncipal_name: goal.section_name,
          district_name: goal.district_name,
          section_name: goal.section_name,
        };
      }
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
          console.log(id, typeMeta, "useGoalC");
          await deleteGoal(id, typeMeta);
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
    typeMeta,
    isModalOpen,
    form,
    loading,
    municipal,
    districts,
    sections,
    handleGetDistrictByMunicap,
    handleGetSectionsByDistrict,
    handleCloseModal,
    handleOpenModal,
    setLoading,
    handleGetGoals,
    handleDeleteGoal,
  };
};
