import { Form } from "antd";
import { useState } from "react";
import { useMunicipalStore } from "../store";
import { getCountPromotedsMuncipals, getMuncipal } from "../api";
// import { DistrictAType } from "../page/DistrictAHome";
export const useMunicipalC = () => {
  const setMunicipal = useMunicipalStore((state) => state.setMunicipal);
  const [municipalSelect, setMunicipalSelect] = useState<string>("");
  const [countPromoted, setCountPromoted] = useState<number>(0);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false); // eslint-disable-line

  const handleGetMunicipal = async (id: number) => {
    setLoading(true);
    const data = await getMuncipal(id);
    console.log(data);
    setMunicipal(data);
    setLoading(false);
    // setDistricts()
  };
  const handleSelectDistrict = async (id: string) => {
    setMunicipalSelect("");
    await handleCountPromoteds(id);
    await handleGetMunicipal(parseInt(id));
    setMunicipalSelect(id);
  };
  const handleCountPromoteds = async (id: string) => {
    const data = await getCountPromotedsMuncipals(id);
    setCountPromoted(data.promoted_count);
  };
  return {
    municipalSelect,
    form,
    loading,
    countPromoted,
    setLoading,
    handleGetMunicipal,
    handleCountPromoteds,
    handleSelectDistrict,
  };
};
