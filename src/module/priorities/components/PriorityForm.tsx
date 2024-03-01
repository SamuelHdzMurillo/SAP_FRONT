import { Col, Row, Form, Select, Button, FormInstance } from "antd";
import { useEffect, useState } from "react";
import type { AnyObject } from "yup";
import { useAlertStore } from "@/components/alerts/alertStore";

import { MunicipalCatalog } from "@/module/promoted/page/PromotedRegister";
import { PriorityChartApi, PriorityForm, usePriorityStore } from "../store";
import InputText from "@/components/InputText";
import { getPriorityCharts, postPriority } from "../api";
interface PromotorsFormProps {
  form: FormInstance<PriorityForm>;
  isTitle?: boolean;
  typeMeta?: string;
  sectionsSelects: AnyObject[];
  handleCloseModal?: () => void;
  municipal: MunicipalCatalog[];
  districts?: MunicipalCatalog[] | [];
  sections?: MunicipalCatalog[] | [];
  handleGetDistrictByMunicap?: (id: number) => void;
  handleGetSectionsByDistrict?: (id: number) => void;
  handleSetSectionsSelects: (sections: MunicipalCatalog[]) => void;
}
const MODULE = "Meta";
const PriorityFrom = ({
  form,
  sectionsSelects = [],
  handleSetSectionsSelects,
  municipal,
  districts = [],
  sections = [],
  handleGetDistrictByMunicap,
  handleGetSectionsByDistrict,
  handleCloseModal,
}: PromotorsFormProps) => {
  // const [form] = Form.useForm();
  const setAlert = useAlertStore((state) => state.setAlert);
  const clearAlert = useAlertStore((state) => state.clearAlert);
  const setPriorities = usePriorityStore((state) => state.setPriorities);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    form.resetFields();
  }, []);
  const onFinish = async (values: PriorityForm) => {
    setLoading(true);
    const newValues = {
      Name: values.name,
      data: values.sections_id,
    };
    console.log(newValues, "newValues");
    try {
      const [_, getResponse] = await Promise.all([
        postPriority(newValues),
        getPriorityCharts(),
      ]);

      const { data: dataGet } = getResponse;
      const newData = dataGet.map((item: any) => {
        return {
          id: item.id,
          name: item["Name"],
          promotedsByPriority: item.promoteds_by_priority_section.map(
            (prom: PriorityChartApi) => {
              return {
                x: prom.section_name,
                y: prom.promoteds_count,
              };
            }
          ),
        };
      });
      setPriorities(newData);
      console.log(dataGet, "getResponse"); // This will log the response from getPriorityCharts()
      setAlert({
        type: "success",
        message: `${MODULE} registrado correctamente`,
        isShow: true,
      });
    } catch (error) {
      setAlert({
        type: "error",
        message: "Ocurrio un error en el servidor",
        isShow: true,
      });
    } finally {
      setLoading(false);
      form.resetFields();
      handleCloseModal && handleCloseModal();
      setTimeout(() => {
        clearAlert();
      }, 3000);
    }
  };

  const filterOption = (
    input: string,
    option?: { label: string; value: string }
  ) => (`${option?.label}` ?? "").toLowerCase().includes(input.toLowerCase());

  return (
    <div className="form-register">
      <Form
        form={form}
        name="basic"
        style={{
          maxWidth: 800,
          width: "100%",
          margin: "0 auto",
        }}
        layout="vertical"
        onFinish={onFinish}
        autoComplete="off"
      >
        <Row gutter={[10, 10]}>
          <Col span={24}>
            <InputText required label="Objetivo" name="name" />
          </Col>
          <Col xs={{ span: 24 }} lg={{ span: 12 }}>
            <Form.Item
              name="municipal_id"
              label="Municipio"
              rules={[
                {
                  required: true,
                  message: "¡Ups! Olvidaste completar este campo.",
                },
              ]}
            >
              <Select
                showSearch
                optionFilterProp="children"
                filterOption={filterOption}
                placeholder="Selecciona tu municipio"
                options={municipal}
                onChange={(e) => {
                  handleGetDistrictByMunicap(e);
                }}
              />
            </Form.Item>
          </Col>
          <Col xs={{ span: 24 }} lg={{ span: 12 }}>
            <Form.Item
              name="district_id"
              label="Distrito"
              rules={[
                {
                  required: true,
                  message: "¡Ups! Olvidaste completar este campo.",
                },
              ]}
            >
              <Select
                showSearch
                optionFilterProp="children"
                filterOption={filterOption}
                disabled={districts.length === 0}
                placeholder="Selecciona un distrito"
                options={districts}
                onChange={(e) => {
                  handleGetSectionsByDistrict && handleGetSectionsByDistrict(e);
                }}
              />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              name="section_id"
              label="Sección"
              rules={[
                {
                  required: true,
                  message: "¡Ups! Olvidaste completar este campo.",
                },
              ]}
            >
              <Select
                showSearch
                disabled={districts.length === 0 || sections.length === 0}
                optionFilterProp="children"
                filterOption={filterOption}
                placeholder="Selecciona tu seccion"
                options={sections}
                onChange={(e, option) => {
                  const label = (option as { label?: string })?.label ?? "";
                  const newSectionsSelects = [
                    ...sectionsSelects,
                    { label, value: e },
                  ];
                  handleSetSectionsSelects(
                    newSectionsSelects as MunicipalCatalog[]
                  );
                  form.setFieldsValue({
                    sections_id: newSectionsSelects.map((e) => e.value),
                  });
                }}
              />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              name="sections_id"
              label="Secciones seleccionadas"
              rules={[
                {
                  required: true,
                  message: "¡Ups! Olvidaste completar este campo.",
                },
              ]}
            >
              <Select
                mode="multiple"
                defaultValue={sectionsSelects}
                style={{ width: "100%" }}
                options={sectionsSelects}
                onDeselect={(e) => {
                  const newSectionsSelects = sectionsSelects.filter(
                    (item) => item.value !== e.value
                  );
                  handleSetSectionsSelects(
                    newSectionsSelects as MunicipalCatalog[]
                  );
                  form.setFieldsValue({
                    sections_id: newSectionsSelects.map((e) => e.value),
                  });
                }}
              />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item style={{ display: "flex", justifyContent: "end" }}>
          <Button
            style={{
              backgroundColor: "#1C1C1C",
            }}
            type="primary"
            htmlType="submit"
            loading={loading}
          >
            Registrar
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default PriorityFrom;
