import { Button, Col, Form, Row, Select } from "antd";

import InputText from "@/components/InputText";
import { getPromoted, postPromoted, putPromoted } from "../api";
import { Promoted, usePromotedStore } from "../store";
import { AnyObject } from "antd/es/_util/type";
import { useEffect, useState } from "react";
import {
  getDistrictByMunicipal,
  getMunicipalCatalog,
  getSectionCatalogByDistrict,
} from "@/api/CatalogHttp";
import "../promoted.css";
import { useNavigate, useParams } from "react-router-dom";

// eslint-disable-next-line react-refresh/only-export-components
interface MunicipalCatalog {
  value: number;
  label: string;
}
interface position {
  latitude: string;
  longitude: string;
}
const PromotedRegister = () => {
  const [form] = Form.useForm();
  const params = useParams<{ id: string }>();
  // console.log(params)
  const setPromoted = usePromotedStore((state) => state.setPromoted);
  // const addPromoted = usePromotedStore((state) => state.addPromoted);
  const setTypeForm = usePromotedStore((state) => state.setTypeForm);
  const navigate = useNavigate()
  // const updatePromoted = usePromotedStore((state) => state.updatePromoted);
  const typeForm = usePromotedStore((state) => state.typeForm);
  const promoted = usePromotedStore((state) => state.promoted);
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
        console.log(data);
        setTypeForm("put");
        setPromoted({
          ...promoted,
          id: data.id,
        });
        form.setFieldsValue(data);
      })();
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
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  const onFinish = async (values: Promoted) => {
    console.log(values);
    const { latitude, longitude } = position;
    const newValues = {
      ...promoted,
      latitude,
      longitude,
      promotor_id: 1,
    };
    switch (typeForm) {
      case "post":
        (async () => {
          const { data } = await postPromoted(newValues);
          
          // addPromoted(data);
        })();
        break;
      case "put":
        (async () => {
          const { data } = await putPromoted(promoted);
          // updatePromoted(data);
        })();
        break;
      case "password":
        console.log("password");
        break;
      default:
        break;
    }
    navigate('/promovidos')
    form.resetFields();
  };

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
  return (
    <div className="form-register">
      <h1>Registro de Promovidos</h1>
      <Form
        form={form}
        name="basic"
        style={{
          maxWidth: 800,
          width: "100%",
        }}
        layout="vertical"
        onFinish={onFinish}
        autoComplete="off"
        onValuesChange={(e) => onChange(e)}
      >
        <Row gutter={[10, 10]}>
          <Col span={12}>
            <InputText required label="Nombre (s)" name="name" />
          </Col>
          <Col span={12}>
            <InputText required label="Apellidos" name="last_name" />
          </Col>
          <Col span={12}>
            <InputText
              label="Número de contacto"
              name="phone_number"
              required
              rules={[
                {
                  max: 10,
                  message: "¡Ups! Solo se permiten 10 caracteres.",
                },
                {
                  min: 10,
                  message: "¡Ups! Solo se permiten 10 caracteres.",
                },
                {
                  pattern: /^[0-9]+$/,
                  message: "¡Ups! Solo se permiten números.",
                },
              ]}
            />
          </Col>
          <Col span={12}>
            <InputText
              required
              label="Correo Electrónico"
              name="email"
              rules={[
                {
                  type: "email",
                  message: "No es un correo electrónico válido",
                },
              ]}
            />
          </Col>
          <Col span={12}>
            <InputText required label="Dirección" name="adress" />
          </Col>
          <Col span={12}>
            <InputText required label="Llave Electoral" name="electoral_key" />
          </Col>
          <Col span={12}>
            <InputText required label="CURP" name="curp" />
          </Col>
          <Col span={12}>
            <Form.Item
              name="municipal_id"
              label="Municipio"
              rules={[
                {
                  required: true,
                  message: "¡Ups! Olvidaste completar este campo.",
                },
              ]}
            >
              <Select
                placeholder="Selecciona tu municipio"
                options={municipal}
                onChange={(e) => {
                  handleGetDistrictByMunicap(e);
                }}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="district_id"
              label="Distrito"
              rules={[
                {
                  required: true,
                  message: "¡Ups! Olvidaste completar este campo.",
                },
              ]}
            >
              <Select
                placeholder="Selecciona un distrito"
                options={districts}
                onChange={(e) => {
                  handleGetSectionsByDistrict(e);
                }}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="section_id"
              label="Sección"
              rules={[
                {
                  required: true,
                  message: "¡Ups! Olvidaste completar este campo.",
                },
              ]}
            >
              <Select
                placeholder="Selecciona tu municipio"
                options={sections}
              />
            </Form.Item>
          </Col>
          <Col span={24}></Col>
        </Row>
        <Form.Item style={{ display: "flex", justifyContent: "end" }}>
          <Button type="primary" htmlType="submit">
            Registrar
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default PromotedRegister;
