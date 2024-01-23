/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import LayoutC from "@/components/LayoutC";
import TableC from "@/components/TableC";
import { usePromotedC } from "../hooks/usePromotedC";
import { useEffect } from "react";

import { usePromotedStore } from "../store";
import { Button } from "antd";
import ModalC from "@/components/ModalC";

const PromotedHome = () => {
  const {
    columns,
    loading,
    tableParams,
    isModalOpen,
    setFileImport,
    handleGetUsers,
    handleTableChange,
    handleExportExcel,
    handleOpenModal,
    handleCloseModal,
    handleImport,
  } = usePromotedC();

  const promotedsStore = usePromotedStore((state) => state.promoteds);

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
        <Button type="primary" onClick={() => handleOpenModal()}>
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
        handleOk={handleOpenModal}
        handleCancel={handleCloseModal}
      >
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
          <Button type="primary" onClick={handleImport}>
            Importar
          </Button>
        </div>
      </ModalC>
    </LayoutC>
  );
};

export default PromotedHome;
