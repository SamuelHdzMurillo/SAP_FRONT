import React, { useEffect, useState } from 'react';
import ReactECharts from 'echarts-for-react'; // Importa ReactECharts
import { Card, Select, Empty } from 'antd'; // Asegúrate de importar Empty de antd
import { getPromotedsCountByMunicipality } from './api';

const { Option } = Select;

const ChartPromotorDetail = ({ promotorId }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getPromotedsCountByMunicipality(promotorId);
      const { distribution } = response;
      if (distribution && distribution.length > 0) {
        const transformedData = transformData(distribution);
        setData(transformedData);
      } else {
        setData([]); // Asegura que data esté vacío si no hay datos
      }
    };
    fetchData();
  }, [promotorId]);

  const transformData = (distribution) => {
    const municipalMap = {};
    distribution.forEach(({ municipal_name, district_name, section_number, promoteds_count }) => {
      if (!municipalMap[municipal_name]) {
        municipalMap[municipal_name] = { name: municipal_name, children: [], value: 0 };
      }
      let district = municipalMap[municipal_name].children.find(d => d.name === `Distrito ${district_name}`);
      if (!district) {
        district = { name: `Distrito ${district_name}`, children: [], value: 0 };
        municipalMap[municipal_name].children.push(district);
      }
      district.children.push({ name: `Sección ${section_number}`, value: promoteds_count });
      district.value += promoteds_count; // Sumar al distrito
      municipalMap[municipal_name].value += promoteds_count; // Sumar al municipio
    });

    return Object.values(municipalMap);
  };

  const getOption = () => ({
    tooltip: {
      trigger: 'item',
      formatter: function (params) {
        const { name, value } = params;
        return `${name}: ${value}`;
      }
    },
    series: {
      type: 'sunburst',
      data: data,
      radius: [0, '80%'],
      sort: undefined,
      emphasis: {
        focus: 'ancestor'
      },
      levels: [],
    },
  });

  // Renderiza Empty si data está vacío
  return (
    <div>
      <Card title="Promovidos por Distrito y Sección">
        {data.length > 0 ? (
          <ReactECharts option={getOption()} style={{ height: '700px', width: '100%' }} />
        ) : (
          <Empty description="No hay datos disponibles" />
        )}
      </Card>
    </div>
  );
};

export default ChartPromotorDetail;
