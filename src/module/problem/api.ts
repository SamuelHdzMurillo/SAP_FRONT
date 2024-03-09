import { requestHttp } from "@/api/requestHttp";
const MODULE = "problems";
export const getAllProblem = async ({
  page,
  title,
  section_number,
  promoted_name,
}: {
  page: string;
  title?: string;
  section_number?: string;
  promoted_name?: string;
}) => {
  let params = "";
  if (title) {
    params = params.concat(`&title=${title}`);
  }
  if (section_number) {
    params = params.concat(`&section_number=${section_number}`);
  }
  if (promoted_name) {
    params = params.concat(`&promoted_name=${promoted_name}`);
  }
  const resp = await requestHttp.get(`/api/${MODULE}?page=${page}${params}`);
  const data = await resp.data;
  return data;
};

export const getProblem = async ({ id }: { id: string }) => {
  const resp = await requestHttp.get(`/api/${MODULE}/${id}`);
  const data = await resp.data;
  return data;
};

export const destroyProblem = async ({ id }: { id: number }) => {
  const resp = await requestHttp.delete(`/api/${MODULE}/${id}`);
  const data = await resp.data;
  return data;
};
