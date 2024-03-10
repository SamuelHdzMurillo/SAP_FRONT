import InputText from "@/components/InputText";
import { Col, Row, Form, Select, Button } from "antd";
import { MunicipalCatalog } from "../page/PromotedRegister";
import { usePromotedFormHook } from "../hooks/usePromotedFormHook";
interface PromotorsFormProps {
  isTitle?: boolean;
  usersCatalog: MunicipalCatalog[];
}
const PromotedForm = ({
  isTitle = true,
  usersCatalog = [],
}: PromotorsFormProps) => {
  const {
    userType,
    params,
    form,
    loading,
    municipal,
    districts,
    sections,
    handleGetDistrictByMunicap,
    handleGetSectionsByDistrict,
    onFinish,
    onChange,
  } = usePromotedFormHook();
  const title = isTitle ? (
    params.id ? (
      <h1>Editar Promovido</h1>
    ) : (
      <h1>Registro de Promovidos</h1>
    )
  ) : null;
  const filterOption = (
    input: string,
    option?: { label: string; value: string }
  ) => (`${option?.label}` ?? "").toLowerCase().includes(input.toLowerCase());
  return (
    <div className="form-register">
      {title}
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
          {(userType === "superadmin" || userType === "admin") && (
            <Col span={24}>
              <Form.Item
                name="promotor_id"
                label="Selecciona un promotor"
                rules={[
                  {
                    required: userType === "superadmin" || userType === "admin",
                    message: "Este campo es requerido",
                  },
                ]}
              >
                <Select
                  showSearch
                  optionFilterProp="children"
                  filterOption={filterOption}
                  options={usersCatalog}
                  placeholder="Buscar promotor"
                />
              </Form.Item>
            </Col>
          )}

          <Col xs={{ span: 24 }} lg={{ span: 12 }}>
            <InputText required label="Nombre (s)" name="name" />
          </Col>
          <Col xs={{ span: 24 }} lg={{ span: 12 }}>
            <InputText required label="Apellidos" name="last_name" />
          </Col>
          <Col xs={{ span: 24 }} lg={{ span: 12 }}>
            <InputText
              label="Número de contacto"
              name="phone_number"
              required
              rules={[
                {
                  max: 10,
                  message: "¡Ups! Solo se permiten 10 caracteres.",
                },
                {
                  min: 10,
                  message: "¡Ups! Solo se permiten 10 caracteres.",
                },
                {
                  pattern: /^[0-9]+$/,
                  message: "¡Ups! Solo se permiten números.",
                },
              ]}
            />
          </Col>
          <Col xs={{ span: 24 }} lg={{ span: 12 }}>
            <InputText
              label="Correo Electrónico"
              name="email"
              rules={[
                {
                  type: "email",
                  message: "No es un correo electrónico válido",
                },
              ]}
            />
          </Col>
          <Col xs={{ span: 24 }} lg={{ span: 12 }}>
            <InputText required label="Dirección" name="adress" />
          </Col>
          <Col xs={{ span: 24 }} lg={{ span: 12 }}>
            <InputText required label="Colonia" name="colony" />
          </Col>
          <Col xs={{ span: 24 }} lg={{ span: 12 }}>
            <InputText
              required
              label="Num. Ext."
              name="house_number"
              rules={[
                {
                  pattern: /^[0-9]+$/,
                  message: "¡Ups! Solo se permiten números.",
                },
              ]}
            />
          </Col>
          <Col xs={{ span: 24 }} lg={{ span: 12 }}>
            <InputText
              required
              label="Codigo Postal"
              name="postal_code"
              rules={[
                {
                  pattern: /^[0-9]+$/,
                  message: "¡Ups! Solo se permiten números.",
                },
              ]}
            />
          </Col>
          <Col xs={{ span: 24 }} lg={{ span: 12 }}>
            <InputText label="Llave Electoral" name="electoral_key" />
          </Col>
          <Col xs={{ span: 24 }} lg={{ span: 12 }}>
            <InputText label="CURP" name="curp" />
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
                placeholder="Selecciona un distrito"
                options={districts}
                onChange={(e) => {
                  handleGetSectionsByDistrict(e);
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
                optionFilterProp="children"
                filterOption={filterOption}
                placeholder="Selecciona tu municipio"
                options={sections}
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

export default PromotedForm;
