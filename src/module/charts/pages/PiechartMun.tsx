import React, { useEffect, useState } from 'react';
import { Card } from 'antd';
import * as echarts from 'echarts/core';
import { ToolboxComponent, LegendComponent } from 'echarts/components';
import { PieChart } from 'echarts/charts';
import { LabelLayout } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';
import { gettotalPromotedsByMunicipality } from '@/module/dashboard/api.ts';

echarts.use([ToolboxComponent, LegendComponent, PieChart, CanvasRenderer, LabelLayout]);

const PieChartComponent: React.FC = () => {
  const [pieData, setPieData] = useState<{
    municipal_name: string;
    total_promoveds: number;
    percentage: string;
  }[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const totalByMunicipalityData = await gettotalPromotedsByMunicipality(" ");
        console.log("Respuesta de la API:", totalByMunicipalityData);

        if (totalByMunicipalityData && totalByMunicipalityData.municipals) {
          // Calcula el total para determinar los porcentajes
          const total = totalByMunicipalityData.municipals.reduce((acc, current) => acc + current.total_promoveds, 0);

          // Calcula los porcentajes y actualiza el estado
          const result = totalByMunicipalityData.municipals.map((item) => ({
            municipal_name: item.municipal_name,
            total_promoveds: item.total_promoveds,
            percentage: total === 0 ? '0.00' : ((item.total_promoveds / total) * 100).toFixed(2),
          }));

          setPieData(result);
        } else {
          console.error('Datos de la API no válidos.');
        }
      } catch (error) {
        console.error('Error al obtener los datos:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const chartDom = document.getElementById('main');
    if (!chartDom || pieData.length === 0) return;

    const myChart = echarts.init(chartDom);

    const option = {
      tooltip: {
        trigger: 'item',
        formatter: '{b}: {c}',  // Mostrará el nombre del municipio y la cantidad de promovidos
      },
      legend: {
        orient: 'vertical',
        left: 10,
        data: pieData.map((item) => `${item.municipal_name} - ${item.percentage}% (${item.total_promoveds} promovidos)`),
      },
      series: [
        {
          name: 'Promovidos',
          type: 'pie',
          radius: '45%',
          center: ['50%', '60%'],
          data: pieData.map((item) => ({
            value: item.total_promoveds,
            name: `${item.municipal_name} - ${item.percentage}% (${item.total_promoveds} promovidos)`,
          })),
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)',
            },
          },
        },
      ],
    };

    // Agregar etiquetas personalizadas en la parte superior
    const textOption = {
      type: 'text',
      left: 'center',
      top: 10,
      style: {
         // Puedes personalizar esto con los valores que desees
        fontWeight: 'bold',
        fontSize: 16,
      },
    };

    option && myChart.setOption({ ...option, graphic: [textOption] });

    return () => {
      myChart.dispose();
    };
  }, [pieData]);

  return (
    <Card title="Total Promovidos por Municipio">
      <div id="main" style={{ height: '500px' }} />
    </Card>
  );
};

export default PieChartComponent;
