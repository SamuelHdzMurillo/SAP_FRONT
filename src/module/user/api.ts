import { requestHttp } from "@/api/requestHttp";
import { User } from "./store";
export const getAllUser = async ({
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
  const resp = await requestHttp.get(`/api/superAdmins?page=${page}?${params}`);
  const data = await resp.data;
  return data;
};

export const postUser = async (data: FormData) => {
  const resp = await requestHttp.post("/api/superAdmins", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return resp.data;
};

export const getUser = async (id: number) => {
  const resp = await requestHttp.get(`/api/superAdmins/${id}`);
  return resp.data;
};

export const destroyUser = async (id: number) => {
  const resp = await requestHttp.delete(`/api/superAdmins/${id}`);
  return resp.data;
};

export const putUser = async (data: User) => {
  const resp = await requestHttp.put(`/api/superAdmins/${data.id}`, data);
  return resp.data;
};
