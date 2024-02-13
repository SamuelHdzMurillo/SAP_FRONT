import LayoutC from "@/components/LayoutC";
import React, { useEffect } from "react";
import { useGoalC } from "../hooks/useGoalC";
import { Button, Card, Col, Row } from "antd";
import ModalC from "@/components/ModalC";
import ChartGoal from "../Components/ChartGoal";
import GoalForm from "../Components/GoalForm";
import { useGoalStore } from "../store";
// const colors = [
//   "#FF4560",
//   "#00E396",
//   "#008FFB",
//   "#FEB019",
//   "#775DD0",
//   "#FF4560",
//   "#00E396",
//   "#008FFB",
// ];

interface GoalPageProps {
  // Define your component props here
}

const GoalPage: React.FC<GoalPageProps> = (props) => {
  const {
    handleGetGoals,
    handleOpenModal,
    handleCloseModal,
    handleDeleteGoal,
    isModalOpen,
    form,
  } = useGoalC();
  const goalsStore = useGoalStore((state) => state.goals);
  useEffect(() => {
    handleGetGoals();
    // Your code here
  }, []);

  var options2 = {
    series: [
      {
        name: "Actual",
        data: [44],
      },
      {
        name: "Meta",
        data: [76],
      },
    ],
    chart: {
      type: "bar",
      height: 350,
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "55%",
        endingShape: "rounded",
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["transparent"],
    },
    xaxis: {
      categories: ["Objetivo 1"],
    },
    yaxis: {
      title: {
        text: "Promovidos",
      },
    },
    fill: {
      opacity: 1,
    },
    tooltip: {
      y: {
        formatter: function (val: any) {
          return val + " Promovidos";
        },
      },
    },
  };
  return (
    <LayoutC items={[{ title: "Metas" }]} title={"Graficas de Metas"}>
      <h1>Metas </h1>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "flex-end",
          marginBottom: 20,
          gap: 10,
        }}
      >
        <Button
          style={{
            backgroundColor: "#1C1C1C",
          }}
          type="primary"
          onClick={() => handleOpenModal()}
        >
          {" "}
          Agregar Meta{" "}
        </Button>
      </div>
      <Row gutter={[10, 10]}>
        {/* <Col span={24} sm={12}>
          <Card
            style={{
              boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
              borderRadius: "4px",
            }}
            title={"Meta 1"}
          >
            <div style={{ position: "relative", margin: "0 auto" }}>
              <ReactApexChart
                options={options2}
                series={options2.series}
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
        </Col> */}
        {goalsStore.length > 0 &&
          goalsStore.map((goal, index) => (
            <Col key={index + 2} span={24} sm={12}>
              <ChartGoal
                handleDeleteGoal={handleDeleteGoal}
                title={goal.muncipal_name}
                options={{
                  ...options2,
                  xaxis: {
                    categories: [goal.goalName],
                  },
                  chart: { ...options2.chart, type: "bar" },
                }}
                goal={goal}
                type="bar"
                series={[
                  {
                    name: "Actual",
                    color: "#8f2a2b",
                    data: [goal.promoted_count],
                  },
                  {
                    name: "Meta",
                    color: "#1C1C1C",
                    data: [parseInt(goal.goalValue)],
                  },
                ]}
              />
            </Col>
          ))}
      </Row>
      <ModalC
        title="Agregar Meta"
        isModalOpen={isModalOpen}
        handleOk={() => handleOpenModal()}
        handleCancel={handleCloseModal}
      >
        <GoalForm form={form} handleCloseModal={handleCloseModal} />
      </ModalC>
    </LayoutC>
  );
};

export default GoalPage;
