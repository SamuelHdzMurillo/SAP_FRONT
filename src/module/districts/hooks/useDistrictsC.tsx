import { Form, type TableColumnsType } from "antd";
import { DistrictA, useDistrictStore } from "../store";
// import DropDownUH from "../components/DropDownUH";
import { TablePaginationConfig, TableProps } from "antd";
import { useState } from "react";
import { useFilterTable } from "@/components/filterTable/useFilterTable";
import {
  getAllDistricts,
  getCountPromotedsDistricts,
  getDistrict,
} from "../api";
import DropDownDistricts from "../components/DropDownDistricts";
interface TableParams {
  pagination?: TablePaginationConfig;
}
// import { DistrictAType } from "../page/DistrictAHome";
export const useDistrictsC = () => {
  const setDistricts = useDistrictStore((state) => state.setDistricts);
  const setDistrict = useDistrictStore((state) => state.setDistrict);
  const [countPromoted, setCountPromoted] = useState<number>(0);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 10,
      total: 50,
    },
  });
  const [params, setParams] = useState<any>({}); // eslint-disable-line

  const handleGetFilterData = async (
    value: string,
    dataIndex: string | number
  ) => {
    const { data, pagination } = await getAllDistricts({
      [`${dataIndex}`]: value,
      page: "1",
    });
    setParams({
      ...params,
      [`${dataIndex}`]: value,
    });
    setLoading(true);
    setTableParams({
      ...tableParams,
      pagination: {
        ...tableParams.pagination,
        total: pagination.total,
      },
    });
    setDistricts(data);
    setLoading(false);
    return data;
  };
  const { getColumnSearchProps } = useFilterTable({
    onFilter: handleGetFilterData,
  });
  const columns: TableColumnsType<DistrictA> = [
    {
      title: "Distrito",
      dataIndex: "number",
      key: "number",
      render: (text) => <a>{text}</a>,
      ...getColumnSearchProps("number"),
    },
    {
      title: "Municipio",
      dataIndex: "municipal",
      key: "municipal",
      responsive: ["md"],
      ...getColumnSearchProps("municipal"),
    },
    {
      title: "Cant. Secciones",
      dataIndex: "section_count",
      key: "section_count",
      responsive: ["lg"],
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => <DropDownDistricts record={record} />,
    },
  ];
  const handleTableChange: TableProps<DistrictA>["onChange"] = async (
    pagination
  ) => {
    setLoading(true);
    setTableParams({
      pagination,
    });
    const { data } = await getAllDistricts({
      page: pagination.current?.toString(),
      ...params,
    });

    setDistricts(data);

    // `dataSource` is useless since `pageSize` changed
    if (pagination.pageSize !== tableParams.pagination?.pageSize) {
      setDistricts([]);
    }
    setLoading(false);
  };
  const handleGetDistricts = async () => {
    setLoading(true);
    const { data, pagination } = await getAllDistricts({ page: "1" });

    setDistricts(data);
    setTableParams({
      ...tableParams,
      pagination: {
        ...tableParams.pagination,
        total: pagination.total,
      },
    });
    setLoading(false);
  };

  const handleGetDistrict = async (id: number) => {
    setLoading(true);
    const data = await getDistrict(id);
    setDistrict(data);
    setLoading(false);
    // setDistricts()
  };
  const handleCountPromoteds = async (id: string) => {
    // console.log("id", id);
    const data = await getCountPromotedsDistricts(id);
    setCountPromoted(data.promoted_count);
  };
  return {
    columns,
    form,
    loading,
    tableParams,
    countPromoted,
    setLoading,
    handleGetDistrict,
    handleGetDistricts,
    handleTableChange,
    handleCountPromoteds,
  };
};
