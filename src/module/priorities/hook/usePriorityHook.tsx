import {
  getDistrictByMunicipal,
  getMunicipalCatalog,
  getSectionCatalogByDistrict,
} from "@/api/CatalogHttp";
import { MunicipalCatalog } from "@/module/promoted/page/PromotedRegister";
import { Form, Modal } from "antd";
const { confirm } = Modal;

import { useState } from "react";
import { deletePriority, getPriorityCharts } from "../api";
import { PriorityChartApi, usePriorityStore } from "../store";
import { ExclamationCircleFilled } from "@ant-design/icons";
import { useAlertStore } from "@/components/alerts/alertStore";

export const usePriorityHook = () => {
  const [form] = Form.useForm();
  const setPriorities = usePriorityStore((state) => state.setPriorities);
  const deletePriorities = usePriorityStore((state) => state.deletePriorities);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const setAlert = useAlertStore((state) => state.setAlert);
  const clearAlert = useAlertStore((state) => state.clearAlert);
  const [municipal, setMunicipal] = useState<MunicipalCatalog[]>([]);
  const [districts, setDistricts] = useState<MunicipalCatalog[]>([]);
  const [sections, setSections] = useState<MunicipalCatalog[]>([]);
  const [sectionsSelects, setSectionsSelects] = useState<MunicipalCatalog[]>(
    []
  );
  const handleGetPriorities = async () => {
    const { data } = await getPriorityCharts();
    const newData = data.map((item: any) => {
      return {
        id: item.id,
        name: item["Name"],
        promotedsByPriority: item.promoteds_by_priority_section.map(
          (prom: PriorityChartApi, i: number) => {
            return {
              x: prom.section_name,
              fillColor: i % 2 === 0 ? "#8f2a2b" : "#1C1C1C", // Change the color based on whether the index is even or odd
              strokeColor: i % 2 === 0 ? "#8f2a2b" : "#1C1C1C", // Change the color based on whether the index is even or odd
              y: prom.promoteds_count,
            };
          }
        ),
      };
    });
    setPriorities(newData);
  };

  const handleGetDistrictByMunicap = async (id: number) => {
    const { data } = await getDistrictByMunicipal({ municipal_id: id });
    setDistricts(data);
    setSections([]);
    form.setFieldsValue({ district_id: null, section_id: null });
  };
  const handleGetSectionsByDistrict = async (id: number) => {
    const { data } = await getSectionCatalogByDistrict({ district_id: id });
    setSections(data);
    form.setFieldsValue({ section_id: null });
  };
  const handleOpenModal = async () => {
    const data = await getMunicipalCatalog();
    setMunicipal(data);
    setSectionsSelects([]);
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
    form.resetFields();
    setSectionsSelects([]);
  };
  const handleSetSectionsSelects = (sections: MunicipalCatalog[]) => {
    setSectionsSelects(sections);
  };

  const handleDeletePriority = async (id: number) => {
    confirm({
      title: "¿Quieres eliminar esta priorida?",
      icon: <ExclamationCircleFilled />,
      content:
        "Si le das a Ok, se eliminará por completo y no habrá vuelta atrás",
      async onOk() {
        try {
          await deletePriority(id);
          deletePriorities(id);
          setAlert({
            type: "success",
            message: "Priorida eliminado correctamente",
            isShow: true,
          });
        } catch (error) {
          setAlert({
            type: "error",
            message: "Ocurrio un error al eliminar la priorida",
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
    form,
    sectionsSelects,
    municipal,
    districts,
    sections,
    isModalOpen,
    handleGetPriorities,
    handleGetDistrictByMunicap,
    handleGetSectionsByDistrict,
    handleOpenModal,
    handleCloseModal,
    handleSetSectionsSelects,
    handleDeletePriority
  };
};
