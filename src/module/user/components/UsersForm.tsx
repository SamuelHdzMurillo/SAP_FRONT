import { Button, Col, Form, FormInstance, Row } from "antd";

import InputText from "@/components/InputText";
import { postUser, putUser } from "../api";
import { User, useUserStore } from "../store";
import { AnyObject } from "antd/es/_util/type";
interface UsersFormProps {
  form: FormInstance<User>;
}

// eslint-disable-next-line react-refresh/only-export-components

const UsersForm = ({ form }: UsersFormProps) => {
  const setUser = useUserStore((state) => state.setUser);
  const addUser = useUserStore((state) => state.addUser);
  const updateUser = useUserStore((state) => state.updateUser);
  const typeForm = useUserStore((state) => state.typeForm);
  const user = useUserStore((state) => state.user);
  const onFinish = async (values: User) => {
    switch (typeForm) {
      case "post":
        (async () => {
          const { data } = await postUser(values);
          addUser(data);
        })();
        break;
      case "put":
        (async () => {
          const { data } = await putUser(user);
          updateUser(data);
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
    setUser({ ...user, [key]: changedValues[key] });
  };

  return (
    <div className="form-register">
      {typeForm}
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
            </>
          )}
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

export default UsersForm;
