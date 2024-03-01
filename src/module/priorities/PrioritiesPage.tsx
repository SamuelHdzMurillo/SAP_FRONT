import LayoutC from "@/components/LayoutC";
import React, { useEffect } from "react";
import { Button, Col, Row } from "antd";
import ModalC from "@/components/ModalC";
import { usePriorityHook } from "./hook/usePriorityHook";
import PriorityForm from "./components/PriorityForm";
import PriorityChart from "./components/PriorityChart";
import { usePriorityStore } from "./store";

const PrioritiesPage: React.FC = () => {
  const {
    municipal,
    districts,
    sections,
    isModalOpen,
    form,
    sectionsSelects,
    handleGetDistrictByMunicap,
    handleGetSectionsByDistrict,
    handleOpenModal,
    handleCloseModal,
    handleSetSectionsSelects,
    handleGetPriorities,
  } = usePriorityHook();

  const priorities = usePriorityStore((state) => state.priorities);

  const options2 = {
    chart: {
      type: "bar",
    },
    series: [
      {
        data: [
          {
            x: "category A",
            y: 10,
          },
          {
            x: "category B",
            y: 18,
          },
          {
            x: "category C",
            y: 13,
          },
        ],
      },
    ],
  };
  useEffect(() => {
    handleGetPriorities();
    // handleGetGoals("");
    // Your code here
  }, []);
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
      <Row gutter={[10, 10]}>
        {priorities.length > 0 &&
          priorities.map((goal, index) => (
            <Col key={index + 2} span={24} sm={12}>
              <PriorityChart
                handleDeleteGoal={() => console.log("delete")}
                title={goal.name}
                options={{
                  ...options2,
                  chart: { ...options2.chart, type: "bar" },
                }}
                data={goal}
                type="bar"
                series={[
                  {
                    data: goal.promotedsByPriority,
                  },
                ]}
              />
            </Col>
          ))}
      </Row>
      <ModalC
        title="Agregar Grafica Prioritaria"
        isModalOpen={isModalOpen}
        handleOk={() => handleOpenModal()}
        handleCancel={handleCloseModal}
      >
        <PriorityForm
          sectionsSelects={sectionsSelects}
          form={form}
          handleSetSectionsSelects={handleSetSectionsSelects}
          municipal={municipal}
          districts={districts}
          sections={sections}
          handleCloseModal={handleCloseModal}
          handleGetDistrictByMunicap={handleGetDistrictByMunicap}
          handleGetSectionsByDistrict={handleGetSectionsByDistrict}
        />
      </ModalC>
    </LayoutC>
  );
};

export default PrioritiesPage;
