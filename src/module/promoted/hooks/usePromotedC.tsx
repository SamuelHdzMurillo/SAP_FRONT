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
import { useAlertStore } from "@/components/alerts/alertStore";
interface TableParams {
  pagination?: TablePaginationConfig;
}
export const usePromotedC = () => {
  const setAlert = useAlertStore((state) => state.setAlert);
  const clearAlert = useAlertStore((state) => state.clearAlert);
  const setPromoteds = usePromotedStore((state) => state.setPromoteds);
  const setPromoted = usePromotedStore((state) => state.setPromoted);
  const promoted = usePromotedStore((state) => state.promoted);
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
    setLoading(true);
    const { data } = await getPromoted({ id });
    setPromoted(data);
    setLoading(false);
  };
  const handleGetFilterData = async (
    value: string,
    dataIndex: string | number
  ) => {
    setLoading(true);
    const { data, meta } = await getAllPromoted({
      [`${dataIndex}`]: value,
      page: "1",
    });
    setTableParams({
      ...tableParams,
      pagination: {
        ...tableParams.pagination,
        total: meta.total,
      },
    });
    setPromoteds(data);
    setLoading(false);
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
  const handleOpenModal = (
    type: "post" | "put" | "problem",
    record = {} as Promoted
  ) => {
    // console.log(record, "usePromotedC")
    setLoading(true);
    form.resetFields();
    setPromoted({
      ...promoted,
      id: record.id,
    });
    setTypeForm(type);
    setIsModalOpen(true);
    setLoading(false);
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
    try {
      setLoading(true);
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
      setLoading(false);
      handleCloseModal();
      setAlert({
        type: "success",
        message: "Promovidos importados correctamente",
        isShow: true,
      });
    } catch (error) {
      setLoading(false);
      setAlert({
        type: "error",
        message: "Ocurrio un error al importar los promovidos",
        isShow: true,
      });
    }
    setTimeout(() => {
      clearAlert();
    }, 3000);
  };
  const handleGetUsers = async () => {
    setLoading(true);
    const { data, meta } = await getAllPromoted({ page: "1" });

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
