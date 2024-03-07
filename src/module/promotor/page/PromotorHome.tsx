/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import LayoutC from "@/components/LayoutC";
import TableC from "@/components/TableC";
import { usePromotorC } from "../hooks/usePromotorC";
import { useEffect } from "react";

import { usePromotorStore } from "../store";

import ModalC from "@/components/ModalC";
import UsersForm from "../components/PromotorsForm";

const PromotorHome = () => {
  const {
    columns,
    form,
    isModalOpen,
    loading,
    tableParams,
    titleModal,
    handleCloseModal,
    handleOpenModal,
    handleGetPromotors,
    handleTableChange,
  } = usePromotorC();

  const promotorsStore = usePromotorStore((state) => state.promotors);

  useEffect(() => {
    handleGetPromotors();
  }, []);

  return (
    <LayoutC
      items={[
        {
          title: "Promotores",
        },
      ]}
      title={""}
    >
      <TableC
        dataSource={promotorsStore}
        columns={columns}
        pagination={tableParams.pagination}
        handleTableChange={handleTableChange}
        loading={loading}
        handleAdd={handleOpenModal}
        children={"Agregar promotor"}
      />
      <ModalC
        title={titleModal}
        isModalOpen={isModalOpen}
        handleOk={handleOpenModal}
        handleCancel={handleCloseModal}
      >
        <UsersForm form={form} handleCloseModal={handleCloseModal} />
      </ModalC>
    </LayoutC>
  );
};

export default PromotorHome;
