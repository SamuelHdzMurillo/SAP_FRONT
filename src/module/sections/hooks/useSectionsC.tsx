import { Form } from "antd";
import { useSectionStore } from "../store";
import { useState } from "react";
import { getCountPromotedsSections, getSection } from "../api";
// import { SectionAType } from "../page/SectionAHome";
export const useSectionsC = () => {
  const setSection = useSectionStore((state) => state.setSection);
  const [sectionSelect, setSectionSelect] = useState<string>("");
  const [countPromoted, setCountPromoted] = useState<number>(0);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleGetSection = async (id: number) => {
    setLoading(true);
    const data = await getSection(id);
    setSection(data);
    setLoading(false);
  };
  const handleSelectSection = async (id: string) => {
    setSectionSelect("");
    await handleGetSection(parseInt(id));
    await handleCountPromoteds(id);
    setSectionSelect(id);
  };
  const handleCountPromoteds = async (id: string) => {
    const data = await getCountPromotedsSections(id);
    setCountPromoted(data.promoted_count);
  };
  return {
    sectionSelect,
    form,
    loading,
    countPromoted,
    setLoading,
    handleGetSection,
    handleCountPromoteds,
    handleSelectSection,
  };
};
