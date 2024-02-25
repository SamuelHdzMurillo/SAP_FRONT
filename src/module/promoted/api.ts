import { requestHttp } from "@/api/requestHttp";
import { Promoted } from "./store";
const MODULE = "promoted";
export const getAllPromoted = async ({
  page,
  name,
  last_name,
  email,
  phone_number,
  adress,
  electoral_key,
  curp,
  promotor_id,
}: {
  page: string;
  curp?: string;
  email?: string;
  adress?: string;
  phone_number?: string;
  electoral_key?: string;
  name?: string;
  last_name?: string;
  promotor_id?: number;
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
  if (last_name) {
    params = params.concat(`&last_name=${last_name}`);
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
  if (promotor_id) {
    params = params.concat(`&promotor_id=${promotor_id}`);
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

export const exportPromoteds = async ({
  type,
  id,
}: {
  type: string;
  id?: string | number | null;
}) => {
  let route = "export-excel";
  if (type === "district") {
    route = `export/district/${id}`;
  }
  if (type === "section") {
    route = `export/section/${id}`;
  }
  const resp = await requestHttp.get(`/api/${route}`, {
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
