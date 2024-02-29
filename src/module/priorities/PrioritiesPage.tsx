import LayoutC from "@/components/LayoutC";
import React, { useEffect } from "react";
import { Button, Col, FormInstance, Row } from "antd";
import ModalC from "@/components/ModalC";
import { usePriorityHook } from "./hook/usePriorityHook";
import PriorityForm from "./components/PriorityForm";
import { Priority } from "./store";

const PrioritiesPage: React.FC = () => {
  const {
    municipal,
    districts,
    sections,
    isModalOpen,
    form,
    handleGetDistrictByMunicap,
    handleGetSectionsByDistrict,
    handleOpenModal,
    handleCloseModal,
  } = usePriorityHook();

  useEffect(() => {
    // handleGetGoals("");
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
          onClick={() => handleOpenModal()}
        >
          {" "}
          Agregar una grafica prioritaria{" "}
        </Button>
      </div>
      {/* <Row gutter={[10, 10]}>
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
      </Row> */}
      <ModalC
        title="Agregar Grafica Prioritaria"
        isModalOpen={isModalOpen}
        handleOk={() => handleOpenModal()}
        handleCancel={handleCloseModal}
      >
        <PriorityForm
          form={form}
          municipal={municipal}
          districts={districts}
          sections={sections}
          handleGetDistrictByMunicap={handleGetDistrictByMunicap}
          handleGetSectionsByDistrict={handleGetSectionsByDistrict}
        />
      </ModalC>
    </LayoutC>
  );
};

export default PrioritiesPage;
