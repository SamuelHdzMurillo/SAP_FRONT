import { Form, Tag, type TableColumnsType } from "antd";
import { Problem, useProblemStore } from "../store";
import DropDownPMS from "../components/DropDownPMS";
import { TablePaginationConfig, TableProps } from "antd";
import { getAllProblem } from "../api";
import { useState } from "react";
import { useFilterTable } from "@/components/filterTable/useFilterTable";
interface TableParams {
  pagination?: TablePaginationConfig;
}
export const useProblemC = () => {
  const setProblems = useProblemStore((state) => state.setProblems);
  const setProblem = useProblemStore((state) => state.setProblem);
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [params, setParams] = useState<any>({}); // eslint-disable-line
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 10,
      total: 50,
    },
  });
  const handleGetFilterData = async (
    value: string,
    dataIndex: string | number
  ) => {
    const { data, meta } = await getAllProblem({
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
        total: meta.total,
      },
    });
    setProblems(data);
    setLoading(false);
    return data;
  };
  const { getColumnSearchProps } = useFilterTable({
    onFilter: handleGetFilterData,
  });
  const columns: TableColumnsType<Problem> = [
    {
      title: "Problema",
      dataIndex: "title",
      key: "title",
      ...getColumnSearchProps("title"),
    },
    {
      title: "Promovido",
      dataIndex: "promoted_name",
      key: "promoted_name",
      ...getColumnSearchProps("promoted_name"),
      render: (text) => <Tag color="rgb(143, 143, 42)">{text}</Tag>,
    },
    {
      title: "Numero de seccion",
      dataIndex: "section_number",
      key: "section_number",
      ...getColumnSearchProps("section_number"),
      render: (text) => <Tag color="rgb(42, 43, 43)">{text}</Tag>,
    },
    {
      title: "Acciones",
      key: "action",
      render: (_, record) => (
        <DropDownPMS record={record} handleOpenModal={handleOpenModal} />
      ),
    },
  ];
  const handleOpenModal = (
    type: "post" | "put" | "problem",
    record: Problem = {
      id: 0,
      title: "",
      description: "",
      problem_img_path: "",
      promoted_id: 0,
    }
  ) => {
    // console.log(record, "usePromotedC")
    form.resetFields();
    setProblem(record);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const handleTableChange: TableProps<Problem>["onChange"] = async (
    pagination
  ) => {
    setLoading(true);
    setTableParams({
      pagination,
    });
    const { data } = await getAllProblem({
      page: pagination.current?.toString(),
      ...params,
    });

    setProblems(data);

    // `dataSource` is useless since `pageSize` changed
    if (pagination.pageSize !== tableParams.pagination?.pageSize) {
      setProblems([]);
    }
    setLoading(false);
  };

  const handleGetUsers = async () => {
    setLoading(true);
    const { data, meta } = await getAllProblem({ page: "1" });

    setProblems(data);
    setTableParams({
      ...tableParams,
      pagination: {
        ...tableParams.pagination,
        total: meta.total,
      },
    });
    setLoading(false);
  };

  return {
    columns,
    isModalOpen,
    form,
    loading,
    tableParams,
    handleCloseModal,
    handleOpenModal,
    setLoading,
    handleGetUsers,
    handleTableChange,
  };
};
