/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import LayoutC from "@/components/LayoutC";
import Municipals from "@/module/charts/pages/Municipals";
import Charts from "@/module/charts/pages/Countchart";
import PieChartMun from "@/module/charts/pages/PiechartMun";
import { getDashboardCountByPromotor, getPromotedByDatesPage } from "../api";
import { Card } from "antd";
import "./style.css";
import { BarChartOutlined, UsergroupAddOutlined } from "@ant-design/icons";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import Widgets from "../components/Widgets";
import ReactApexChart from "react-apexcharts";

ChartJS.register(ArcElement, Tooltip, Legend);

// const colors = [
//   "#FF4560",
//   "#00E396",
//   "#008FFB",
//   "#FEB019",
//   "#775DD0",
//   "#FF4560",
//   "#00E396",
//   "#008FFB",
// ];

const date = new Date();
const day = date.getDay();

// Calcular el inicio y fin de la semana, una semana atrás
const diff = date.getDate() - day - 7 + (day === 0 ? -6 : 1); // Ajustar para la semana anterior

// Crear nuevas fechas para evitar modificar la fecha original
const startOfLastWeek = new Date(date.getFullYear(), date.getMonth(), diff);
const endOfLastWeek = new Date(date.getFullYear(), date.getMonth(), diff + 6);

const startOfLastWeekString = startOfLastWeek.toLocaleDateString("default");
const endOfLastWeekString = endOfLastWeek.toLocaleDateString("default");

const week = `${startOfLastWeekString} - ${endOfLastWeekString}`;

interface DashboardProps {
  // Add any props you need here
}

interface PromotedItem {
  day: string;
  value: number;
}

const Dashboard: React.FC<DashboardProps> = () => {
  const [itemsChartByDates, setItemsChartByDates] = useState<PromotedItem[]>(
    []
  );
  const [promoter_count_mont, setPromoterCountMonth] = useState<number>(0);
  const [promoter_count_sem, setPromoterCountsem] = useState<number>(0);
  const [promoter_count_day, setPromoterCountday] = useState<number>(0);
  const [promoter_countTotal, setPromoterCountTotal] = useState<number>(0);

  const transformedSeries = [
    {
      name: "Value",
      data: itemsChartByDates.map((item) => item.value),
    },
  ];

  useEffect(() => {
    const handleGetPromotedsByPromoters = async () => {
      const promoter_count_mont_data = await getDashboardCountByPromotor({
        filter: "month",
      });
      const promoter_count_total_data = await getDashboardCountByPromotor({
        filter: "all",
      });
      const promoter_count_day_data = await getDashboardCountByPromotor({
        filter: "day",
      });
      const promoter_count_sem_data = await getDashboardCountByPromotor({
        filter: "week",
      });

      const promotedsByDatesData = await getPromotedByDatesPage({
        filter: "all",
      });

      setPromoterCountMonth(promoter_count_mont_data.promoteds_count);
      setPromoterCountsem(promoter_count_sem_data.promoteds_count);
      setPromoterCountday(promoter_count_day_data.promoteds_count);
      setPromoterCountTotal(promoter_count_total_data.promoteds_count);
      setItemsChartByDates(promotedsByDatesData.promoteds);
    };
    handleGetPromotedsByPromoters();
  }, []);

  const date = new Date();
  const month = date.toLocaleString("default", { month: "long" });
  const widgets = [
    {
      icon: <UsergroupAddOutlined />,
      value: promoter_countTotal,
      title: "Promovidos",
    },
    {
      icon: <BarChartOutlined />,
      value: promoter_count_mont,
      title: `Promovidos ${month}`,
    },
    {
      icon: <BarChartOutlined />,
      value: promoter_count_sem,
      title: `Promovidos semanal ${week} `,
    },
    {
      icon: <BarChartOutlined />,
      value: promoter_count_day,
      title: `Promovidos Hoy`,
    },
  ];

  return (
    <LayoutC items={[{ title: "Usuarios" }]} title={""}>
      <h1>Promovidos </h1>
      <div className="dashboard-container">
        <Widgets widgets={widgets} />
        <div className="chart-container">
          <Card title="Promovidos por mes">
            <ReactApexChart
              options={{
                chart: {
                  height: 500,
                  type: "bar",
                },
                plotOptions: {
                  bar: {
                    columnWidth: "80%",
                    distributed: true,
                  },
                },
                dataLabels: {
                  enabled: true,
                  style: {
                    colors: ["#000"],
                    fontSize: "12px",
                    fontWeight: "bold",
                  },
                },
                legend: {
                  show: false,
                },
                xaxis: {
                  categories: itemsChartByDates.map((item) => {
                    const date = new Date(item.day);
                    const monthLabel = date
                      .toLocaleString("default", { month: "long" })
                      .toUpperCase();
                    const percentage = (
                      (item.value /
                        transformedSeries[0].data.reduce(
                          (acc, val) => acc + val,
                          0
                        )) *
                      100
                    ).toFixed(2);
                    return `${monthLabel} - \n${percentage}%`; // Use line break for month label and percentage
                  }),
                  labels: {
                    style: {
                      fontSize: "12px",
                    },
                  },
                },
                yaxis: {
                  labels: {
                    formatter: function (value) {
                      return value.toString();
                    },
                  },
                },
                colors: ["#0eb980", "#FF4560", "#00E396", "#FEB019", "#775DD0"],
              }}
              series={transformedSeries}
              type="bar"
              height={500}
            />
          </Card>

          <PieChartMun />
          <Municipals />
          <Charts />
        </div>
      </div>
    </LayoutC>
  );
};

export default Dashboard;
