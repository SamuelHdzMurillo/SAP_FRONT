import { requestHttp } from "@/api/requestHttp";
import { Goal } from "./store";

export const getGoalCharts = async (typeMeta = "") => {
  let params = "";
  if (typeMeta === "district") {
    params = `-district`;
  }
  if (typeMeta === "section") {
    params = `-sections`;
  }
  const resp = await requestHttp.get(`/api/goals${params}`);
  const data = resp.data;
  return data;
};

export const postGoal = async (goal: Goal, typeMeta = "") => {
  let params = "";
  if (typeMeta === "district") {
    params = `-district`;
  }
  if (typeMeta === "section") {
    params = `-sections`;
  }
  const resp = await requestHttp.post(`/api/goals${params}`, goal);
  const data = resp.data;
  return data;
};

export const deleteGoal = async (id: number, typeMeta = "") => {
  let params = "";
  if (typeMeta === "district") {
    params = `-district`;
  }
  if (typeMeta === "section") {
    params = `-sections`;
  }
  const resp = await requestHttp.delete(`/api/goals${params}/${id}`);
  const data = resp.data;
  return data;
};
