/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import LayoutC from "@/components/LayoutC";
import Municipals from "@/module/charts/pages/Municipals";
import Charts from "@/module/charts/pages/Countchart";
import {
  getDashboardCountByPromotor,
  getPromotedByDatesPage,
  gettotalPromotedsByMunicipality,
} from "../api";
import { Card } from "antd";
import "./style.css";
import { BarChartOutlined, UsergroupAddOutlined } from "@ant-design/icons";
import { Pie } from "react-chartjs-2";
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
  const [pieData, setPieData] = useState<{
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      backgroundColor: string[];
      borderColor: string[];
      borderWidth: number;
    }[];
  }>({
    labels: [],
    datasets: [
      {
        label: "Cant. de Promovidos",
        data: [],
        backgroundColor: [],
        borderColor: [],
        borderWidth: 1,
      },
    ],
  });

  const transformedSeries = [
    {
      name: "Value",
      data: itemsChartByDates.map((item) => item.value),
    },
  ];

  // const apexOptions = {
  //   chart: {
  //     height: 350,
  //     type: "bar",
  //   },
  //   plotOptions: {
  //     bar: {
  //       columnWidth: "45%",
  //       distributed: true,
  //     },
  //   },
  //   dataLabels: {
  //     enabled: false,
  //   },
  //   legend: {
  //     show: false,
  //   },
  //   xaxis: {
  //     categories: itemsChartByDates.map((item) => item.day),
  //     labels: {
  //       style: {
  //         fontSize: "12px",
  //       },
  //     },
  //   },
  //   colors: colors,
  // };

  useEffect(() => {
    const handleGetPromotedsByPromoters = async () => {
      const totalByMunicipalityData = await gettotalPromotedsByMunicipality({
        filter: "",
      });
      const municipalNames = totalByMunicipalityData.municipals.map(
        (item: { municipal_name: any }) => item.municipal_name
      );
      const totalPromoveds = totalByMunicipalityData.municipals.map(
        (item: { total_promoveds: any }) => item.total_promoveds
      );

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

      setPieData({
        labels: municipalNames,
        datasets: [
          {
            label: "Cant. de Promovidos",
            data: totalPromoveds,
            backgroundColor: [
              "rgb(14,185,128)",
              "rgb(247,144,10)",
              "rgb(99,102,241)",
              "rgb(38,160,252)",
              "rgb(255,97,120)",
            ],
            borderColor: [
              "rgb(14,185,128)",
              "rgb(247,144,10)",
              "rgb(99,102,241)",
              "rgb(38,160,252)",
              "rgb(255,97,120)",
            ],
            borderWidth: 1,
          },
        ],
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
          <Card title="Promovidos por Mes">
            <ReactApexChart
              options={{
                chart: {
                  height: 500,
                  type: "bar", // Replace "string" with a valid chart type like "bar", "line", etc.
                },
                plotOptions: {
                  bar: {
                    columnWidth: "50%",
                    distributed: true,
                  },
                },
                dataLabels: {
                  enabled: false,
                },
                legend: {
                  show: false,
                },
                xaxis: {
                  categories: transformedSeries.map((item) => item.name),
                  labels: {
                    style: {
                      fontSize: "12px",
                    },
                  },
                },
                colors: ["#0eb980"],
              }}
              series={transformedSeries}
              type="bar"
              height={500}
            />
          </Card>
          <Card title="Total Promovidos por Municipio">
            <div className="pie-container">
              <Pie data={pieData} />
            </div>
          </Card>
          <Municipals />
          <Charts />
        </div>
      </div>
    </LayoutC>
  );
};

export default Dashboard;
