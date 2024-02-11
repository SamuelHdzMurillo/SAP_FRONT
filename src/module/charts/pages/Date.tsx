import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import LayoutC from "@/components/LayoutC";
import {gettotalPromotedsByMunicipalitybydate} from "./api";
import Card from 'antd/es/card/Card';
import ChartPromotorDetail from "./ChartPromotorDetail"

const DateComponent: React.FC = () => {
  const [chartData, setChartData] = useState({
    series: [],
    options: {
      chart: {
        type: 'bar',
        height: 350,
      },
      plotOptions: {
        bar: {
          horizontal: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      xaxis: {
        categories: [],
      }
    }
  });
  const promotorId = 100;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const {response} = await gettotalPromotedsByMunicipalitybydate();
        const counts = response.counts;
  
        if (counts && counts.categories && counts.seriesData) {
          const categories = counts.dates; // Las fechas
          const seriesData = counts.promoved_count; // Los promoved_count
  
          setChartData(prevChartData => ({
            ...prevChartData,
            series: [{ name: 'Promoved Count', data: seriesData }],
            options: { ...prevChartData.options, xaxis: { categories: categories } }
          }));
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, []);
  

  return (
    <LayoutC items={[{ title: "Grafica por Fecha " }]} title={""}>
      <div>
        <Card title="winas">
        <h1>hola mundo</h1>
        <ReactApexChart
          options={chartData.options}
          series={chartData.series}
          type="bar"
          height={350}
        />

            <ChartPromotorDetail promotorId={promotorId} />

        </Card>
        
      </div>
    </LayoutC>
  );
};

export default DateComponent;
