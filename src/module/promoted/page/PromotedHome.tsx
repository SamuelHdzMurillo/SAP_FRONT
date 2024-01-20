/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import LayoutC from "@/components/LayoutC";
import TableC from "@/components/TableC";
import { usePromotedC } from "../hooks/usePromotedC";
import { useEffect } from "react";

import { usePromotedStore } from "../store";

const PromotedHome = () => {
  const {
    columns,
    handleOpenModal,
    loading,
    handleGetUsers,
    handleTableChange,
    tableParams,
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
      title={""}
    >
      <TableC
        dataSource={promotedsStore}
        columns={columns}
        pagination={tableParams.pagination}
        handleTableChange={handleTableChange}
        loading={loading}
        handleAdd={handleOpenModal}
        children={"Agregar Usuario"}
      />
    </LayoutC>
  );
};

export default PromotedHome;
