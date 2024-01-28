import InputText from "@/components/InputText";
import { Col, Row, Form, Select, Button, FormInstance } from "antd";
import { useEffect, useState } from "react";
import { AnyObject } from "yup";
import { MunicipalCatalog } from "../page/PromotedRegister";
import {
  getDistrictByMunicipal,
  getMunicipalCatalog,
  getSectionCatalogByDistrict,
} from "@/api/CatalogHttp";
import { Promoted, usePromotedStore } from "../store";
import { getPromoted, postPromoted, putPromoted } from "../api";
import { useNavigate, useParams } from "react-router-dom";
interface PromotorsFormProps {
  form: FormInstance<Promoted>;
  isTitle?: boolean;
}
interface position {
  latitude: string;
  longitude: string;
}
const PromotedForm = ({ form, isTitle = true }: PromotorsFormProps) => {
  const params = useParams<{ id: string }>();
  const setPromoted = usePromotedStore((state) => state.setPromoted);
  const promoted = usePromotedStore((state) => state.promoted);
  const setTypeForm = usePromotedStore((state) => state.setTypeForm);
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
          await postPromoted(newValues);

          // addPromoted(data);
        })();
        break;
      case "put":
        (async () => {
          await putPromoted(promoted);
          // updatePromoted(data);
        })();
        break;
      default:
        break;
    }
    navigate("/promovidos");
    form.resetFields();
  };
  return (
    <div className="form-register">
      {isTitle && <h1>Registro de Promovidos</h1>}
      {/* <h1>Registro de Promovidos</h1> */}
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
          <Col xs={{ span: 24 }} lg={{ span: 12 }}>
            <InputText required label="Nombre (s)" name="name" />
          </Col>
          <Col xs={{ span: 24 }} lg={{ span: 12 }}>
            <InputText required label="Apellidos" name="last_name" />
          </Col>
          <Col xs={{ span: 24 }} lg={{ span: 12 }}>
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
          <Col xs={{ span: 24 }} lg={{ span: 12 }}>
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
          <Col xs={{ span: 24 }} lg={{ span: 12 }}>
            <InputText required label="Dirección" name="adress" />
          </Col>
          <Col xs={{ span: 24 }} lg={{ span: 12 }}>
            <InputText required label="Llave Electoral" name="electoral_key" />
          </Col>
          <Col xs={{ span: 24 }} lg={{ span: 12 }}>
            <InputText required label="CURP" name="curp" />
          </Col>
          <Col xs={{ span: 24 }} lg={{ span: 12 }}>
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
          <Col xs={{ span: 24 }} lg={{ span: 12 }}>
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
          <Col xs={{ span: 24 }} lg={{ span: 12 }}>
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
          <Button
            style={{
              backgroundColor: "#1C1C1C",
            }}
            type="primary"
            htmlType="submit"
          >
            Registrar
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default PromotedForm;
