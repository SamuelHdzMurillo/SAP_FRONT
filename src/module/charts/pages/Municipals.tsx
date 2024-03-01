import React, { useEffect, useState } from "react";
import * as echarts from "echarts";
import { Card } from "antd";

import { gettotalPromotedsByMunicipalitybydate } from "./api";

interface TreeDataItem {
  name: string;
  value: number;
  fullLabel: string;
  porcentaje: string;
}

interface MunicipalsProps {}

const Municipals: React.FC<MunicipalsProps> = () => {
  const [treeData, setTreeData] = useState<TreeDataItem[]>([]);
  const [selectedMunicipality, setSelectedMunicipality] = useState<string>("ALL");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await gettotalPromotedsByMunicipalitybydate();
        const counts: any[] = response.counts;
        if (counts && counts.length > 0) {
          const transformedData = transformData(counts, selectedMunicipality);
          setTreeData(transformedData);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [selectedMunicipality]);

  useEffect(() => {
    const chartDom = document.getElementById("main-chart");
    if (chartDom && treeData.length > 0) {
      const myChart = echarts.init(chartDom);
      myChart.setOption(getChartOption(treeData) as echarts.EChartsOption);
    }
  }, [treeData]);

  return (
    <div className="dashboard-container">
      <Card title="Promovidos por Distrito ">
        <select
          value={selectedMunicipality}
          onChange={(e) => setSelectedMunicipality(e.target.value)}
        >
          <option value="ALL">Todos los municipios</option>
          <option value="LA PAZ">LA PAZ</option>
          <option value="COMONDU">COMONDU</option>
          <option value="MULEGE">MULEGE</option>
          <option value="LOS CABOS">LOS CABOS</option>
          <option value="LORETO">LORETO</option>
          {/* Agrega más opciones según sea necesario */}
        </select>
        <div id="main-chart" style={{ width: "100%", height: "500px" }}></div>
      </Card>
    </div>
  );
};

function transformData(counts: any[], selectedMunicipality: string): TreeDataItem[] {
  const treeData: TreeDataItem[] = [];
  let totalPromovidos = 0;

  counts.forEach((item) => {
    if (
      selectedMunicipality === "ALL" ||
      item.municipal_name === selectedMunicipality
    ) {
      totalPromovidos += item.promoved_count;
    }
  });

  counts.forEach((item) => {
    if (
      selectedMunicipality === "ALL" ||
      item.municipal_name === selectedMunicipality
    ) {
      const porcentaje = ((item.promoved_count / totalPromovidos) * 100).toFixed(2);
      treeData.push({
        name: `District ${item.district_number}`,
        value: item.promoved_count,
        fullLabel: `${item.municipal_name} - District ${item.district_number} - ${item.date}`,
        porcentaje: `${porcentaje}%`,
      });
    }
  });

  return treeData;
}

function getChartOption(data: TreeDataItem[]) {
  return {
    title: {
      text: "",
      left: "center",
    },
    tooltip: {
      formatter: function (info: any) {
        const value = info.value;
        const porcentaje = info.data.porcentaje;
        const fullLabel = info.data.fullLabel || info.name;
        const parts = fullLabel.split(" - ");
        const municipal = parts[0];
        const district = parts[1];
        return `
          <div><strong>${municipal}</strong></div>
          <div>${district}</div>
          <div>Promovidos: ${value} (${porcentaje})</div>
        `;
      },
    },
    series: [
      {
        type: "sunburst",
        data: data.map((item) => ({
          ...item,
          label: {
            show: true,
            formatter: function () {
              return `${item.name}\n${item.porcentaje}\n${item.value}`;
            },
          },
        })),
        radius: ["15%", "80%"],
        label: {
          rotate: "radial",
        },
      },
    ],
    animation: true,
    animationDuration: 1000,
    animationEasing: "cubicOut",
  };
}

export default Municipals;
