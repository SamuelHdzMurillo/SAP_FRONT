import { requestHttp } from "./requestHttp";

interface Params {
  district_id?: number;
  municipal_id?: number;
}

export const getSectionCatalogByDistrict = async ({ district_id }: Params) => {
  const resp = await requestHttp.get(`/api/districts/${district_id}/sections`);
  const data = await resp.data;
  return data;
};
export const getDistrictByMunicipal = async ({ municipal_id }: Params) => {
  const resp = await requestHttp.get(
    `/api/municipals/${municipal_id}/districts`
  );
  const data = await resp.data;
  return data;
};
export const getMunicipalCatalog = async () => {
  const resp = await requestHttp.get(`/api/catalog/municipal`);
  const data = await resp.data.data;
  const newData = data.map((item: any) => {
    return {
      value: item.id,
      label: item.name,
    };
  });
  return newData;
};
