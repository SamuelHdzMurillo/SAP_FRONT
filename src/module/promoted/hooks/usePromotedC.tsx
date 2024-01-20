import { Form, type TableColumnsType } from "antd";
import { Promoted, usePromotedStore } from "../store";
import DropDownUH from "../components/DropDownUH";
import { TablePaginationConfig, TableProps } from "antd";
import { getAllUser } from "../api";
import { useState } from "react";
const URL = import.meta.env.VITE_API_URL;
interface TableParams {
  pagination?: TablePaginationConfig;
}
// import { UserType } from "../page/UserHome";
export const usePromotedC = () => {
  const setPromoteds = usePromotedStore((state) => state.setPromoteds);
  const setPromoted = usePromotedStore((state) => state.setPromoted);
  const setTypeForm = usePromotedStore((state) => state.setTypeForm);
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
  // const [typeForm, setTypeForm] = useState<"post" | "put" | "password">("post");
  const columns: TableColumnsType<Promoted> = [
    {
      title: "Nombre",
      dataIndex: "name",
      key: "name",
      render: (_, record) => (
        <a>
          {record.name} {record.last_name}
        </a>
      ),
    },
    {
      title: "Correo Electronico",
      dataIndex: "email",
      key: "email",
      responsive: ["md"],
    },
    {
      title: "Numero de telefono",
      dataIndex: "phone_number",
      key: "phone_number",
      responsive: ["lg"],
    },
    {
      title: "Dirección",
      dataIndex: "adress",
      key: "adress",
      responsive: ["lg"],
    },
    {
      title: "Llave Electoral",
      dataIndex: "electoral_key",
      key: "electoral_key",
      responsive: ["lg"],
    },
    {
      title: "CURP",
      dataIndex: "curp",
      key: "curp",
      responsive: ["lg"],
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <DropDownUH record={record} handleOpenModal={handleOpenModal} />
      ),
    },
  ];
  const handleOpenModal = (type = "post", record = {}) => {
    // console.log(record, "usePromotedC")
    form.resetFields();
    setTypeForm("post");
    if (type === "put") {
      form.setFieldsValue(record);
      setTypeForm("put");
      setPromoted(record as Promoted);
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const handleTableChange: TableProps<Promoted>["onChange"] = async (
    pagination
  ) => {
    setLoading(true);
    setTableParams({
      pagination,
    });
    const { data } = await getAllUser({ page: pagination.current?.toString() });

    setPromoteds(data);

    // `dataSource` is useless since `pageSize` changed
    if (pagination.pageSize !== tableParams.pagination?.pageSize) {
      setPromoteds([]);
    }
    setLoading(false);
  };
  const handleGetUsers = async () => {
    const { data, meta } = await getAllUser({ page: "1" });
    setLoading(true);

    setPromoteds(data);
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
    handleCloseModal,
    isModalOpen,
    form,
    handleOpenModal,
    loading,
    setLoading,
    handleGetUsers,
    handleTableChange,
    tableParams,
  };
};
