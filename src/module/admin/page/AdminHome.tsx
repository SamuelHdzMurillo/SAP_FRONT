/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import LayoutC from "@/components/LayoutC";
import TableC from "@/components/TableC";
import { useAdminC } from "../hooks/useAdminC";
import { useEffect } from "react";

import ModalC from "@/components/ModalC";
import AdminsForm from "../components/AdminsForm";
import { useAdminStore } from "../store";

const AdminHome = () => {
  const {
    columns,
    form,
    isModalOpen,
    loading,
    tableParams,
    titleModal,
    handleCloseModal,
    handleOpenModal,
    handleGetAdmins,
    handleTableChange,
  } = useAdminC();

  const adminStore = useAdminStore((state) => state.admins);

  useEffect(() => {
    handleGetAdmins();
  }, []);

  return (
    <LayoutC
      items={[
        {
          title: "Administradores",
        },
      ]}
      title={""}
    >
      <TableC
        dataSource={adminStore}
        columns={columns}
        pagination={tableParams.pagination}
        handleTableChange={handleTableChange}
        loading={loading}
        handleAdd={handleOpenModal}
        children={"Agregar administrador"}
      />
      <ModalC
        title={titleModal}
        isModalOpen={isModalOpen}
        handleOk={handleOpenModal}
        handleCancel={handleCloseModal}
      >
        <AdminsForm form={form} handleCloseModal={handleCloseModal} />
      </ModalC>
    </LayoutC>
  );
};

export default AdminHome;
