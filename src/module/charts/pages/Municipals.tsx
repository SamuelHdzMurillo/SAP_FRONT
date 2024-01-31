import React, { useEffect, useState } from 'react';
import * as echarts from 'echarts';
import { Card } from 'antd';

import { gettotalPromotedsByMunicipalitybydate } from "./api";

const Municipals: React.FC = () => {
  const [treeData, setTreeData] = useState([]);
  const [selectedMunicipality, setSelectedMunicipality] = useState('ALL');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await gettotalPromotedsByMunicipalitybydate();
        const counts = response.counts;
        if (counts && counts.length > 0) {
          setTreeData(transformData(counts, selectedMunicipality));
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [selectedMunicipality]);

  useEffect(() => {
    const chartDom = document.getElementById('main-chart');
    if (chartDom && treeData.length > 0) {
      const myChart = echarts.init(chartDom);
      myChart.setOption(getChartOption(treeData));
    }
  }, [treeData]);

  return (
    
      <div className="dashboard-container">
        <Card title="Promovidos por Distrito ">
        <select value={selectedMunicipality} onChange={e => setSelectedMunicipality(e.target.value)}>
          <option value="ALL">Todos los municipios</option>
          <option value="LA PAZ">LA PAZ</option>
          <option value="COMONDU">COMONDU</option>
          <option value="MULEGE">MULEGE</option>
          <option value="LOS CABOS">LOS CABOS</option>
          {/* Agrega más opciones según sea necesario */}
        </select>
        <div id="main-chart" style={{ width: '100%', height: '500px' }}></div>
        </Card>
      </div>
    
  );
};

function transformData(counts, selectedMunicipality) {
  const municipalityColors = {
    'COMONDU': '#ff7f0e',
    'LA PAZ': '#2ca02c',
    // Agrega más municipios y colores según sea necesario
  };

  const treeData = [];

  counts.forEach(item => {
    if (selectedMunicipality === 'ALL' || item.municipal_name === selectedMunicipality) {
      treeData.push({
        name: `District ${item.district_number}`,
        value: item.promoved_count,
        fullLabel: `${item.municipal_name} - District ${item.district_number} - ${item.date}`
      });
    }
  });

  return treeData;
}

function getChartOption(data) {
  return {
    title: {
      text: '',
      left: 'center'
    },
    tooltip: {
      formatter: function(info) {
        const value = info.value;
        const fullLabel = info.data.fullLabel || info.name;
        const parts = fullLabel.split(' - ');
        const municipal = parts[0];
        const district = parts[1];
        const date = parts[2];
        return `
          <div><strong>${municipal}</strong></div>
          <div>${district}</div>
          <div>Promovidos: ${value}</div>
        `;
      }
    },
    series: [
      {
        type: 'sunburst',
        data: data,
        radius: ['15%', '80%'],
        label: {
          rotate: 'radial'
        }
      }
    ],
    animation: true,
    animationDuration: 1000,
    animationEasing: 'cubicOut'
  };
}

export default Municipals;
