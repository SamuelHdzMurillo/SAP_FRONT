import { requestHttp } from "@/api/requestHttp";
export const getMuncipal = async (id: number) => {
  const resp = await requestHttp.get(`/api/municipal/${id}`);
  const data = await resp.data;
  return data;
};

export const getCountPromotedsMuncipals = async (id: string) => {
  const resp = await requestHttp.get(`/api/municipal/${id}/promoted-count`);
  const data = await resp.data;
  return data;
};
