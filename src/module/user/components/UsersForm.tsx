import { Button, Col, Form, FormInstance, Row } from "antd";

import InputText from "@/components/InputText";
import { postUser, putUser } from "../api";
import { User, useUserStore } from "../store";
import { AnyObject } from "antd/es/_util/type";
import { useState } from "react";
import { useAlertStore } from "@/components/alerts/alertStore";
import AlertC from "@/components/alerts/AlertC";
interface UsersFormProps {
  form: FormInstance<User>;
  handleCloseModal?: () => void;
  isDetail?: boolean;
}

// eslint-disable-next-line react-refresh/only-export-components
const MODULE = "Usuario";
const UsersForm = ({
  form,
  handleCloseModal,
  isDetail = false,
}: UsersFormProps) => {
  const setUser = useUserStore((state) => state.setUser);
  const addUser = useUserStore((state) => state.addUser);
  const updateUser = useUserStore((state) => state.updateUser);
  const typeForm = useUserStore((state) => state.typeForm);
  const user = useUserStore((state) => state.user);
  const [profileImg, setProfileImg] = useState<File | null>(null);
  const setAlert = useAlertStore((state) => state.setAlert);
  const clearAlert = useAlertStore((state) => state.clearAlert);
  const [loading, setLoading] = useState(false);
  const onFinish = async (values: User) => {
    setLoading(true);
    let formData = new FormData();
    formData.append("name", values.name);
    formData.append("phone_number", values.phone_number);
    formData.append("email", values.email);
    formData.append("password", values.password);
    formData.append("password_confirmation", values.password_confirmation);
    if (profileImg) {
      formData.append("profile_img_path", profileImg);
    }
    switch (typeForm) {
      case "post":
        try {
          const { data } = await postUser(formData);
          addUser(data);
          setAlert({
            type: "success",
            message: `${MODULE} registrado correctamente`,
            isShow: true,
          });
        } catch (error) {
          setAlert({
            type: "error",
            message: `Ocurrio un error al registrar el ${MODULE}`,
            isShow: true,
          });
        }
        break;
      case "put":
        try {
          const { data } = await putUser(user);
          updateUser(data);
          setAlert({
            type: "success",
            message: `${MODULE} actualizado correctamente`,
            isShow: true,
          });
        } catch (error) {
          setAlert({
            type: "error",
            message: `Ocurrio un error al actualizar el ${MODULE}`,
            isShow: true,
          });
        }
        break;
      default:
        break;
    }
    setLoading(false);

    if (handleCloseModal) {
      form.resetFields();
      handleCloseModal();
    }
    setTimeout(() => {
      clearAlert();
    }, 3000);
  };

  const onChange = (changedValues: AnyObject) => {
    const key = Object.keys(changedValues)[0];
    setUser({ ...user, [key]: changedValues[key] });
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
            <AlertC />
          </Col>
          <Col span={24}>
            <InputText required label="Nombre Completo" name="name" />
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

          {typeForm === "post" && !isDetail && (
            <>
              <Col xs={{ span: 24 }} lg={{ span: 12 }}>
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
              <Col xs={{ span: 24 }} lg={{ span: 12 }}>
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
              <Col span={24} style={{ marginBottom: 20 }}>
                <label>Imagen de perfil</label>
                <input
                  type="file"
                  name="profile_img_path"
                  onChange={(e) => {
                    const file = e.target.files![0];
                    if (file.size > 50 * 1024 * 1024) {
                      // 50 MB
                      setAlert({
                        type: "error",
                        message: `La foto no debe pesar más de 50 MB`,
                        isShow: true,
                      });
                    } else {
                      setProfileImg(file);
                    }
                  }}
                  required
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
            loading={loading}
          >
            Registrar
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default UsersForm;
