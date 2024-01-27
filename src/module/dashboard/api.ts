import { requestHttp } from "@/api/requestHttp";

export const getDashboardByPromotor = async ({
  filter = "all",
}: {
  filter: string;
}) => {
  const resp = await requestHttp.get(
    `/api/dashboard/promoteds-by-promotor?filter=${filter}`
  );
  const data = await resp.data;
  return data;
};
export const getDashboardCountByPromotor = async ({
  filter = "all",
}: {
  filter: string;
}) => {
  const resp = await requestHttp.get(
    `/api/dashboard/promoteds-count-by-promotor?filter=${filter}`
  );
  const data = await resp.data;
  console.log(data);
  return data;
};
export const getPromotedByDatesPage = async ({
  filter = "all",
}: {
  filter: string;
}) => {
  const resp = await requestHttp.get(
    `/api/dashboard/promoteds-count-by-dates?filter=${filter}`
  );
  const data = await resp.data;
  console.log(data);
  return data;
};
