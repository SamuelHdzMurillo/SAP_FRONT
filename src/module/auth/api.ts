// import { requestHttp } from "./requestHttp";
import { requestHttp } from "@/api/requestHttp";

export const postLogin = async (dataUser: {
  email: string;
  password: string;
}) => {
  try {
    const resp = await requestHttp.post(`/api/login`, dataUser);
    const data = await resp.data;
    const { token, user, user_type } = data;
    const userAuth = {
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
      phone_number: user.phone_number,
      profile_img_path: user.profile_img_path ?? user.profile_path ?? "",
    };
    localStorage.setItem("token", token);
    localStorage.setItem("userAuth", JSON.stringify(userAuth));
    localStorage.setItem("user_type", user_type);
    return {
      token,
      user_type,
      user: userAuth,
    };
  } catch (error) {
    if (error.response) {
      // El servidor respondió con un estado de error
      console.error(error.response.data);
      return error.response.data;
    } else if (error.request) {
      // La solicitud fue hecha pero no se recibió ninguna respuesta
      console.error(error.request);
      // alert("No se recibió ninguna respuesta del servidor.");
    } else {
      // Algo sucedió en la configuración de la solicitud que provocó un error
      console.error("Error", error.message);
      // alert("Ocurrió un error al hacer la solicitud: " + error.message);
    }
    throw error;
  }
};
export const postLogout = async () => {
  const resp = await requestHttp.post(`/api/logout`);
  const data = await resp.data;
  localStorage.removeItem("token");
  localStorage.removeItem("user_type");
  localStorage.removeItem("userAuth");
  return data;
};
