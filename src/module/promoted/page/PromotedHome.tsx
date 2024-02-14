/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import LayoutC from "@/components/LayoutC";
import TableC from "@/components/TableC";
import { usePromotedC } from "../hooks/usePromotedC";
import { useEffect, useState } from "react";

import { usePromotedStore } from "../store";
import { Alert, Button, Select } from "antd";
import ModalC from "@/components/ModalC";
import ProblemForm from "../components/ProblemForm";
import { useAuthStore } from "@/module/auth/auth";
import { getUsersCatalog } from "@/api/CatalogHttp";
import { useAlertStore } from "@/components/alerts/alertStore";

const PromotedHome = () => {
  const {
    columns,
    loading,
    tableParams,
    isModalOpen,
    form,
    alertImport,
    setFileImport,
    handleGetUsers: handleGetPromoteds,
    handleTableChange,
    handleExportExcel,
    handleOpenModal,
    handleCloseModal,
    handleImport,
    setPromotorSelected,
  } = usePromotedC();

  const promotedsStore = usePromotedStore((state) => state.promoteds);

  const clearAlert = useAlertStore((state) => state.clearAlert);
  const type = usePromotedStore((state) => state.typeForm);
  const user_type = useAuthStore((state) => state.user_type);
  const [usersCatalog, setUsersCatalog] = useState([]);
  useEffect(() => {
    handleGetPromoteds();
    const handleGetUsersCatalog = async () => {
      const { data } = await getUsersCatalog();
      setUsersCatalog(data);
    };
    setTimeout(() => {
      clearAlert();
    }, 3000);
    handleGetUsersCatalog();
  }, []);
  const filterOption = (
    input: string,
    option?: { label: string; value: string }
  ) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

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
        <Button
          type="default"
          onClick={() => {
            window.location.href = 'http://127.0.0.1:8000/api/export-excel-template';
          }}
        >
          Descargar Plantilla
        </Button>
        {user_type === "superadmin" && (
          <Button type="default" onClick={handleExportExcel}>
            {" "}
            Exportar{" "}
          </Button>
        )}
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
            
            {alertImport.isShow && (
              <Alert 
                message={alertImport.message}
                type={alertImport.type}
                showIcon
              />
            )}
            <input
              type="file"
              name="file"
              accept=".xlsx, .xls, .csv"
              onChange={(e) => {
                setFileImport(e.target.files?.[0]);
              }}
            />
            {user_type == "superadmin" && (
              <Select
                showSearch
                placeholder="Selecciona un Promotor"
                optionFilterProp="children"
                filterOption={filterOption}
                options={usersCatalog}
                onChange={(value) => setPromotorSelected(value)}
              />
            )}
<Button
          type="default"
          onClick={() => {
            window.location.href = 'http://127.0.0.1:8000/api/export-excel-template';
          }}
        >
          Descargar Plantilla
        </Button>
            <Button
              style={{
                backgroundColor: "#1C1C1C",
              }}
              loading={loading}
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
