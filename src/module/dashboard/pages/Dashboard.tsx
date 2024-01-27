/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import LayoutC from "@/components/LayoutC";
import { useEffect, useState } from "react";
import {
  getDashboardByPromotor,
  getDashboardCountByPromotor,
  getPromotedByDatesPage,
} from "../api";
import { Column } from "@ant-design/charts";
import "./style.css";
import { BarChartOutlined, UsergroupAddOutlined } from "@ant-design/icons";
import Widgets from "../components/Widgets";
import { Bar, Column as ColumnStack } from "@ant-design/plots";
const data = [
  {
    name: "London",
    mes: "Jan.",
    value: 18.9,
  },
  {
    name: "London",
    mes: "Feb.",
    value: 28.8,
  },
  {
    name: "London",
    mes: "Mar.",
    value: 39.3,
  },
  {
    name: "London",
    mes: "Apr.",
    value: 81.4,
  },
  {
    name: "London",
    mes: "May",
    value: 47,
  },
  {
    name: "London",
    mes: "Jun.",
    value: 20.3,
  },
  {
    name: "London",
    mes: "Jul.",
    value: 24,
  },
  {
    name: "London",
    mes: "Aug.",
    value: 35.6,
  },
  {
    name: "Berlin",
    mes: "Jan.",
    value: 12.4,
  },
  {
    name: "Berlin",
    mes: "Feb.",
    value: 23.2,
  },
  {
    name: "Berlin",
    mes: "Mar.",
    value: 34.5,
  },
  {
    name: "Berlin",
    mes: "Apr.",
    value: 99.7,
  },
  {
    name: "Berlin",
    mes: "May",
    value: 52.6,
  },
  {
    name: "Berlin",
    mes: "Jun.",
    value: 35.5,
  },
  {
    name: "Berlin",
    mes: "Jul.",
    value: 37.4,
  },
  {
    name: "Berlin",
    mes: "Aug.",
    value: 42.4,
  },
];
const Dashboard = () => {
  const [itemsChart, setItemsChart] = useState<any[]>([]);
  const [itemsChartByDates, setItemsChartByDates] = useState<any[]>([]);
  const [promoter_count_mont, setPromoterCountMonth] = useState<number>(0);
  const [promoter_countTotal, setPromoterCountTotal] = useState<number>(0);
  useEffect(() => {
    const handleGetPromotedsByPromoters = async () => {
      const { data } = await getDashboardByPromotor({
        filter: "all",
      });
      const promoter_count_mont = await getDashboardCountByPromotor({
        filter: "month",
      });
      const promoter_count_total = await getDashboardCountByPromotor({
        filter: "all",
      });
      const { promoteds } = await getPromotedByDatesPage({
        filter: "all",
      });
      setPromoterCountMonth(promoter_count_mont.promoteds_count);
      setPromoterCountTotal(promoter_count_total.promoteds_count);
      setItemsChart(data);
      setItemsChartByDates(promoteds);
    };
    handleGetPromotedsByPromoters();
  }, []);
  const config = {
    data: itemsChart,
    xField: "promotor",
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
    slider: {
      start: 0.1,
      end: 0.2,
    },
  };
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
  const config2 = {
    data,
    isGroup: true,
    xField: "mes",
    yField: "value",
    seriesField: "name",

    /** 设置颜色 */
    color: ["#1ca9e6", "#f88c24"],
    // marginRatio: 0.1,

    /** 设置间距 */
    // marginRatio: 0.1,
    label: {
      // 可手动配置 label 数据标签位置
      position: "bottom",
      // 'top', 'middle', 'bottom'
      // 可配置附加的布局方法
      layout: [
        // 柱形图数据标签位置自动调整
        {
          type: "interval-adjust-position",
        }, // 数据标签防遮挡
        {
          type: "interval-hide-overlap",
        }, // 数据标签文颜色自动调整
        {
          type: "adjust-color",
        },
      ],
    },
  };
  const [filter, setFilter] = useState("");

  const handleFilterChange = async (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setFilter(event.target.value);
    const { data } = await getDashboardByPromotor({
      filter: event.target.value,
    });
    const { promoteds } = await getPromotedByDatesPage({
      filter: "all",
    });
    setItemsChart(data);
    setItemsChartByDates(promoteds);
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
  ];
  return (
    <LayoutC
      items={[
        {
          title: "Usuarios",
        },
      ]}
      title={""}
    >
      <h1>Dashboard</h1>
      <div className="dashboard-container">
        <div className="select-container">
          <select value={filter} onChange={handleFilterChange}>
            <option value="">Selecciona un filtro</option>
            <option value="week">Esta semana</option>
            <option value="month">Este mes</option>
            <option value="all">Resetear</option>
          </select>
        </div>
        <Widgets widgets={widgets} />
        <div className="chart-container">
          <div className="column-container">
            <Column {...configByDates} />
          </div>

          <div className="column-container">
            <Bar {...config} />
          </div>
          <div className="column-container">
            <ColumnStack {...config2} />
          </div>
          <div className="column-container">
            <Bar {...configByDates} />
          </div>
        </div>
      </div>
    </LayoutC>
  );
};

export default Dashboard;
