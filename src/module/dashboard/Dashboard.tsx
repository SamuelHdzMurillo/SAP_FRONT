/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import LayoutC from "@/components/LayoutC";
import { useEffect, useState } from "react";
import { getDashboardByPromotor, getDashboardCountByPromotor } from "./api";
import { Column } from "@ant-design/charts";
import "./style.css";

const Dashboard = () => {
  const [itemsChart, setItemsChart] = useState<any[]>([]);
  const [promoter_count_mont, setPromoterCountMonth] = useState<number>(0);
  const [promoter_countTotal, setPromoterCountTotal] = useState<number>(0);
  useEffect(() => {
    const handleGetPromotedsByPromoters = async () => {
      const { data } = await getDashboardByPromotor({
        filter: "all",
      });
      const promoter_count_mont = await getDashboardCountByPromotor({
        filter: "month",
      });
      const promoter_count_total = await getDashboardCountByPromotor({
        filter: "all",
      });
      setPromoterCountMonth(promoter_count_mont.promoteds_count);
      setPromoterCountTotal(promoter_count_total.promoteds_count);
      setItemsChart(data);
    };
    handleGetPromotedsByPromoters();
  }, []);
  const config = {
    data: itemsChart,
    xField: "promotor",
    yField: "value",
    label: {
      position: "bottom",
      style: {
        fill: "#FFFFFF",
        opacity: 0.6,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
  };
  const [filter, setFilter] = useState("");

  const handleFilterChange = async (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setFilter(event.target.value);
    const { data } = await getDashboardByPromotor({
      filter: event.target.value,
    });
    setItemsChart(data);
  };
  return (
    <LayoutC
      items={[
        {
          title: "Usuarios",
        },
      ]}
      title={""}
    >
      <h1>Dashboard</h1>
      <div className="dashboard-container">
        <div className="select-container">
          <select value={filter} onChange={handleFilterChange}>
            <option value="">Selecciona un filtro</option>
            <option value="week">Esta semana</option>
            <option value="month">Este mes</option>
            <option value="all">Resetear</option>
          </select>
        </div>
        <div className="widgets">
          <div className="widget">
            <h2 className="widget-title">Promovidos en Total</h2>
            <p className="widget-content">{promoter_countTotal}</p>
          </div>

          <div className="widget">
            <h2 className="widget-title">Promovidos en este mes</h2>
            <p className="widget-content">{promoter_count_mont}</p>
          </div>
        </div>
      </div>
      <Column {...config} />
    </LayoutC>
  );
};

export default Dashboard;
