import { requestHttp } from "@/api/requestHttp";

export const getSection = async (id: number) => {
  const resp = await requestHttp.get(`/api/sections/${id}`);
  const data = await resp.data;
  return data;
};

export const getCountPromotedsSections = async (id: string) => {
  const resp = await requestHttp.get(`/api/sections/${id}/promoted-count`);
  const data = await resp.data;
  return data;
};
