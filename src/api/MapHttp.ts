import { requestHttp } from "./requestHttp";

export const getPromoteds = async () => {
  const response = await requestHttp.get("/api/promoteds/map");
  const data = response.data;
  console.log(data);
  return data
};
