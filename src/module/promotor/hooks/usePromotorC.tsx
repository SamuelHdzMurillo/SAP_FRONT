import { Form, Tag, type TableColumnsType } from "antd";
import { Promotor, usePromotorStore } from "../store";
import { TablePaginationConfig, TableProps } from "antd";
import { getAllPromotor, getPromotor } from "../api";
import { useState } from "react";
import DropDownPromo from "../components/DropDownPromo";
import { useFilterTable } from "@/components/filterTable/useFilterTable";
const URL = import.meta.env.VITE_API_URL;
interface TableParams {
  pagination?: TablePaginationConfig;
}
// import { PromotorType } from "../page/PromotorHome";
export const usePromotorC = () => {
  const setPromotors = usePromotorStore((state) => state.setPromotors);
  const setPromotor = usePromotorStore((state) => state.setPromotor);
  const setTypeForm = usePromotorStore((state) => state.setTypeForm);
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

  const handleGetPromotor = async (id: number) => {
    const data = await getPromotor(id);
    form.setFieldsValue(data);
    setTypeForm("put");
    setPromotor(data);
  };
  const handleGetFilterData = async (
    value: string,
    dataIndex: string | number
  ) => {
    const { data } = await getAllPromotor({
      [`${dataIndex}`]: value,
      page: "1",
    });
    setPromotors(data);
    return data;
  };
  const { getColumnSearchProps } = useFilterTable({
    onFilter: handleGetFilterData,
  });
  // const [typeForm, setTypeForm] = useState<"post" | "put" | "password">("post");
  const columns: TableColumnsType<Promotor> = [
    {
      title: "",
      dataIndex: "profile_path",
      key: "profile_path",
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
      title: "Municpio",
      dataIndex: "municipal_name",
      key: "municipal_name",
      responsive: ["lg"],
      ...getColumnSearchProps("municipal_name"),
      render: (text) => <Tag color="rgb(42, 143, 43)">{text}</Tag>,
    },
    {
      title: "Posición",
      dataIndex: "position",
      key: "position",
      responsive: ["lg"],
      ...getColumnSearchProps("position"),
      render: (text) => <Tag color="rgb(42, 143, 143)">{text}</Tag>,
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <DropDownPromo record={record} handleOpenModal={handleOpenModal} />
      ),
    },
  ];
  const handleOpenModal = (type = "post", record = {}) => {
    // console.log(record, "usePromotorC")
    form.resetFields();
    setTypeForm("post");
    if (type === "put") {
      form.setFieldsValue(record);
      setTypeForm("put");
      setPromotor(record as Promotor);
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const handleTableChange: TableProps<Promotor>["onChange"] = async (
    pagination
  ) => {
    setLoading(true);
    setTableParams({
      pagination,
    });
    const { data } = await getAllPromotor({
      page: pagination.current?.toString(),
    });

    setPromotors(data);

    // `dataSource` is useless since `pageSize` changed
    if (pagination.pageSize !== tableParams.pagination?.pageSize) {
      setPromotors([]);
    }
    setLoading(false);
  };
  const handleGetPromotors = async () => {
    const { data, meta } = await getAllPromotor({ page: "1" });
    setLoading(true);

    setPromotors(data);
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
    handleGetPromotors,
    handleTableChange,
    handleGetPromotor,
    tableParams,
  };
};
