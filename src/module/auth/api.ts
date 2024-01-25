// import { requestHttp } from "./requestHttp";

import { requestHttp } from "@/api/requestHttp";

export const postLogin = async (dataUser: {
  email: string;
  password: string;
}) => {
  const resp = await requestHttp.post(`/api/login`, dataUser);
  const data = await resp.data;
  console.log(data)
  localStorage.setItem("token", data.token);
  localStorage.setItem("userAuth", JSON.stringify(data.user));
  localStorage.setItem("user_type",data.user_type);
  return data;
};
export const postLogout = async () => {
  const resp = await requestHttp.post(`/api/logout`);
  const data = await resp.data;
  localStorage.removeItem("token");
  localStorage.removeItem("user_type");
  localStorage.removeItem("userAuth");
  return data;
};
