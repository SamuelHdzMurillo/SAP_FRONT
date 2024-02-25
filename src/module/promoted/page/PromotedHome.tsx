/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import LayoutC from "@/components/LayoutC";
import TableC from "@/components/TableC";
import { usePromotedC } from "../hooks/usePromotedC";
import { useEffect, useState } from "react";

import { usePromotedStore } from "../store";
import { Alert, Button, Dropdown, Select } from "antd";
import ModalC from "@/components/ModalC";
import ProblemForm from "../components/ProblemForm";
import { getPromotorsCatalog } from "@/api/CatalogHttp";
import { useAlertStore } from "@/components/alerts/alertStore";
import FormExportUbi from "../components/FormExportUbi";
import { useAuthStore } from "@/module/auth/auth";

const PromotedHome = () => {
  const {
    columns,
    loading,
    tableParams,
    isModalOpen,
    form,
    alertImport,
    items,
    typeExport,
    municipal,
    districts,
    sections,
    formExport,
    setFileImport,
    handleGetUsers: handleGetPromoteds,
    handleTableChange,
    handleOpenModal,
    handleCloseModal,
    handleImport,
    setPromotorSelected,
    handleGetDistrictByMunicap,
    handleGetSectionsByDistrict,
    handleExportExcel,
    handleChangeDistrict,
    handleChangeSection,
  } = usePromotedC();

  const promotedsStore = usePromotedStore((state) => state.promoteds);

  const clearAlert = useAlertStore((state) => state.clearAlert);
  const userType = useAuthStore((state) => state.user_type);
  const type = usePromotedStore((state) => state.typeForm);
  const [usersCatalog, setUsersCatalog] = useState([]);
  useEffect(() => {
    handleGetPromoteds();
    const handleGetUsersCatalog = async () => {
      const { data } = await getPromotorsCatalog();
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
      {userType === "superadmin" && (
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            marginBottom: 20,
            gap: 10,
          }}
        >
          <Button
            style={{
              backgroundColor: "#1C1C1C",
            }}
            type="primary"
            onClick={() => handleExportExcel()}
          >
            {" "}
            Importar{" "}
          </Button>
          <Dropdown menu={{ items }}>
            <Button
              type="primary"
              style={{
                margin: "20px 0px 20px 0px",
              }}
            >
              Opciones
            </Button>
          </Dropdown>
        </div>
      )}

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

            {type == "post" ? (
              <>
                <input
                  type="file"
                  name="file"
                  accept=".xlsx, .xls, .csv"
                  onChange={(e) => {
                    setFileImport(e.target.files?.[0]);
                  }}
                />
                <Select
                  showSearch
                  placeholder="Selecciona un Promotor"
                  optionFilterProp="children"
                  filterOption={filterOption}
                  options={usersCatalog}
                  onChange={(value) => setPromotorSelected(value)}
                />
              </>
            ) : (
              <FormExportUbi
                form={formExport}
                municipal={municipal}
                districts={districts}
                sections={sections}
                typeExport={typeExport}
                filterOption={filterOption}
                handleChangeDistrict={handleChangeDistrict}
                handleChangeSection={handleChangeSection}
                handleGetDistrictByMunicap={handleGetDistrictByMunicap}
                handleGetSectionsByDistrict={handleGetSectionsByDistrict}
              />
            )}
            <Button
              style={{
                backgroundColor: "#1C1C1C",
              }}
              loading={loading}
              type="primary"
              onClick={() => {
                type === "post" ? handleImport() : handleExportExcel();
              }}
            >
              {type === "post" ? "Importar" : "Exportar"}
            </Button>
          </div>
        )}
      </ModalC>
    </LayoutC>
  );
};

export default PromotedHome;
