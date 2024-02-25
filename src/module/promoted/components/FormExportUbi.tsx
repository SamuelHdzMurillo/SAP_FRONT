import { Col, Form, FormInstance, Row, Select } from "antd";
import { MunicipalCatalog } from "../page/PromotedRegister";

const FormExportUbi = ({
  typeExport,
  municipal,
  districts,
  sections,
  form,
  handleGetDistrictByMunicap,
  handleGetSectionsByDistrict,
  filterOption,
  handleChangeDistrict,
  handleChangeSection,
}: {
  typeExport: string;
  municipal: MunicipalCatalog[];
  districts: MunicipalCatalog[];
  sections: MunicipalCatalog[];
  handleChangeDistrict: (id: number) => void;
  handleChangeSection: (id: number) => void;
  handleGetDistrictByMunicap: (id: number) => void;
  handleGetSectionsByDistrict?: (id: number) => void;
  form: FormInstance<{
    municipal_id?: string;
    district_id?: string;
    section_id?: string;
  }>;
  filterOption: (
    input: string,
    option?: { label: string; value: string }
  ) => boolean;
}) => {
  return (
    <Form
      form={form}
      name="export-form"
      style={{
        maxWidth: 800,
        width: "100%",
      }}
      layout="vertical"
      autoComplete="off"
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
        {(typeExport === "district" || typeExport === "section") && (
          <Col xs={{ span: 24 }} lg={{ span: 12 }}>
            <Form.Item
              name="district_id"
              label="Distrito"
              rules={[
                {
                  required:
                    typeExport === "district" || typeExport === "section",
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
                  handleChangeDistrict(e);
                }}
              />
            </Form.Item>
          </Col>
        )}
        {typeExport === "section" && (
          <Col xs={{ span: 24 }} lg={{ span: 12 }}>
            <Form.Item
              name="section_id"
              label="Sección"
              rules={[
                {
                  required: typeExport === "section",
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
                onChange={(e) => {
                  handleChangeSection(e);
                }}
              />
            </Form.Item>
          </Col>
        )}
      </Row>
    </Form>
  );
};

export default FormExportUbi;
