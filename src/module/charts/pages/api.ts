import { requestHttp } from "@/api/requestHttp";

export const gettotalPromotedsByMunicipalitybydate = async () => {
    const resp = await requestHttp.get(`/api/municipals/districts/promoveds/count`);
    const data = resp.data;
    console.log(data);
    return data;
  };