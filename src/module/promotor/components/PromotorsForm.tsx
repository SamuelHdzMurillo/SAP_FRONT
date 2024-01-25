import { Button, Col, Form, FormInstance, Row, Select } from "antd";

import InputText from "@/components/InputText";
import { postPromotor, putPromotor } from "../api";
import { Promotor, usePromotorStore } from "../store";
import { AnyObject } from "antd/es/_util/type";
import { useEffect, useState } from "react";
import { getMunicipalCatalog } from "@/api/CatalogHttp";
import { MunicipalCatalog } from "@/module/promoted/page/PromotedRegister";
interface PromotorsFormProps {
  form: FormInstance<Promotor>;
  handleCloseModal?: () => void;
}

// eslint-disable-next-line react-refresh/only-export-components

const PromotorsForm = ({ form, handleCloseModal }: PromotorsFormProps) => {
  const setPromotor = usePromotorStore((state) => state.setPromotor);
  const addPromotor = usePromotorStore((state) => state.addPromotor);
  const updatePromotor = usePromotorStore((state) => state.updatePromotor);
  const typeForm = usePromotorStore((state) => state.typeForm);
  const promotor = usePromotorStore((state) => state.promotor);
  const [profileImg, setProfileImg] = useState<File | null>(null);
  const [inePath, setInePath] = useState<File | null>(null);
  const [municipal, setMunicipal] = useState<MunicipalCatalog[]>([]);
  useEffect(() => {
    const handleGetMunicipal = async () => {
      const data = await getMunicipalCatalog();
      setMunicipal(data);
    };
    handleGetMunicipal();
  }, []);
  const onFinish = async (values: Promotor) => {
    let formData = new FormData();
    formData.append("name", values.name);
    formData.append("phone_number", values.phone_number);
    formData.append("position", values.position);
    formData.append("email", values.email);
    formData.append("password", values.password);
    formData.append("municipal_id", `${values.municipal_id}`);
    formData.append("password_confirmation", values.password_confirmation);
    if (profileImg) {
      formData.append("profile_path", profileImg);
    }
    if (inePath) {
      formData.append("ine_path", inePath);
    }
    switch (typeForm) {
      case "post":
        (async () => {
          const { data } = await postPromotor(formData);
          addPromotor(data);
        })();
        break;
      case "put":
        (async () => {
          const { data } = await putPromotor(promotor);
          updatePromotor(data);
        })();
        break;
      case "password":
        console.log("password");
        break;
      default:
        break;
    }
    form.resetFields();
    handleCloseModal();
  };

  const onChange = (changedValues: AnyObject) => {
    const key = Object.keys(changedValues)[0];
    setPromotor({ ...promotor, [key]: changedValues[key] });
  };

  return (
    <div className="form-register">
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
          <Col span={24}>
            <InputText required label="Nombre Completo" name="name" />
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
            <InputText required label="Posición" name="position" />
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

          {typeForm === "post" && (
            <>
              <Col span={12}>
                <InputText
                  required
                  label="Contraseña"
                  name="password"
                  hasFeedback
                  type={"password"}
                  rules={[
                    {
                      min: 8,
                      message: "¡Ups! Solo se permiten 8 caracteres.",
                    },
                  ]}
                />
              </Col>
              <Col span={12}>
                <InputText
                  required
                  label="Confirmar Contraseña"
                  name="password_confirmation"
                  hasFeedback
                  type={"password"}
                  dependencies={["password"]}
                  rules={[
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue("password") === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(
                          new Error(
                            "La nueva contraseña que ingresaste no coincide."
                          )
                        );
                      },
                    }),
                  ]}
                />
              </Col>
              <Col span={24}>
                <input
                  type="file"
                  name="profile_img_path"
                  onChange={(e) => setProfileImg(e.target.files![0])}
                />
              </Col>
              <Col span={24}>
                <input
                  type="file"
                  name="ine_path"
                  onChange={(e) => setInePath(e.target.files![0])}
                />
              </Col>
            </>
          )}
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

export default PromotorsForm;
