import { requestHttp } from "@/api/requestHttp";
import { Admin } from "./store";
export const getAllAdmin = async ({
  page,
  name,
  email,
  phone_number,
}: {
  page: string;
  phone_number?: string;
  email?: string;
  name?: string;
}) => {
  let params = "";
  if (phone_number) {
    params = params.concat(`&phone_number=${phone_number}`);
  }
  if (email) {
    params = params.concat(`&email=${email}`);
  }
  if (name) {
    params = params.concat(`&name=${name}`);
  }
  const resp = await requestHttp.get(`/api/admins?page=${page}${params}`);
  const data = await resp.data;
  return data;
};

export const postAdmin = async (data: FormData) => {
  const resp = await requestHttp.post("/api/admins", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return resp.data;
};

export const getAdmin = async (id: number) => {
  const resp = await requestHttp.get(`/api/admins/${id}`);
  return resp.data;
};

export const destroyAdmin = async (id: number) => {
  const resp = await requestHttp.delete(`/api/admins/${id}`);
  return resp.data;
};

export const putAdmin = async (data: Admin) => {
  const resp = await requestHttp.put(`/api/admins/${data.id}`, data);
  return resp.data;
};
