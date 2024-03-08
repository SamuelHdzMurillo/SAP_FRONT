import { Button, Card } from "antd";
import { ApexOptions } from "apexcharts";
import ReactApexChart from "react-apexcharts";
import { AnyObject } from "yup";
import { Priority } from "../store";

interface PriorityChartProps {
  options: ApexOptions;
  type: string;
  title: string;
  series: AnyObject;
  data: Priority;
  handleDeleteGoal: (id: number) => void;
}

const PriorityChart = ({
  options,
  series,
  title,
  data,
  handleDeleteGoal,
}: PriorityChartProps) => {
  const { id } = data;
  return (
    <Card
      style={{
        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
        borderRadius: "4px",
      }}
      title={title}
    >
      <div style={{ position: "relative", margin: "0 auto" }}>
        <ReactApexChart
          options={{
            ...options,
          }}
          series={series as ApexAxisChartSeries | ApexNonAxisChartSeries}
          type="bar"
          height={500}
        />
        <Button
          type="primary"
          danger
          onClick={() => handleDeleteGoal(id)}
          style={{ position: "absolute", top: 0, right: 0, zIndex: 100 }}
        >
          x
        </Button>
      </div>
    </Card>
  );
};

export default PriorityChart;
