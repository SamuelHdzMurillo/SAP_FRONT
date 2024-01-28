import { Alert, Button, Input, Layout } from "antd";
import { Content } from "antd/es/layout/layout";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useState } from "react";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import logo from "@/assets/imgs/HD_LOGOTIPOS_V_S.png";
import { postLogin } from "../api";
import { useAuthStore } from "../auth";

const LoginPage = () => {
  //   const dispatch = useDispatch();
  const navigate = useNavigate();
  const [message, setMessage] = useState<string>("");
  const setToken = useAuthStore((state) => state.setToken);
  const setUserData = useAuthStore((state) => state.setUserData);
  const setUserType = useAuthStore((state) => state.setUserType);
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
  }>({});

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Ingrese un correo válido")
      .required("Ingrese un correo electrónico"),
    password: Yup.string().required("Ingrese una contraseña"),
  });

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await validationSchema.validate(loginData, { abortEarly: false });
      const data = await postLogin(loginData);
      console.log(data);
      if (data.message) {
        setMessage(data.message);
        return;
      }
      setToken(data.token);
      setUserData(data.user);
      setUserType(data.user_type);
      navigate("/");
      //   // await onFinish(initialValues);
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const validationErrors: { [key: string]: string } = {};
        error.inner.forEach((err) => {
          validationErrors[err.path] = err.message;
        });
        setErrors(validationErrors);
      } else {
        console.error(error);
      }
    }
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <Layout className="bg-login">
      {/* <Header style={headerStyle}>Header</Header> */}
      <Content
        style={{
          height: "100vh",
          width: "100%",
          display: "flex",
        }}
      >
        <div
          style={{
            padding: 24,
            margin: "auto",
            width: "360px",
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            border: "1px solid #ccc",
            boxShadow: "0px 4px 8px 0px rgba(0, 0, 0, 0.2)",
          }}
        >
          <img
            src={logo}
            style={{ margin: "0 auto 50px auto", maxWidth: "320px" }}
            alt=""
            srcSet=""
          />
          <form className="loginForm" onSubmit={(e) => handleLogin(e)}>
            <div
              style={{
                marginBottom: "20px",
              }}
            >
              {message && (
                <Alert
                  message={message}
                  type="error"
                  style={{ marginBottom: 20 }}
                />
              )}
              <Input
                className="login-input"
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Ingrese su correo electronico"
                name="email"
                value={loginData.email}
                onChange={(e) => handleChange(e)}
              />
              {errors.email && (
                <Alert
                  message={errors.email}
                  type="error"
                  style={{ margin: "5px auto 20px auto" }}
                />
              )}
            </div>
            <div
              style={{
                marginBottom: "20px",
              }}
            >
              <Input.Password
                className="login-input"
                prefix={<LockOutlined />}
                placeholder="Ingrese su password"
                name="password"
                value={loginData.password}
                onChange={(e) => handleChange(e)}
              />
              {errors.password && (
                <Alert
                  message={errors.password}
                  type="error"
                  style={{ margin: "5px auto 20px auto" }}
                />
              )}
            </div>

            <Button
              style={{
                width: "100%",
                maxWidth: "360px",
                margin: "0 auto 20px auto",
                backgroundColor: "#1C1C1C",
              }}
              className="btn-login"
              type="primary"
              htmlType="submit"
            >
              Ingresar{" "}
            </Button>
          </form>
        </div>
      </Content>
    </Layout>
  );
};

export default LoginPage;
