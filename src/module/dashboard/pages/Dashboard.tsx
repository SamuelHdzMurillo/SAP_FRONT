/* eslint-disable react-hooks/exhaustive-deps */
import LayoutC from "@/components/LayoutC";
import { useEffect, useState } from "react";
import {
  getDashboardByPromotor,
  getDashboardCountByPromotor,
  getPromotedByDatesPage,
  gettotalPromotedsByMunicipality
} from "../api";
import { Card } from 'antd';
import { Column } from "@ant-design/charts";
import "./style.css";
import { BarChartOutlined, UsergroupAddOutlined } from "@ant-design/icons";
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import Widgets from "../components/Widgets";

import ReactApexChart from 'react-apexcharts';

ChartJS.register(ArcElement, Tooltip, Legend);

const colors = ['#FF4560', '#00E396', '#008FFB', '#FEB019', '#775DD0', '#FF4560', '#00E396', '#008FFB'];


  

const Dashboard = () => {
  const [itemsChartByDates, setItemsChartByDates] = useState<any[]>([]);
  const [promoter_count_mont, setPromoterCountMonth] = useState<number>(0);
  const [promoter_count_sem, setPromoterCountsem] = useState<number>(0);
  const [promoter_count_day, setPromoterCountday] = useState<number>(0);
  const [promoter_countTotal, setPromoterCountTotal] = useState<number>(0);
  const [pieData, setPieData] = useState({
    labels: [],
    datasets: [{
      label: 'Cant. de Promovidos',
      data: [],
      backgroundColor: [],
      borderColor: [],
      borderWidth: 1
    }]
  });

  const transformedSeries = [{
    name: "Value", // Puedes cambiar este nombre según tus necesidades
    data: itemsChartByDates.map(item => item.value),
  }];

  const apexOptions = {
    chart: {
      height: 350,
      type: 'bar',
    },
    plotOptions: {
      bar: {
        columnWidth: '45%',
        distributed: true,
      }
    },
    dataLabels: {
      enabled: false
    },
    legend: {
      show: false
    },
    xaxis: {
      categories: itemsChartByDates.map(item => item.day),
      labels: {
        style: {
          fontSize: '12px'
        }
      }
    },
    colors: colors, // Asegúrate de que `colors` esté definido
  };
  useEffect(() => {
    const handleGetPromotedsByPromoters = async () => {
      const totalByMunicipalityData = await gettotalPromotedsByMunicipality({});
      const municipalNames = totalByMunicipalityData.municipals.map(item => item.municipal_name);
      const totalPromoveds = totalByMunicipalityData.municipals.map(item => item.total_promoveds);

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
            label: 'Cant. de Promovidos',
            data: totalPromoveds,
            backgroundColor: [
              'rgb(14,185,128)',
              'rgb(247,144,10)',
              'rgb(99,102,241)',
            ],
            borderColor: [
              'rgb(14,185,128)',
              'rgb(247,144,10)',
              'rgb(99,102,241)',
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

  const configByDates = {
    data: itemsChartByDates,
    xField: "day",
    yField: "value",
    label: {
      position: "bottom",
      style: {
        fill: "#321331",
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
      title: `Promovidos semanal`,
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
        <div className="select-container">
          {/* Selector de filtro */}
        </div>
        <Widgets widgets={widgets} />
        <div className="chart-container">
         
        <Card title="Promovidos por Mes">
        <ReactApexChart options={apexOptions} series={transformedSeries} type="bar" height={500} />
      </Card>
          <Card title="Total Promovidos por Municipio" >
            <div className="pie-container">
              <Pie data={pieData} />
            </div>
          </Card>

          
        </div>
      </div>
    </LayoutC>
  );
};

export default Dashboard;
