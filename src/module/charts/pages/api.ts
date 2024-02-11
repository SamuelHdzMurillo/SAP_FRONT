import { requestHttp } from "@/api/requestHttp";

export const gettotalPromotedsByMunicipalitybydate = async () => {
    const resp = await requestHttp.get(`/api/municipals/districts/promoveds/count`);
    const data = resp.data;
    console.log(data);
    return data;
  };

  export const gettotalPromotedsBySections = async () => {
    const resp = await requestHttp.get(`/api/municipals/districts/promoveds/count`);
    const data = resp.data;
    console.log(data);
    return data;
  };

  export const gettotalCounts = async () => {
    const resp = await requestHttp.get(`/api/municipals/sections-with-promoved-count`);
    const data = resp.data;
    console.log(data);
    return data;
  };

  export const getPromotedsCountByMunicipality = async (promotorId) => {
    try {
      const resp = await requestHttp.get(`/api/promotors/${promotorId}/promoteds-count-by-municipality`);
      const data = resp.data;
      console.log(data);
      return data;
    } catch (error) {
      console.error('Error al obtener el conteo de promovidos por municipio:', error);
      // Aquí puedes manejar el error como prefieras
    }
  };