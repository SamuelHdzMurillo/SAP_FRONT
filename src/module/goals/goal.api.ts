import { requestHttp } from "@/api/requestHttp";
import { Goal } from "./store";

export const getGoalCharts = async () => {
  const resp = await requestHttp.get(`/api/goals`);
  const data = resp.data;
  return data;
};

export const postGoal = async (goal: Goal) => {
  const resp = await requestHttp.post(`/api/goals`, goal);
  const data = resp.data;
  return data;
};

export const deleteGoal = async (id: number) => {
  const resp = await requestHttp.delete(`/api/goals/${id}`);
  const data = resp.data;
  return data;
};
