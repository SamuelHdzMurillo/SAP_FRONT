import { requestHttp } from "@/api/requestHttp";

interface DataForm {
  Name: string;
  data: number[];
}

export const getPriorityCharts = async () => {
  const resp = await requestHttp.get(`/api/priority-sections`);
  const data = resp.data;
  return data;
};

export const postPriority = async (dataForm: DataForm) => {
  const resp = await requestHttp.post(`/api/priority-sections`, dataForm);
  const data = resp.data;
  return data;
};

export const deletePriority = async (id: number) => {
  const resp = await requestHttp.delete(`/api/priority-sections/${id}`);
  const data = resp.data;
  return data;
};
