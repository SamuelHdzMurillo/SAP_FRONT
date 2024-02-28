import { Col, Row, Form, Select, Button } from "antd";
import { useEffect, useState } from "react";
import type { AnyObject } from "yup";
import { useAlertStore } from "@/components/alerts/alertStore";

import { MunicipalCatalog } from "@/module/promoted/page/PromotedRegister";
import { Priority } from "../store";
interface PromotorsFormProps {
  isTitle?: boolean;
  typeMeta?: string;
  handleCloseModal?: () => void;
  municipal: MunicipalCatalog[];
  districts?: MunicipalCatalog[] | [];
  sections?: MunicipalCatalog[] | [];
  handleGetDistrictByMunicap?: (id: number) => void;
  handleGetSectionsByDistrict?: (id: number) => void;
}
const MODULE = "Meta";
const PriorityFrom = ({
  typeMeta = "",
  municipal,
  districts = [],
  sections = [],
  handleGetDistrictByMunicap,
  handleGetSectionsByDistrict,
  handleCloseModal,
}: PromotorsFormProps) => {
  const [form] = Form.useForm();
  const setAlert = useAlertStore((state) => state.setAlert);
  const clearAlert = useAlertStore((state) => state.clearAlert);
  const [loading, setLoading] = useState(false);
  const [sectionsSelects, setSectionsSelects] = useState<MunicipalCatalog[]>(
    []
  );
  useEffect(() => {
    form.resetFields();
  }, []);
  const onChange = (changedValues: AnyObject) => {
    const key = Object.keys(changedValues)[0];
    console.log(changedValues, "changedValues");
  };
  const onFinish = async (values: Priority) => {
    setLoading(true);
    const newValues = {
      ...values,
    };
    try {
      //   const data = await postGoal(newValues, typeMeta);
      //   const formatedGoal = {
      //     id: data.goal.id,
      //     goalName: data.goal.goal_name,
      //     goalValue: data.goal.goal_value,
      //     muncipal_name: data.goal.municipal_name,
      //     municipal_id: 0,
      //     promoted_count: data.goal.promoted_count,
      //   };
      //   addGoal(formatedGoal);
      setAlert({
        type: "success",
        message: `${MODULE} registrado correctamente`,
        isShow: true,
      });
    } catch (error) {
      setAlert({
        type: "error",
        message: "Ocurrio un error al registrar el promovido",
        isShow: true,
      });
    }
    setLoading(false);
    form.resetFields();
    handleCloseModal && handleCloseModal();
    setTimeout(() => {
      clearAlert();
    }, 3000);
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
        onValuesChange={(e) => onChange(e)}
      >
        <Row gutter={[10, 10]}>
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
          <Col xs={{ span: 24 }} lg={{ span: 12 }}>
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
                  const label = option?.label ?? "";
                  console.log(label, "label");
                  setSectionsSelects([...sectionsSelects, { label, value: e }]);
                  form.setFieldsValue({
                    sections_id: sectionsSelects.map((e) => e.value),
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
