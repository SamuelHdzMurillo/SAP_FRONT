import { Button, Col, Form, Row, Select } from "antd";

import InputText from "@/components/InputText";
import { postUser, putUser } from "../api";
import { Promoted, usePromotedStore } from "../store";
import { AnyObject } from "antd/es/_util/type";
import { useEffect, useState } from "react";
import { getMunicipalCatalog } from "@/api/CatalogHttp";
const { Option } = Select;
import "../promoted.css";

// eslint-disable-next-line react-refresh/only-export-components
interface MunicipalCatalog {
  value: number;
  label: string;
}
const PromotedRegister = () => {
  const [form] = Form.useForm();
  const setPromoted = usePromotedStore((state) => state.setPromoted);
  const addPromoted = usePromotedStore((state) => state.addPromoted);
  const updatePromoted = usePromotedStore((state) => state.updatePromoted);
  const typeForm = usePromotedStore((state) => state.typeForm);
  const promoted = usePromotedStore((state) => state.promoted);
  const [municipal, setMunicipal] = useState<MunicipalCatalog[]>([]);
  useEffect(() => {
    const handleGetMunicipal = async () => {
      const data = await getMunicipalCatalog();
      setMunicipal(data);
    };
    handleGetMunicipal();
  }, []);

  const onFinish = async (values: Promoted) => {
    switch (typeForm) {
      case "post":
        (async () => {
          // const { data } = await postUser(values);
          // addPromoted(data);
        })();
        break;
      case "put":
        (async () => {
          const { data } = await putUser(promoted);
          updatePromoted(data);
        })();
        break;
      case "password":
        console.log("password");
        break;
      default:
        break;
    }
    form.resetFields();
  };

  const onChange = (changedValues: AnyObject) => {
    const key = Object.keys(changedValues)[0];
    setPromoted({ ...promoted, [key]: changedValues[key] });
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
              <Select placeholder="Selecciona tu municipio">
                <Option value="Zhejiang">Zhejiang</Option>
                <Option value="Jiangsu">Jiangsu</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="seccion_id"
              label="Sección"
              rules={[
                {
                  required: true,
                  message: "¡Ups! Olvidaste completar este campo.",
                },
              ]}
            >
              <Select placeholder="Selecciona tu municipio">
                <Option value="Zhejiang">Zhejiang</Option>
                <Option value="Jiangsu">Jiangsu</Option>
              </Select>
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
