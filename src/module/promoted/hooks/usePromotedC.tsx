import { Form, type TableColumnsType } from "antd";
import { Promoted, usePromotedStore } from "../store";
import DropDownPV from "../components/DropDownPV";
import { TablePaginationConfig, TableProps } from "antd";
import {
  exportPromoteds,
  getAllPromoted,
  getPromoted,
  importPromoteds,
} from "../api";
import { useState } from "react";
import { useFilterTable } from "@/components/filterTable/useFilterTable";
import { useAuthStore } from "@/module/auth/auth";
interface TableParams {
  pagination?: TablePaginationConfig;
}
export const usePromotedC = () => {
  const setPromoteds = usePromotedStore((state) => state.setPromoteds);
  const setPromoted = usePromotedStore((state) => state.setPromoted);
  const auth = useAuthStore((state) => state.user);
  const setTypeForm = usePromotedStore((state) => state.setTypeForm);
  const [form] = Form.useForm();
  const [promotorSelected, setPromotorSelected] = useState<number>(0);
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
  const handleGetPromtoed = async (id: string) => {
    const { data } = await getPromoted({ id });
    setPromoted(data);
  };
  const handleGetFilterData = async (
    value: string,
    dataIndex: string | number
  ) => {
    const { data } = await getAllPromoted({
      [`${dataIndex}`]: value,
      page: "1",
    });
    setPromoteds(data);
    return data;
  };
  const { getColumnSearchProps } = useFilterTable({
    onFilter: handleGetFilterData,
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
      title: "Dirección",
      dataIndex: "adress",
      key: "adress",
      responsive: ["lg"],
      ...getColumnSearchProps("adress"),
    },
    {
      title: "Llave Electoral",
      dataIndex: "electoral_key",
      key: "electoral_key",
      responsive: ["lg"],
      ...getColumnSearchProps("electoral_key"),
    },
    {
      title: "CURP",
      dataIndex: "curp",
      key: "curp",
      responsive: ["lg"],
      ...getColumnSearchProps("curp"),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <DropDownPV record={record} handleOpenModal={handleOpenModal} />
      ),
    },
  ];
  const handleOpenModal = (type: "post" | "put" | "problem", record = {}) => {
    // console.log(record, "usePromotedC")
    form.resetFields();
    setTypeForm(type);
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
    await importPromoteds(
      formData,
      promotorSelected === 0 ? auth.id : promotorSelected
    );
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
    handleImport,
    handleGetPromtoed,
    setPromotorSelected,
  };
};
