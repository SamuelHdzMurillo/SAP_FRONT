import { requestHttp } from "@/api/requestHttp";
import { Promoted } from "./store";
const MODULE = "promoted";
export const getAllPromoted = async ({ page }: { page: string }) => {
  const resp = await requestHttp.get(`/api/${MODULE}?page=${page}`);
  const data = await resp.data;
  return data;
};
export const getPromoted = async ({ id }: { id: string }) => {
  const resp = await requestHttp.get(`/api/${MODULE}/${id}`);
  const data = await resp.data;
  return data;
};

export const postPromoted = async (data: Promoted) => {
  const resp = await requestHttp.post(`/api/${MODULE}`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return resp.data;
};

export const destroyPromoted = async (id: number) => {
  const resp = await requestHttp.delete(`/api/${MODULE}/${id}`);
  return resp.data;
};

export const putPromoted = async (data: Promoted) => {
  const resp = await requestHttp.put(`/api/${MODULE}/${data.id}`, data);
  return resp.data;
};

export const exportPromoteds = async () => {
  const resp = await requestHttp.get(`/api/export-excel`, {
    responseType: "blob", // Indica que se espera un stream binario
  });

  const url = window.URL.createObjectURL(new Blob([resp.data]));
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", "promoteds.xlsx"); // Nombre del archivo a descargar
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const importPromoteds = async (data: FormData, promotor_id: number) => {
  const resp = await requestHttp.post(
    `/api/upload-excel/${promotor_id}`,
    data,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return resp.data;
};
