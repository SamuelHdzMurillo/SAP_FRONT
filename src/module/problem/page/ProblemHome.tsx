/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import LayoutC from "@/components/LayoutC";
import TableC from "@/components/TableC";
import { useProblemC } from "../hooks/useProblemC";
import { useEffect } from "react";

import { useProblemStore } from "../store";

const ProblemHome = () => {
  const { columns, loading, tableParams, handleGetUsers, handleTableChange } =
    useProblemC();

  const problemsStore = useProblemStore((state) => state.problems);

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
    </LayoutC>
  );
};

export default ProblemHome;
