import React, { useEffect, useState } from "react";
import ReactECharts, { EChartsOption } from "echarts-for-react"; // Importa ReactECharts
import { Card, Select } from "antd";
import { gettotalCounts } from "./api";

const { Option } = Select;

interface Section {
  municipal_name: string;
  district_number: number;
  section_number: number;
  promoved_count: number;
}

interface MunicipalData {
  name: string;
  children: DistrictData[];
  value: number;
}

interface DistrictData {
  name: string;
  children: SectionData[];
  value: number;
}

interface SectionData {
  name: string;
  value: number;
}

const SunburstChart: React.FC = () => {
  const [data, setData] = useState<MunicipalData[]>([]);
  const [selectedMunicipality, setSelectedMunicipality] =
    useState<string>("ALL");

  useEffect(() => {
    const fetchData = async () => {
      const response = await gettotalCounts();
      const sections: Section[] = response.sections;
      const transformedData = transformData(sections, selectedMunicipality);
      setData(transformedData);
    };
    fetchData();
  }, [selectedMunicipality]);

  const transformData = (
    sections: Section[],
    filterMunicipality: string
  ): MunicipalData[] => {
    let filteredSections: Section[] =
      filterMunicipality !== "ALL"
        ? sections.filter((s) => s.municipal_name === filterMunicipality)
        : sections;

    const municipalMap: { [key: string]: MunicipalData } = {};
    filteredSections.forEach((s) => {
      if (!municipalMap[s.municipal_name]) {
        municipalMap[s.municipal_name] = {
          name: s.municipal_name,
          children: [],
          value: 0,
        };
      }
      let district = municipalMap[s.municipal_name].children.find(
        (d) => d.name === `Distrito ${s.district_number}`
      );
      if (!district) {
        district = {
          name: `Distrito ${s.district_number}`,
          children: [],
          value: 0,
        };
        municipalMap[s.municipal_name].children.push(district);
      }
      district.children.push({
        name: `Sección ${s.section_number}`,
        value: s.promoved_count,
      });
      district.value += s.promoved_count; // Sumar al distrito
      municipalMap[s.municipal_name].value += s.promoved_count; // Sumar al municipio
    });

    return Object.values(municipalMap);
  };

  const getOption = (): EChartsOption => {
    return {
      tooltip: {
        trigger: "item",
        formatter: function (params: any) {
          // params contiene información sobre el nodo en el que se hace hover
          const { name, value } = params;
          return `${name}: ${value}`;
        },
      },
      series: {
        type: "sunburst",
        data: data,
        radius: [0, "95%"],
        sort: undefined,
        emphasis: {
          focus: "ancestor",
        },
        levels: [
          // Configuración de niveles aquí
        ],
      },
    };
  };

  return (
    <div>
      <Card title="Promovidos por distrito y secciones">
        <Select
          defaultValue="ALL"
          style={{ width: 200 }}
          onChange={setSelectedMunicipality}
        >
          <Option value="ALL">Todos los municipios</Option>
          <Option value="LA PAZ">LA PAZ</Option>
          <Option value="COMONDU">COMONDU</Option>
          <Option value="MULEGE">MULEGE</Option>
          <Option value="LOS CABOS">LOS CABOS</Option>
          <Option value="LORETO">LORETO</Option>
          {/* Agregar más municipios según sea necesario */}
        </Select>
        <ReactECharts
          option={getOption()}
          style={{ height: "700px", width: "100%" }}
        />
      </Card>
    </div>
  );
};

export default SunburstChart;
