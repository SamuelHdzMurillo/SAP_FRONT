import { requestHttp } from "./requestHttp";

export const getSectionCatalog = async () => {
  const resp = await requestHttp.get(`/api/catalog/section`);
  const data = await resp.data;
  return data;
};
export const getDistrictCatalog = async () => {
  const resp = await requestHttp.get(`/api/catalog/district`);
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
