import React, { useEffect, useState } from 'react';
import ReactECharts from 'echarts-for-react'; // Importa ReactECharts
import * as echarts from 'echarts';
import { Card } from 'antd';
import { Select } from 'antd';
import { gettotalCounts } from './api';

const { Option } = Select;

const SunburstChart = () => {
  const [data, setData] = useState([]);
  const [selectedMunicipality, setSelectedMunicipality] = useState('ALL');

  useEffect(() => {
    const fetchData = async () => {
      const response = await gettotalCounts();
      const sections = response.sections;
      const transformedData = transformData(sections, selectedMunicipality);
      setData(transformedData);
    };
    fetchData();
  }, [selectedMunicipality]);

  const transformData = (sections, filterMunicipality) => {
    let filteredSections = filterMunicipality !== 'ALL' ? sections.filter(s => s.municipal_name === filterMunicipality) : sections;
  
    const municipalMap = {};
    filteredSections.forEach(s => {
      if (!municipalMap[s.municipal_name]) {
        municipalMap[s.municipal_name] = { name: s.municipal_name, children: [], value: 0 };
      }
      let district = municipalMap[s.municipal_name].children.find(d => d.name === `Distrito ${s.district_number}`);
      if (!district) {
        district = { name: `Distrito ${s.district_number}`, children: [], value: 0 };
        municipalMap[s.municipal_name].children.push(district);
      }
      district.children.push({ name: `Sección ${s.section_number}`, value: s.promoved_count });
      district.value += s.promoved_count; // Sumar al distrito
      municipalMap[s.municipal_name].value += s.promoved_count; // Sumar al municipio
    });
  
    return Object.values(municipalMap);
  };

  const getOption = () => {
    return {
      tooltip: {
        trigger: 'item',
        formatter: function (params) {
          // params contiene información sobre el nodo en el que se hace hover
          const { name, value } = params;
          return `${name}: ${value}`;
        }
      },
      series: {
        type: 'sunburst',
        data: data,
        radius: [0, '95%'],
        sort: undefined,
        emphasis: {
          focus: 'ancestor'
        },
        levels: [
          // Configuración de niveles aquí
        ],
      },
    };
  };
  

  return (
    <div>
      <Card title="Promovidos por Distrito ">
      <Select defaultValue="ALL" style={{ width: 200 }} onChange={setSelectedMunicipality}>
        <Option value="ALL">Todos los municipios</Option>
        <Option value="LA PAZ">LA PAZ</Option>
        <option value="COMONDU">COMONDU</option>
          <option value="MULEGE">MULEGE</option>
          <option value="LOS CABOS">LOS CABOS</option>
        {/* Agregar más municipios según sea necesario */}
      </Select>
      <ReactECharts option={getOption()} style={{ height: '700px', width: '100%' }} />
      </Card>
    </div>
  );
};

export default SunburstChart;
