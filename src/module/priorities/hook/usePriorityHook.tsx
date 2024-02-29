import {
  getDistrictByMunicipal,
  getMunicipalCatalog,
  getSectionCatalogByDistrict,
} from "@/api/CatalogHttp";
import { MunicipalCatalog } from "@/module/promoted/page/PromotedRegister";
import { Form } from "antd";
import { useState } from "react";

export const usePriorityHook = () => {
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [municipal, setMunicipal] = useState<MunicipalCatalog[]>([]);
  const [districts, setDistricts] = useState<MunicipalCatalog[]>([]);
  const [sections, setSections] = useState<MunicipalCatalog[]>([]);
  const handleGetDistrictByMunicap = async (id: number) => {
    const { data } = await getDistrictByMunicipal({ municipal_id: id });
    setDistricts(data);
    setSections([]);
    form.setFieldsValue({ district_id: null, section_id: null});
  };
  const handleGetSectionsByDistrict = async (id: number) => {
    const { data } = await getSectionCatalogByDistrict({ district_id: id });
    setSections(data);
    
  };
  const handleOpenModal = async () => {
    const data = await getMunicipalCatalog();
    setMunicipal(data);

    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
    form.resetFields();
  };
  return {
    form,
    municipal,
    districts,
    sections,
    isModalOpen,
    handleGetDistrictByMunicap,
    handleGetSectionsByDistrict,
    handleOpenModal,
    handleCloseModal,
  };
};
