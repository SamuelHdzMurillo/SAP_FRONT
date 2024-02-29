import { Button, Card } from "antd";
import { ApexOptions } from "apexcharts";
import ReactApexChart from "react-apexcharts";
import { Goal } from "../store";
import { AnyObject } from "yup";

interface PriorityChartProps {
  options: ApexOptions;
  type: string;
  title: string;
  series: AnyObject[];
  goal: Goal;
  handleDeleteGoal: (id: number) => void;
}

const PriorityChart = ({
  options,

  series,
  title,
  goal,
  handleDeleteGoal,
}: PriorityChartProps) => {
  const { id } = goal;
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
          options={options}
          series={series}
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
