import { Form, MenuProps, type TableColumnsType } from "antd";
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
import { MunicipalCatalog } from "../page/PromotedRegister";
import {
  getDistrictByMunicipal,
  getMunicipalCatalog,
  getSectionCatalogByDistrict,
} from "@/api/CatalogHttp";
const API_URL = import.meta.env.VITE_API_URL as string;
interface TableParams {
  pagination?: TablePaginationConfig;
}
export const usePromotedC = () => {
  const setPromoteds = usePromotedStore((state) => state.setPromoteds);
  const setPromoted = usePromotedStore((state) => state.setPromoted);
  const [alertImport, setAlertImport] = useState<{
    type: "success" | "error" | "warning";
    message: string;
    isShow: boolean;
  }>({
    type: "success",
    message: "",
    isShow: false,
  });
  const setAlert = useAlertStore((state) => state.setAlert);
  const clearAlert = useAlertStore((state) => state.clearAlert);
  const promoted = usePromotedStore((state) => state.promoted);
  const auth = useAuthStore((state) => state.user);
  const [typeExport, setTypeExport] = useState<string>("");
  const setTypeForm = usePromotedStore((state) => state.setTypeForm);
  const [form] = Form.useForm();
  const [formExport] = Form.useForm();
  const [promotorSelected, setPromotorSelected] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fileImport, setFileImport] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [municipal, setMunicipal] = useState<MunicipalCatalog[]>([]);
  const [districts, setDistricts] = useState<MunicipalCatalog[]>([]);
  const [sections, setSections] = useState<MunicipalCatalog[]>([]);
  const [exportForm, setExportForm] = useState<{
    municipal_id?: string;
    district_id?: string;
    section_id?: string;
  }>({
    municipal_id: null,
    district_id: null,
    section_id: null,
  });
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
  const items: MenuProps["items"] = [
    {
      key: "1",
      label: "Exportar todos los promovidos",
      onClick: () => {
        setTypeExport("all");
        handleExportExcel();
      },
    },
    {
      key: "2",
      label: "Exportar promovidos por Distrito",
      onClick: () => {
        setTypeExport("district");
        handleOpenModal("export");
        // handleExportExcel();
      },
    },
    {
      key: "3",
      label: "Exportar promovidos por Seccion",
      onClick: () => {
        setTypeExport("section");
        handleOpenModal("export");
        // handleExportExcel();
      },
    },
    {
      key: "6",
      label: "Descargar Plantilla",
      onClick: () =>
        (window.location.href = `${API_URL}/api/export-excel-template`),
    },
  ];
  const columns: TableColumnsType<Promoted> = [
    {
      title: "Nombre",
      dataIndex: "name",
      key: "name",
      render: (_, record) => (
        <p>
          {record.name} {record.last_name}
        </p>
      ),
      ...getColumnSearchProps("name"),
    },
    {
      title: "Apellidos",
      dataIndex: "last_name",
      key: "last_name",
      render: (_, record) => <p>{record.last_name}</p>,
      ...getColumnSearchProps("last_name"),
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
      title: "Sección",
      dataIndex: "section",
      key: "section",
      render: (_, record) => <p>{record.section?.number}</p>,
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
    type: "post" | "put" | "problem" | "export",
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
      setAlertImport({
        type: "error",
        message: "Error al importar",
        isShow: true,
      });
      setLoading(false);
    }
    setTimeout(() => {
      clearAlert();
      setAlertImport({
        type: "success",
        message: "",
        isShow: false,
      });
    }, 3000);
  };
  const handleGetUsers = async () => {
    setLoading(true);
    const { data, meta } = await getAllPromoted({ page: "1" });
    const dataMunicipal = await getMunicipalCatalog();
    setMunicipal(dataMunicipal);
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
    setLoading(true);
    let idExport = "";
    if (typeExport === "all") {
      idExport = "";
    }
    if (typeExport === "district") {
      idExport = exportForm.district_id;
    }
    if (typeExport === "section") {
      idExport = exportForm.section_id;
    }
    await exportPromoteds({
      type: typeExport,
      id: idExport,
    });
    formExport.resetFields();
    setDistricts([]);
    setSections([]);
    setExportForm({
      municipal_id: null,
      district_id: null,
      section_id: null,
    });
    handleCloseModal();
    setLoading(false);
    setAlert({
      type: "success",
      message: "Promovidos exportados correctamente",
      isShow: true,
    });
    setTimeout(() => {
      clearAlert();
    }, 3000);
  };
  const handleGetDistrictByMunicap = async (id: number) => {
    const { data } = await getDistrictByMunicipal({ municipal_id: id });
    setDistricts(data);
  };
  const handleGetSectionsByDistrict = async (id: number) => {
    const { data } = await getSectionCatalogByDistrict({ district_id: id });
    setSections(data);
  };
  const handleChangeDistrict = (id: number) => {
    setExportForm({
      ...exportForm,
      district_id: id.toString(),
    });
  };
  const handleChangeSection = (id: number) => {
    setExportForm({
      ...exportForm,
      section_id: id.toString(),
    });
  };
  return {
    municipal,
    districts,
    sections,
    columns,
    isModalOpen,
    form,
    loading,
    alertImport,
    tableParams,
    items,
    typeExport,
    formExport,
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
    handleGetDistrictByMunicap,
    handleGetSectionsByDistrict,
    handleChangeDistrict,
    handleChangeSection,
  };
};
