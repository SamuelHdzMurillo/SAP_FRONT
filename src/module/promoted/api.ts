import { requestHttp } from "@/api/requestHttp";
import { User } from "./store";
export const getAllUser = async ({ page }: { page: string }) => {
  const resp = await requestHttp.get(`/api/superAdmins?page=${page}`);
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

export const destroyUser = async (id: number) => {
  const resp = await requestHttp.delete(`/api/superAdmins/${id}`);
  return resp.data;
};

export const putUser = async (data: User) => {
  const resp = await requestHttp.put(`/api/superAdmins/${data.id}`, data);
  return resp.data;
};
