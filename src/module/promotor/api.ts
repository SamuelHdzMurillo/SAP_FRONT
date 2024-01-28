import { requestHttp } from "@/api/requestHttp";
import { Promotor } from "./store";
export const getAllPromotor = async ({ page }: { page: string }) => {
  const resp = await requestHttp.get(`/api/promotores?page=${page}`);
  const data = await resp.data;
  return data;
};

export const postPromotor = async (data: FormData) => {
  const resp = await requestHttp.post("/api/promotores", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return resp.data;
};

export const getPromotor = async (id: number) => {
  const resp = await requestHttp.get(`/api/promotores/${id}`);
  const data = await resp.data;
  return data;
};

export const destroyPromotor = async (id: number) => {
  const resp = await requestHttp.delete(`/api/promotores/${id}`);
  return resp.data;
};

export const putPromotor = async (data: Promotor) => {
  const resp = await requestHttp.put(`/api/promotores/${data.id}`, data);
  return resp.data;
};

export const postProblem = async (data: FormData) => {
  const resp = await requestHttp.post("/api/problems", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return resp.data;
};
