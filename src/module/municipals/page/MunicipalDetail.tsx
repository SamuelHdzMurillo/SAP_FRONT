/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import LayoutC from "@/components/LayoutC";
import TableC from "@/components/TableC";
import { useEffect } from "react";
import { Card, Col, Form, Row, Select, Spin } from "antd";

import { UsergroupAddOutlined } from "@ant-design/icons";
import { usePromotedC } from "@/module/promoted/hooks/usePromotedC";
import { usePromotedStore } from "@/module/promoted/store";
import { useMunicipalC } from "../hooks/useMunicipalC";
import { useMunicipalStore } from "../store";

const MunicipalDetail = () => {
  const { municipalSelect, countPromoted, handleSelectDistrict } =
    useMunicipalC();
  const {
    columns,
    loading,
    tableParams,
    municipal,
    handleGetPromotedsByDistricts,
    handleTableChange,
  } = usePromotedC();
  const municipalStore = useMunicipalStore((state) => state.municipal);
  const promotedsStore = usePromotedStore((state) => state.promoteds);
  console.log(municipalStore);
  useEffect(() => {
    handleGetPromotedsByDistricts(null, null, 1);
  }, []);
  const filterOption = (
    input: string,
    option?: { label: string; value: string }
  ) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase());
  return (
    <LayoutC
      items={[
        {
          title: "Municipios",
        },
        {
          title: "Detalle de Municipio",
        },
      ]}
      title={""}
    >
      <Row gutter={[20, 20]} justify={"space-between"}>
        <Col span={24}>
          <Card>
            <Row gutter={[10, 10]}>
              <Col span={24}>
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
                    onChange={async (e) => {
                      await handleSelectDistrict(e);
                      await handleGetPromotedsByDistricts(null, null, e);
                    }}
                  />
                </Form.Item>
              </Col>
            </Row>
          </Card>
        </Col>
        {municipalSelect !== "" ? (
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
                        Detalle del municipio {municipalStore.name}
                      </div>
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

export default MunicipalDetail;
