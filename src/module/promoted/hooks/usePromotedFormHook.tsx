import { Form } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { Promoted, usePromotedStore } from "../store";
import { useAuthStore } from "@/module/auth/auth";
import { useAlertStore } from "@/components/alerts/alertStore";
import { useEffect, useState } from "react";
import { MunicipalCatalog } from "../page/PromotedRegister";
import {
  getDistrictByMunicipal,
  getMunicipalCatalog,
  getSectionCatalogByDistrict,
} from "@/api/CatalogHttp";
import { getPromoted, postPromoted, putPromoted } from "../api";
import { AnyObject } from "yup";
const MODULE = "Promovido";
interface position {
  latitude: string;
  longitude: string;
}
export const usePromotedFormHook = () => {
  const [form] = Form.useForm();
  const params = useParams<{ id: string }>();
  const setPromoted = usePromotedStore((state) => state.setPromoted);
  const authStore = useAuthStore((state) => state.user);
  const userType = useAuthStore((state) => state.user_type);
  const promoted = usePromotedStore((state) => state.promoted);
  const setTypeForm = usePromotedStore((state) => state.setTypeForm);
  // const alert = useAlertStore((state) => state.alert);
  const setAlert = useAlertStore((state) => state.setAlert);
  const clearAlert = useAlertStore((state) => state.clearAlert);
  const [loading, setLoading] = useState(false);
  const [municipal, setMunicipal] = useState<MunicipalCatalog[]>([]);
  const [districts, setDistricts] = useState<MunicipalCatalog[]>([]);
  const [sections, setSections] = useState<MunicipalCatalog[]>([]);
  const [position, setPosition] = useState<position>({
    latitude: "0",
    longitude: "0",
  });
  useEffect(() => {
    const handleGetMunicipal = async () => {
      const data = await getMunicipalCatalog();
      setMunicipal(data);
    };
    if (params.id) {
      (async () => {
        const { data } = await getPromoted({ id: params.id });
        setTypeForm("put");
        setPromoted({
          ...promoted,
          id: data.id,
        });
        console.log(data);
        handleGetDistrictByMunicap(data.municipal_id);
        handleGetSectionsByDistrict(data.district_id);
        form.setFieldsValue(data);
      })();
    } else {
      setTypeForm("post");
      form.resetFields();
    }
    handleGetMunicipal();
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position: GeolocationPosition) => {
          setPosition({
            latitude: `${position.coords.latitude}`,
            longitude: `${position.coords.longitude}`,
          });
        },
        (error: GeolocationPositionError) => {
          console.error(`Error Code = ${error.code} - ${error.message}`);
        },
        {
          enableHighAccuracy: true,
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);
  const navigate = useNavigate();
  // const updatePromoted = usePromotedStore((state) => state.updatePromoted);
  const typeForm = usePromotedStore((state) => state.typeForm);
  const onChange = (changedValues: AnyObject) => {
    const key = Object.keys(changedValues)[0];
    setPromoted({ ...promoted, [key]: changedValues[key] });
  };

  const handleGetDistrictByMunicap = async (id: number) => {
    const { data } = await getDistrictByMunicipal({ municipal_id: id });
    setDistricts(data);
  };
  const handleGetSectionsByDistrict = async (id: number) => {
    const { data } = await getSectionCatalogByDistrict({ district_id: id });
    setSections(data);
  };
  const onFinish = async (values: Promoted) => {
    setLoading(true);
    const { latitude, longitude } = position;
    const newValues: Promoted = {
      ...promoted,
      latitude,
      longitude,
    };
    if (userType === "promotor") {
      newValues.promotor_id = authStore.id;
    }
    const formData = new FormData();
    for (const key in newValues) {
      if (Object.prototype.hasOwnProperty.call(newValues, key)) {
        formData.append(key, `${newValues[key as keyof Promoted]}`);
      }
    }
    switch (typeForm) {
      case "post":
        try {
          await postPromoted(formData);
          setAlert({
            type: "success",
            message: `${MODULE} registrado correctamente`,
            isShow: true,
          });
        } catch (error) {
          setAlert({
            type: "error",
            message: "Ocurrio un error al registrar el promovido",
            isShow: true,
          });
        }
        break;
      case "put":
        try {
          await putPromoted(promoted);
          setAlert({
            type: "success",
            message: "Promovido actualizado correctamente",
            isShow: true,
          });
        } catch (error) {
          setAlert({
            type: "error",
            message: "Ocurrio un error al actualizar el promovido",
            isShow: true,
          });
        }
        break;
      default:
        break;
    }
    setLoading(false);
    form.resetFields();
    setTimeout(() => {
      clearAlert();
    }, 3000);
    navigate("/promovidos");
  };

  return {
    userType,
    params,
    form,
    promoted,
    loading,
    municipal,
    districts,
    sections,
    handleGetDistrictByMunicap,
    handleGetSectionsByDistrict,
    onFinish,
    onChange,
  };
};
