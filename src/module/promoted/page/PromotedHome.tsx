/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import LayoutC from "@/components/LayoutC";
import TableC from "@/components/TableC";
import { usePromotedC } from "../hooks/usePromotedC";
import { useEffect } from "react";

import { usePromotedStore } from "../store";
import { Button } from "antd";
import ModalC from "@/components/ModalC";
import ProblemForm from "../components/ProblemForm";

const PromotedHome = () => {
  const {
    columns,
    loading,
    tableParams,
    isModalOpen,
    form,
    setFileImport,
    handleGetUsers,
    handleTableChange,
    handleExportExcel,
    handleOpenModal,
    handleCloseModal,
    handleImport,
  } = usePromotedC();

  const promotedsStore = usePromotedStore((state) => state.promoteds);
  const type = usePromotedStore((state) => state.typeForm);

  useEffect(() => {
    handleGetUsers();
  }, []);

  return (
    <LayoutC
      items={[
        {
          title: "Promovidos",
        },
      ]}
      title={"Promovidos"}
    >
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
          onClick={() => handleOpenModal("post")}
        >
          {" "}
          Importar{" "}
        </Button>
        <Button type="default" onClick={handleExportExcel}>
          {" "}
          Exportar{" "}
        </Button>
      </div>
      <TableC
        dataSource={promotedsStore}
        columns={columns}
        pagination={tableParams.pagination}
        handleTableChange={handleTableChange}
        loading={loading}
        children={"Agregar Usuario"}
      />
      <ModalC
        title="Exportar Promovidos"
        isModalOpen={isModalOpen}
        handleOk={() => handleOpenModal("post")}
        handleCancel={handleCloseModal}
      >
        {type === "problem" ? (
          <ProblemForm form={form} handleCloseModal={handleCloseModal} />
        ) : (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 10,
            }}
          >
            <input
              type="file"
              name="file"
              accept=".xlsx, .xls, .csv"
              onChange={(e) => {
                setFileImport(e.target.files?.[0]);
              }}
            />
            <Button
              style={{
                backgroundColor: "#1C1C1C",
              }}
              type="primary"
              onClick={handleImport}
            >
              Importar
            </Button>
          </div>
        )}
      </ModalC>
    </LayoutC>
  );
};

export default PromotedHome;
