/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import LayoutC from "@/components/LayoutC";
import TableC from "@/components/TableC";
import { useProblemC } from "../hooks/useProblemC";
import { useEffect } from "react";

import { useProblemStore } from "../store";
import ModalC from "@/components/ModalC";
import ProblemC from "@/module/promoted/components/Problems/ProblemC";

const ProblemHome = () => {
  const {
    columns,
    isModalOpen,
    loading,
    tableParams,
    handleGetUsers,
    handleTableChange,
    handleOpenModal,
    handleCloseModal,
  } = useProblemC();

  const problemsStore = useProblemStore((state) => state.problems);
  const problem = useProblemStore((state) => state.problem);
  useEffect(() => {
    handleGetUsers();
  }, []);

  return (
    <LayoutC
      items={[
        {
          title: "Problemas",
        },
      ]}
      title={"Problemas"}
    >
      <TableC
        dataSource={problemsStore}
        columns={columns}
        pagination={tableParams.pagination}
        handleTableChange={handleTableChange}
        loading={loading}
        children={"Agregar Usuario"}
      />
      <ModalC
        title="Mostrar Problema"
        isModalOpen={isModalOpen}
        handleOk={() => handleOpenModal("post")}
        handleCancel={handleCloseModal}
      >
        <ProblemC {...problem} />
      </ModalC>
    </LayoutC>
  );
};

export default ProblemHome;
