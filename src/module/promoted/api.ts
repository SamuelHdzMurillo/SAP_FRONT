import { requestHttp } from "@/api/requestHttp";
import { Promoted } from "./store";
const MODULE = "promoted";
export const getAllPromoted = async ({
  page,
  name,
  email,
  phone_number,
  adress,
  electoral_key,
  curp,
}: {
  page: string;
  curp?: string;
  email?: string;
  adress?: string;
  phone_number?: string;
  electoral_key?: string;
  name?: string;
}) => {
  let params = "";
  if (phone_number) {
    params = params.concat(`&phone_number=${phone_number}`);
  }
  if (email) {
    params = params.concat(`&email=${email}`);
  }
  if (name) {
    params = params.concat(`&name=${name}`);
  }
  if (curp) {
    params = params.concat(`&curp=${curp}`);
  }
  if (electoral_key) {
    params = params.concat(`&electoral_key=${electoral_key}`);
  }
  if (adress) {
    params = params.concat(`&adress=${adress}`);
  }
  const resp = await requestHttp.get(`/api/${MODULE}?page=${page}${params}`);
  const data = await resp.data;
  return data;
};
export const getPromoted = async ({ id }: { id: string }) => {
  const resp = await requestHttp.get(`/api/${MODULE}/${id}`);
  const data = await resp.data;
  return data;
};

export const postPromoted = async (data: FormData) => {
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
