import { requestHttp } from "@/api/requestHttp";

export const gettotalPromotedsByMunicipalitybydate = async () => {
  const resp = await requestHttp.get(
    `/api/municipals/districts/promoveds/count`
  );
  const data = resp.data;
  console.log(data);
  return data;
};

export const gettotalPromotedsBySections = async () => {
  const resp = await requestHttp.get(
    `/api/municipals/districts/promoveds/count`
  );
  const data = resp.data;
  console.log(data);
  return data;
};

export const gettotalCounts = async () => {
  const resp = await requestHttp.get(
    `/api/municipals/sections-with-promoved-count`
  );
  const data = resp.data;
  console.log(data);
  return data;
};

export const getPromotedsCountByMunicipality = async (
  promotorId: string | number
) => {
  try {
    const resp = await requestHttp.get(
      `/api/promotors/${promotorId}/promoteds-count-by-municipality`
    );
    const data = resp.data;
    console.log(data);
    return data;
  } catch (error) {
    console.error(
      "Error al obtener el conteo de promovidos por municipio:",
      error
    );
    // Aquí puedes manejar el error como prefieras
  }
};

// api.ts
// api.ts
// api.ts
// api.ts
// api.ts
// api.ts
// api.ts
export const gettotalPromotedsByMunicipality = async () => {
  try {
    const resp = await requestHttp.get('/api/municipals/total-promoteds', { params: { filter: 'all' } });

    const data = resp.data;

    console.log("Datos de la API:", data);

    return data;
  } catch (error) {
    console.error('Error al obtener los datos:', error);
    throw error;  // Puedes lanzar el error nuevamente si es necesario
  }
};









