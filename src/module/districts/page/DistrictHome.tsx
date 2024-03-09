/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import LayoutC from "@/components/LayoutC";
import TableC from "@/components/TableC";
import { useDistrictsC } from "../hooks/useDistrictsC";
import { useEffect } from "react";

import { useDistrictStore } from "../store";

const DistrictHome = () => {
  const {
    columns,
    loading,
    tableParams,
    handleGetDistricts,
    handleTableChange,
  } = useDistrictsC();

  const usersStore = useDistrictStore((state) => state.districts);

  useEffect(() => {
    handleGetDistricts();
  }, []);

  return (
    <LayoutC
      items={[
        {
          title: "Distritos",
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
        handleAdd={null}
        children={null}
      />
    </LayoutC>
  );
};

export default DistrictHome;
