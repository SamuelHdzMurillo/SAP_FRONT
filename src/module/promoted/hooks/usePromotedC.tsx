import { Form, type TableColumnsType } from "antd";
import { Promoted, usePromotedStore } from "../store";
import DropDownPV from "../components/DropDownPV";
import { TablePaginationConfig, TableProps } from "antd";
import { exportPromoteds, getAllPromoted, importPromoteds } from "../api";
import { useState } from "react";
interface TableParams {
  pagination?: TablePaginationConfig;
}
export const usePromotedC = () => {
  const setPromoteds = usePromotedStore((state) => state.setPromoteds);
  const setTypeForm = usePromotedStore((state) => state.setTypeForm);
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fileImport, setFileImport] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 10,
      total: 50,
    },
  });
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
        <DropDownPV record={record} handleOpenModal={handleOpenModal} />
      ),
    },
  ];
  const handleOpenModal = (type = "post", record = {}) => {
    // console.log(record, "usePromotedC")
    form.resetFields();
    setTypeForm("post");
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
    const { data } = await getAllPromoted({
      page: pagination.current?.toString(),
    });

    setPromoteds(data);

    // `dataSource` is useless since `pageSize` changed
    if (pagination.pageSize !== tableParams.pagination?.pageSize) {
      setPromoteds([]);
    }
    setLoading(false);
  };

  const handleImport = async () => {
    if (!fileImport) {
      return;
    }
    const formData = new FormData();
    formData.append("file", fileImport);
    await importPromoteds(formData, 1);
    await handleGetUsers();
    handleCloseModal();
  };
  const handleGetUsers = async () => {
    const { data, meta } = await getAllPromoted({ page: "1" });
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

  const handleExportExcel = async () => {
    await exportPromoteds();
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
    handleExportExcel,
    setFileImport,
    handleImport
  };
};
