/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
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
ChartJS.register(ArcElement, Tooltip, Legend);

import Widgets from "../components/Widgets";


const date = new Date();
      const day = date.getDay();
      const diff = date.getDate() - day + (day === 0 ? -6 : 1);
      
      const startOfWeek = new Date(date.setDate(diff));
      const endOfWeek = new Date(date.setDate(diff + 6));
      
      const startOfWeekString = startOfWeek.toLocaleDateString("default");
      const endOfWeekString = endOfWeek.toLocaleDateString("default");
      
      console.log(`La semana actual es de  ${startOfWeekString} a ${endOfWeekString}`);

     const week = `${startOfWeekString} a ${endOfWeekString}`


const Dashboard = () => {
  const [itemsChart, setItemsChart] = useState<any[]>([]);
  const [itemsChartByDates, setItemsChartByDates] = useState<any[]>([]);
  const [promoter_count_mont, setPromoterCountMonth] = useState<number>(0);
  const [promoter_count_sem, setPromoterCountsem] = useState<number>(0);
 
  const [promoter_countTotal, setPromoterCountTotal] = useState<number>(0);
  
  const radialConfig = {
    data: itemsChart, // Asegúrate de que esto esté configurado con tus datos
    innerRadius: 20,
    outerRadius: 140,
    barSize: 10,
    // ...otros ajustes que necesites
  };

  
  useEffect(() => {
    
    const handleGetPromotedsByPromoters = async () => {
      const totalByMunicipalityData = await gettotalPromotedsByMunicipality({});
      const municipalNames = totalByMunicipalityData.municipals.map(item => item.municipal_name);
      const totalPromoveds = totalByMunicipalityData.municipals.map(item => item.total_promoveds);
  
      const { data } = await getDashboardByPromotor({
        filter: "all",
      });
      const promoter_count_mont = await getDashboardCountByPromotor({
        filter: "month",
      });
      const promoter_count_total = await getDashboardCountByPromotor({
        filter: "all",
      });

      const promoter_count_sem = await getDashboardCountByPromotor({
        filter: "week",
      });
      const { promoteds } = await getPromotedByDatesPage({
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
              // ... agregar más colores según sea necesario
            ],
            borderColor: [
              'rgb(14,185,128)',
              'rgb(247,144,10)',
              'rgb(99,102,241)',
              // ... agregar más colores según sea necesario
            ],
            borderWidth: 1,
          },
        ],
      });
      
      setPromoterCountMonth(promoter_count_mont.promoteds_count);
      setPromoterCountsem(promoter_count_sem.promoteds_count);
      setPromoterCountTotal(promoter_count_total.promoteds_count);
      setItemsChart(data);
      setItemsChartByDates(promoteds);
    };
    handleGetPromotedsByPromoters();
    
  }, []);

  

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
  
  
  const configByDates = {
    data: itemsChartByDates,
    xField: "day",
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
      value: promoter_count_sem,
      title: `Promovidos semanal`,
    },
    
  ];
  return (
    <LayoutC items={[{ title: "Usuarios" }]} title={""}>
  <h1>Promovidos </h1>
  <div className="dashboard-container">
    <div className="select-container">
      {/* ... selector de filtro ... */}
    </div>
    <Widgets widgets={widgets} />
    <div className="chart-container">
      
      {/* Card para el gráfico Column by Dates */}
      <Card title="Promovidos por Mes" >
        <Column {...configByDates} />
      </Card>

      {/* Card para el gráfico de Pastel */}
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
