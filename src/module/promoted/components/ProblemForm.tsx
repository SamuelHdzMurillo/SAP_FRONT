import { Button, Col, Form, FormInstance, Row } from "antd";

import InputText from "@/components/InputText";
import { useState } from "react";
import TextArea from "antd/es/input/TextArea";
import { postProblem } from "@/module/promotor/api";
interface Problem {
  title: string;
  description: string;
  promoted_id: number;
  problem_img_path: string;
}
interface ProblemFormProps {
  form: FormInstance<Problem>;
  handleCloseModal?: () => void;
}

// eslint-disable-next-line react-refresh/only-export-components

const ProblemForm = ({ form, handleCloseModal }: ProblemFormProps) => {
  const [problemPath, setProblemPath] = useState<File | null>(null);
  const onFinish = async (values: Problem) => {
    let formData = new FormData();
    formData.append("title", values.title);
    formData.append("description", values.description);
    formData.append("promoted_id", "1");
    if (problemPath) {
      formData.append("problem_img_path", problemPath);
    }
    (async () => {
      await postProblem(formData);
      //   addPromotor(data);
    })();
    form.resetFields();
    handleCloseModal();
  };

  return (
    <div className="form-register">
      <Form
        form={form}
        name="basic"
        style={{
          maxWidth: 800,
          width: "100%",
        }}
        layout="vertical"
        onFinish={onFinish}
        autoComplete="off"
      >
        <Row gutter={[10, 10]}>
          <Col span={24}>
            <InputText required label="Titulo" name="title" />
          </Col>
          <Col span={24}>
            <Form.Item label="Descripcion" name={"descripcion"}>
              <TextArea rows={4} />
            </Form.Item>
          </Col>
          <Col span={24} style={{marginBottom: 20}}>
            <label>Imagen del problema</label>
            <input
              type="file"
              name="problem_img_path"
              onChange={(e) => setProblemPath(e.target.files![0])}
            />
          </Col>
        </Row>
        <Form.Item style={{ display: "flex", justifyContent: "end" }}>
          <Button
            style={{
              backgroundColor: "#1C1C1C",
            }}
            type="primary"
            htmlType="submit"
          >
            Registrar
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ProblemForm;
