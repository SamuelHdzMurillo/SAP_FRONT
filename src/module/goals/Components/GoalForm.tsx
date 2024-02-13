import InputText from "@/components/InputText";
import { Col, Row, Form, Select, Button, FormInstance } from "antd";
import { useEffect, useState } from "react";
import type { AnyObject } from "yup";
import { getMunicipalCatalog } from "@/api/CatalogHttp";
import { Goal, useGoalStore } from "../store";
import { useAlertStore } from "@/components/alerts/alertStore";
import { MunicipalCatalog } from "@/module/promoted/page/PromotedRegister";
import { postGoal } from "../goal.api";
interface PromotorsFormProps {
  form: FormInstance<Goal>;
  isTitle?: boolean;
  handleCloseModal?: () => void;
}
const MODULE = "Meta";
const GoalForm = ({ form, handleCloseModal }: PromotorsFormProps) => {
  const goal = useGoalStore((state) => state.goal);
  const goals = useGoalStore((state) => state.goals);
  const setGoal = useGoalStore((state) => state.setGoal);
  const addGoal = useGoalStore((state) => state.addGoal);
  const setTypeForm = useGoalStore((state) => state.setTypeForm);
  // const alert = useAlertStore((state) => state.alert);
  const setAlert = useAlertStore((state) => state.setAlert);
  const clearAlert = useAlertStore((state) => state.clearAlert);
  const [loading, setLoading] = useState(false);
  const [municipal, setMunicipal] = useState<MunicipalCatalog[]>([]);
  useEffect(() => {
    const handleGetMunicipal = async () => {
      const data = await getMunicipalCatalog();
      setMunicipal(data);
    };
    setTypeForm("post");
    form.resetFields();
    handleGetMunicipal();
  }, []);
  // const updatePromoted = useGoalStore((state) => state.updatePromoted);
  const typeForm = useGoalStore((state) => state.typeForm);
  const onChange = (changedValues: AnyObject) => {
    const key = Object.keys(changedValues)[0];
    setGoal({ ...goal, [key]: changedValues[key] });
  };
  const onFinish = async (values: Goal) => {
    setLoading(true);
    const newValues: Goal = {
      ...goal,
    };
    switch (typeForm) {
      case "post":
        try {
          const data = await postGoal(newValues);
          console.log(data, "data");
          const formatedGoal = {
            id: data.goal.id,
            goalName: data.goal.goal_name,
            goalValue: data.goal.goal_value,
            muncipal_name: data.goal.municipal_name,
            municipal_id: 0,
            promoted_count: data.goal.promoted_count,
          };
          addGoal(formatedGoal);
          console.log(goals);
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
        break;
      default:
        break;
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
      <h1>Registro de Promovidos</h1>
      {/* <h1>Registro de Promovidos</h1> */}
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
            <InputText required label="Objetivo" name="goalName" />
          </Col>

          <Col xs={{ span: 24 }} lg={{ span: 12 }}>
            <InputText
              required
              label="Meta"
              name="goalValue"
              rules={[
                {
                  pattern: /^[0-9]+$/,
                  message: "¡Ups! Solo se permiten números.",
                },
              ]}
            />
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

export default GoalForm;
