import {
  getDistrictByMunicipal,
  getMunicipalCatalog,
  getSectionCatalogByDistrict,
} from "@/api/CatalogHttp";
import { MunicipalCatalog } from "@/module/promoted/page/PromotedRegister";
import { Form } from "antd";
import { useState } from "react";
import { getPriorityCharts } from "../api";

export const usePriorityHook = () => {
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [municipal, setMunicipal] = useState<MunicipalCatalog[]>([]);
  const [districts, setDistricts] = useState<MunicipalCatalog[]>([]);
  const [sections, setSections] = useState<MunicipalCatalog[]>([]);
  const [sectionsSelects, setSectionsSelects] = useState<MunicipalCatalog[]>(
    []
  );
  const handleGetPriorities = async () => {
    // Your code here
    const { data } = await getPriorityCharts();
    console.log(data, "data");
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
    handleGetPriorities,
    form,
    sectionsSelects,
    municipal,
    districts,
    sections,
    isModalOpen,
    handleGetDistrictByMunicap,
    handleGetSectionsByDistrict,
    handleOpenModal,
    handleCloseModal,
    handleSetSectionsSelects,
  };
};
