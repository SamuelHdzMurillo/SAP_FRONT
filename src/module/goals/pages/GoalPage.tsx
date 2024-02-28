import LayoutC from "@/components/LayoutC";
import React, { useEffect } from "react";
import { useGoalC } from "../hooks/useGoalC";
import { Button, Col, Row } from "antd";
import ModalC from "@/components/ModalC";
import ChartGoal from "../Components/ChartGoal";
import GoalForm from "../Components/GoalForm";
import { useGoalStore } from "../store";

const GoalPage: React.FC = () => {
  const {
    handleGetGoals,
    handleOpenModal,
    handleCloseModal,
    handleDeleteGoal,
    handleGetDistrictByMunicap,
    handleGetSectionsByDistrict,
    municipal,
    districts,
    sections,

    isModalOpen,
    form,
    typeMeta,
  } = useGoalC();
  const goalsStore = useGoalStore((state) => state.goals);
  useEffect(() => {
    handleGetGoals("");
    // Your code here
  }, []);

  const options2 = {
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
            backgroundColor: "#8e2a2a",
          }}
          type="primary"
          onClick={() => handleOpenModal("municipal")}
        >
          {" "}
          Agregar Meta{" "}
        </Button>
      </div>
      <Row gutter={[10, 10]}>
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
        // handleOk={() => handleOpenModal()}
        handleCancel={handleCloseModal}
      >
        <GoalForm
          municipal={municipal}
          districts={districts}
          sections={sections}
          handleGetDistrictByMunicap={handleGetDistrictByMunicap}
          handleGetSectionsByDistrict={handleGetSectionsByDistrict}
          form={form}
          handleCloseModal={handleCloseModal}
          typeMeta={typeMeta}
        />
      </ModalC>
    </LayoutC>
  );
};

export default GoalPage;
