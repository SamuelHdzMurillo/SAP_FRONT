/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import LayoutC from "@/components/LayoutC";
import TableC from "@/components/TableC";
import { useSectionsC } from "../hooks/useSectionsC";
import { useEffect } from "react";

import { useSectionStore } from "../store";
import { Card, Col, Form, Row, Select, Spin } from "antd";

import { UsergroupAddOutlined } from "@ant-design/icons";
import { usePromotedC } from "@/module/promoted/hooks/usePromotedC";
import { usePromotedStore } from "@/module/promoted/store";

const SectionDetail = () => {
  const { sectionSelect, countPromoted, handleSelectSection } = useSectionsC();
  const {
    columns,
    loading,
    tableParams,
    municipal,
    sections,
    districts,
    handleGetPromotedsByDistricts,
    handleGetDistrictByMunicap,
    handleGetSectionsByDistrict,
    handleTableChange,
  } = usePromotedC();
  const sectionStore = useSectionStore((state) => state.section);
  const promotedsStore = usePromotedStore((state) => state.promoteds);
  useEffect(() => {
    handleGetPromotedsByDistricts(null, 1);
  }, []);
  const filterOption = (
    input: string,
    option?: { label: string; value: string }
  ) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase());
  return (
    <LayoutC
      items={[
        {
          title: "Distritos",
        },
        {
          title: "Detalle de distrito",
        },
      ]}
      title={""}
    >
      <Row gutter={[20, 20]} justify={"space-between"}>
        <Col span={24}>
          <Card>
            <Row gutter={[10, 10]}>
              <Col xs={{ span: 24 }} lg={{ span: 8 }}>
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
              <Col xs={{ span: 24 }} lg={{ span: 8 }}>
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
                    onChange={async (e) => {
                      handleGetSectionsByDistrict &&
                        handleGetSectionsByDistrict(e);
                    }}
                  />
                </Form.Item>
              </Col>
              <Col xs={{ span: 24 }} lg={{ span: 8 }}>
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
                    onChange={async (e) => {
                      await handleGetPromotedsByDistricts(null, e);
                      await handleSelectSection(e);
                    }}
                  />
                </Form.Item>
              </Col>
            </Row>
          </Card>
        </Col>
        {sectionSelect !== "" ? (
          <>
            <Col span={24}>
              <Card>
                <Row
                  gutter={[10, 10]}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Col lg={12} xs={24}>
                    <div
                      className="widget"
                      style={{
                        width: "300px",
                      }}
                    >
                      <div className="widget-content">
                        Detalle de la sección {sectionStore.number}
                      </div>
                      <h2 className="widget-title">
                        {sectionStore.district.municipal.name} / Dist.{" "}
                        {sectionStore.district.number}
                      </h2>
                    </div>
                  </Col>
                  <Col
                    lg={12}
                    xs={24}
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                    }}
                  >
                    <div className="widget">
                      <div className="widget-content">
                        <div className={`icon icon-${0 + 1}`}>
                          <UsergroupAddOutlined />
                        </div>
                        <p>{countPromoted}</p>
                      </div>
                      <h2 className="widget-title">Total de promovidos</h2>
                    </div>
                  </Col>
                </Row>
              </Card>
            </Col>
            <Col span={24}>
              <TableC
                dataSource={promotedsStore}
                columns={columns}
                pagination={tableParams.pagination}
                handleTableChange={handleTableChange}
                loading={loading}
                handleAdd={null}
                children={null}
              />
            </Col>
          </>
        ) : loading ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100vh",
              width: "100%",
            }}
          >
            <Spin size="large" />
          </div>
        ) : null}
      </Row>
    </LayoutC>
  );
};

export default SectionDetail;
