import { Form, Tag, type TableColumnsType } from "antd";
import { Problem, useProblemStore } from "../store";
import DropDownPMS from "../components/DropDownPMS";
import { TablePaginationConfig, TableProps } from "antd";
import { getAllProblem } from "../api";
import { useState } from "react";
interface TableParams {
  pagination?: TablePaginationConfig;
}
export const useProblemC = () => {
  const setProblems = useProblemStore((state) => state.setProblems);
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 10,
      total: 50,
    },
  });
  const columns: TableColumnsType<Problem> = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Promovido",
      dataIndex: "promoted_name",
      key: "promoted_name",
      render: (text) => <Tag color="rgb(143, 143, 42)">{text}</Tag>,
    },
    {
      title: "Numero de seccion",
      dataIndex: "section_number",
      key: "section_number",
      render: (text) => <Tag color="rgb(42, 43, 43)">{text}</Tag>,
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <DropDownPMS record={record} handleOpenModal={handleOpenModal} />
      ),
    },
  ];
  const handleOpenModal = (type: "post" | "put" | "problem", record = {}) => {
    // console.log(record, "usePromotedC")
    form.resetFields();
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
    });

    setProblems(data);

    // `dataSource` is useless since `pageSize` changed
    if (pagination.pageSize !== tableParams.pagination?.pageSize) {
      setProblems([]);
    }
    setLoading(false);
  };

  const handleGetUsers = async () => {
    const { data, meta } = await getAllProblem({ page: "1" });
    setLoading(true);

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
