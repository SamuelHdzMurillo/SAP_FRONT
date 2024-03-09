import { Form, type TableColumnsType } from "antd";
import DropDownUH from "../components/DropDownAdmin";
import { TablePaginationConfig, TableProps } from "antd";
import { useState } from "react";
import { useFilterTable } from "@/components/filterTable/useFilterTable";
import profilePhoto from "@/assets/imgs/foto_default.png";
import { Admin, useAdminStore } from "../store";
import { getAdmin, getAllAdmin } from "../api";
const URL = import.meta.env.VITE_API_URL;
interface TableParams {
  pagination?: TablePaginationConfig;
}
// import { AdminType } from "../page/AdminHome";
export const useAdminC = () => {
  const setAdmins = useAdminStore((state) => state.setAdmins);
  const setAdmin = useAdminStore((state) => state.setAdmin);
  const [titleModal, setTitleModal] = useState("Agregar Administrador");
  const setTypeForm = useAdminStore((state) => state.setTypeForm);
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
  const [params, setParams] = useState<any>({}); // eslint-disable-line

  const handleGetAdmin = async (id: number) => {
    setTitleModal("Editar Administrador");
    const data = await getAdmin(id);
    form.setFieldsValue(data);
    setTypeForm("put");
    setAdmin(data);
  };
  const handleGetFilterData = async (
    value: string,
    dataIndex: string | number
  ) => {
    const { data, meta } = await getAllAdmin({
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
    setAdmins(data);
    setLoading(false);
    return data;
  };
  const { getColumnSearchProps } = useFilterTable({
    onFilter: handleGetFilterData,
  });
  // const [typeForm, setTypeForm] = useState<"post" | "put" | "password">("post");
  const columns: TableColumnsType<Admin> = [
    {
      title: "",
      dataIndex: "profile_img_path",
      key: "profile_img_path",
      responsive: ["md"],
      render: (text) => (
        <img
          src={text !== null ? `${URL}/storage/${text}` : profilePhoto}
          alt="profile"
          style={{
            width: "50px",
            height: "50px",
            borderRadius: "50%",
            objectFit: "cover",
          }}
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
    setTitleModal("Agregar administrador");
    form.resetFields();
    setTypeForm("post");
    if (type === "put") {
      setTitleModal("Editar administrador");
      form.setFieldsValue(record);
      setTypeForm("put");
      setAdmin(record as Admin);
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const handleTableChange: TableProps<Admin>["onChange"] = async (
    pagination
  ) => {
    setLoading(true);
    setTableParams({
      pagination,
    });
    const { data } = await getAllAdmin({
      page: pagination.current?.toString(),
      ...params,
    });

    setAdmins(data);

    // `dataSource` is useless since `pageSize` changed
    if (pagination.pageSize !== tableParams.pagination?.pageSize) {
      setAdmins([]);
    }
    setLoading(false);
  };
  const handleGetAdmins = async () => {
    setLoading(true);
    const { data, meta } = await getAllAdmin({ page: "1" });

    setAdmins(data);
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
    titleModal,
    handleCloseModal,
    handleOpenModal,
    setLoading,
    handleGetAdmins,
    handleTableChange,
    handleGetAdmin,
  };
};
