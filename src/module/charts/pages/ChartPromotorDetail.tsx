import { useEffect, useState } from "react";
import ReactECharts, { EChartsOption } from "echarts-for-react";
import { Card, Empty } from "antd";
import { getPromotedsCountByMunicipality } from "./api";

interface ChartPromotorDetailProps {
  promotorId: string;
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

const ChartPromotorDetail: React.FC<ChartPromotorDetailProps> = ({
  promotorId,
}) => {
  const [data, setData] = useState<MunicipalData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getPromotedsCountByMunicipality(promotorId);
      const { distribution } = response;
      if (distribution && distribution.length > 0) {
        const transformedData = transformData(distribution);
        setData(transformedData);
      } else {
        setData([]);
      }
    };
    fetchData();
  }, [promotorId]);

  const transformData = (distribution: any[]): MunicipalData[] => {
    const municipalMap: { [key: string]: MunicipalData } = {};
    distribution.forEach(
      ({ municipal_name, district_name, section_number, promoteds_count }) => {
        if (!municipalMap[municipal_name]) {
          municipalMap[municipal_name] = {
            name: municipal_name,
            children: [],
            value: 0,
          };
        }
        let district = municipalMap[municipal_name].children.find(
          (d) => d.name === `Distrito ${district_name}`
        );
        if (!district) {
          district = {
            name: `Distrito ${district_name}`,
            children: [],
            value: 0,
          };
          municipalMap[municipal_name].children.push(district);
        }
        district.children.push({
          name: `Sección ${section_number}`,
          value: promoteds_count,
        });
        district.value += promoteds_count;
        municipalMap[municipal_name].value += promoteds_count;
      }
    );

    return Object.values(municipalMap);
  };

  const getOption = (): EChartsOption => ({
    tooltip: {
      trigger: "item",
      formatter: function (params: any) {
        const { name, value } = params;
        return `${name}: ${value}`;
      },
    },
    series: {
      type: "sunburst",
      data: data,
      radius: [0, "100%"],
      sort: undefined,
      emphasis: {
        focus: "ancestor",
      },
      levels: [],
    },
  });

  return (
    <div>
      <Card title="Promovidos por Distrito y Sección">
        {data.length > 0 ? (
          <ReactECharts
            option={getOption()}
            style={{ height: "700px", width: "100%" }}
          />
        ) : (
          <Empty description="No hay datos disponibles" />
        )}
      </Card>
    </div>
  );
};

export default ChartPromotorDetail;
