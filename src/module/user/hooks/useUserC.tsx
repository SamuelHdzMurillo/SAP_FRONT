import { Form, type TableColumnsType } from "antd";
import { User, useUserStore } from "../store";
import DropDownUH from "../components/DropDownUH";
import { TablePaginationConfig, TableProps } from "antd";
import { getAllUser, getUser } from "../api";
import { useState } from "react";
import { useFilterTable } from "@/components/filterTable/useFilterTable";
const URL = import.meta.env.VITE_API_URL;
interface TableParams {
  pagination?: TablePaginationConfig;
}
// import { UserType } from "../page/UserHome";
export const useUserC = () => {
  const setUsers = useUserStore((state) => state.setUsers);
  const setUser = useUserStore((state) => state.setUser);
  const setTypeForm = useUserStore((state) => state.setTypeForm);
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

  const handleGetUser = async (id: number) => {
    const data = await getUser(id);
    form.setFieldsValue(data);
    setTypeForm("put");
    setUser(data);
  };
  const handleGetFilterData = async (
    value: string,
    dataIndex: string | number
  ) => {
    const { data, meta } = await getAllUser({ [`${dataIndex}`]: value, page: "1" });
    setTableParams({
      ...tableParams,
      pagination: {
        ...tableParams.pagination,
        total: meta.total,
      },
    });
    setUsers(data);
    return data;
  };
  const { getColumnSearchProps } = useFilterTable({
    onFilter: handleGetFilterData,
  });
  // const [typeForm, setTypeForm] = useState<"post" | "put" | "password">("post");
  const columns: TableColumnsType<User> = [
    {
      title: "",
      dataIndex: "profile_img_path",
      key: "profile_img_path",
      responsive: ["md"],
      render: (text) => (
        <img
          src={`${URL}/storage/${text}`}
          alt="profile"
          style={{ width: "50px", height: "50px", borderRadius: "50%" }}
        />
      ),
    },
    {
      title: "Nombre",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
      ...getColumnSearchProps("name"),
    },
    {
      title: "Correo Electronico",
      dataIndex: "email",
      key: "email",
      responsive: ["md"],
      ...getColumnSearchProps("email"),
    },
    {
      title: "Numero de telefono",
      dataIndex: "phone_number",
      key: "phone_number",
      responsive: ["lg"],
      ...getColumnSearchProps("phone_number"),
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
    form.resetFields();
    setTypeForm("post");
    if (type === "put") {
      form.setFieldsValue(record);
      setTypeForm("put");
      setUser(record as User);
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const handleTableChange: TableProps<User>["onChange"] = async (
    pagination
  ) => {
    setLoading(true);
    setTableParams({
      pagination,
    });
    const { data } = await getAllUser({ page: pagination.current?.toString() });

    setUsers(data);

    // `dataSource` is useless since `pageSize` changed
    if (pagination.pageSize !== tableParams.pagination?.pageSize) {
      setUsers([]);
    }
    setLoading(false);
  };
  const handleGetUsers = async () => {
    const { data, meta } = await getAllUser({ page: "1" });
    setLoading(true);

    setUsers(data);
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
    handleGetUser,
  };
};
