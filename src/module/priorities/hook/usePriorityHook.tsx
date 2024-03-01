import {
  getDistrictByMunicipal,
  getMunicipalCatalog,
  getSectionCatalogByDistrict,
} from "@/api/CatalogHttp";
import { MunicipalCatalog } from "@/module/promoted/page/PromotedRegister";
import { Form } from "antd";
import { useState } from "react";
import { getPriorityCharts } from "../api";
import { PriorityChartApi, usePriorityStore } from "../store";

export const usePriorityHook = () => {
  const [form] = Form.useForm();
  const setPriorities = usePriorityStore((state) => state.setPriorities);
  const [isModalOpen, setIsModalOpen] = useState(false);
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
          (prom: PriorityChartApi) => {
            return {
              x: prom.section_name,
              y: prom.promoteds_count,
            };
          }
        ),
      };
    });
    setPriorities(newData);
    console.log(newData, "newData");
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
  };
};
