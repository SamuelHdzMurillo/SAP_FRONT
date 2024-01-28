/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import LayoutC from "@/components/LayoutC";
import TableC from "@/components/TableC";
import { useUserC } from "../hooks/useUserC";
import { useEffect } from "react";

import { useUserStore } from "../store";

import ModalC from "@/components/ModalC";
import UsersForm from "../components/UsersForm";

const UserHome = () => {
  const {
    columns,
    form,
    isModalOpen,
    loading,
    tableParams,
    handleCloseModal,
    handleOpenModal,
    handleGetUsers,
    handleTableChange,
  } = useUserC();

  const usersStore = useUserStore((state) => state.users);

  useEffect(() => {
    handleGetUsers();
  }, []);

  return (
    <LayoutC
      items={[
        {
          title: "Usuarios",
        },
      ]}
      title={""}
    >
      <TableC
        dataSource={usersStore}
        columns={columns}
        pagination={tableParams.pagination}
        handleTableChange={handleTableChange}
        loading={loading}
        handleAdd={handleOpenModal}
        children={"Agregar Usuario"}
      />
      <ModalC
        title="Agregar Usuario"
        isModalOpen={isModalOpen}
        handleOk={handleOpenModal}
        handleCancel={handleCloseModal}
      >
        <UsersForm form={form} handleCloseModal={handleCloseModal} />
      </ModalC>
    </LayoutC>
  );
};

export default UserHome;
