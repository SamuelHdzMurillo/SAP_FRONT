import { requestHttp } from "@/api/requestHttp";
const MODULE = "problems";
export const getAllProblem = async ({ page }: { page: string }) => {
  const resp = await requestHttp.get(`/api/${MODULE}?page=${page}`);
  const data = await resp.data;
  return data;
};

export const getProblem = async ({ id }: { id: string }) => {
  const resp = await requestHttp.get(`/api/${MODULE}/${id}`);
  const data = await resp.data;
  return data;
};

export const destroyProblem = async ({ id }: { id: number }) => {
  const resp = await requestHttp.delete(`/api/${MODULE}/${id}`);
  const data = await resp.data;
  return data;
};
