import { requestHttp } from "@/api/requestHttp";
import { Promotor } from "./store";
export const getAllPromotor = async ({
  page,
  name,
  email,
  phone_number,
  municipal_name,
  position,
}: {
  page: string;
  phone_number?: string;
  email?: string;
  name?: string;
  municipal_name?: string;
  position?: string;
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
  if (municipal_name) {
    params = params.concat(`&municipal_name=${municipal_name}`);
  }
  if (position) {
    params = params.concat(`&position=${position}`);
  }
  const resp = await requestHttp.get(`/api/promotores?page=${page}${params}`);
  const data = await resp.data;
  return data;
};

export const postPromotor = async (data: FormData) => {
  const resp = await requestHttp.post("/api/promotores", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return resp.data;
};

export const getPromotor = async (id: number) => {
  const resp = await requestHttp.get(`/api/promotores/${id}`);
  const data = await resp.data;
  return data;
};

export const destroyPromotor = async (id: number) => {
  const resp = await requestHttp.delete(`/api/promotores/${id}`);
  return resp.data;
};

export const putPromotor = async (data: Promotor) => {
  const resp = await requestHttp.put(`/api/promotores/${data.id}`, data);
  return resp.data;
};

export const postProblem = async (data: FormData) => {
  const resp = await requestHttp.post("/api/problems", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return resp.data;
};
