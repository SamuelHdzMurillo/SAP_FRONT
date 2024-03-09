import { requestHttp } from "@/api/requestHttp";

export const getAllDistricts = async ({
  page,
  number,
  municipal,
}: {
  page: string;
  number?: number;
  municipal?: string;
}) => {
  let params = "";
  if (number) {
    params = `&number=${number}`;
  }
  if (municipal) {
    params = `&municipal=${municipal}`;
  }
  const resp = await requestHttp.get(`/api/districts?page=${page}${params}`);
  const data = await resp.data;
  return data;
};

export const getDistrict = async (id: number) => {
  const resp = await requestHttp.get(`/api/districts/${id}`);
  const data = await resp.data;
  return data;
};

export const getCountPromotedsDistricts = async (id: string) => {
  const resp = await requestHttp.get(`/api/districts/${id}/promoted-count`);
  const data = await resp.data;
  return data;
};
