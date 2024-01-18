import { Form, type TableColumnsType } from "antd";
import { User, useUserStore } from "../store";
import DropDownUH from "../components/DropDownUH";
import { TablePaginationConfig, TableProps } from "antd";
import { getAllUser } from "../api";
import { useState } from "react";
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
      title: "Action",
      key: "action",
      render: (_, record) => (
        <DropDownUH record={record} handleOpenModal={handleOpenModal} />
      ),
    },
  ];
  const handleOpenModal = (type = "post", record = {}) => {
    // console.log(record, "useUserC")
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
