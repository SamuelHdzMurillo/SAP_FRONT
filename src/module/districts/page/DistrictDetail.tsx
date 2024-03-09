/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import LayoutC from "@/components/LayoutC";
import TableC from "@/components/TableC";
import { useDistrictsC } from "../hooks/useDistrictsC";
import { useEffect } from "react";

import { useDistrictStore } from "../store";
import { Card, Col, Form, Row, Select, Spin } from "antd";

import { UsergroupAddOutlined } from "@ant-design/icons";
import { useParams } from "react-router-dom";
import { usePromotedC } from "@/module/promoted/hooks/usePromotedC";
import { usePromotedStore } from "@/module/promoted/store";

const DistrictDetail = () => {
  const {
    districtSelect,
    countPromoted,
    handleGetDistrict,
    handleCountPromoteds,
    handleSelectDistrict,
  } = useDistrictsC();
  const {
    columns,
    loading,
    tableParams,
    municipal,
    districts,
    handleGetPromoteds,
    handleGetDistrictByMunicap,
    handleTableChange,
  } = usePromotedC();
  const districtStore = useDistrictStore((state) => state.district);
  const promotedsStore = usePromotedStore((state) => state.promoteds);
  const params = useParams();
  useEffect(() => {
    handleGetDistrict(parseInt(params.id));
    handleGetPromoteds(params.id);
    handleCountPromoteds(params.id);
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
                    onChange={async (e) => {
                      handleSelectDistrict(e);
                      await handleGetPromoteds(e);
                    }}
                  />
                </Form.Item>
              </Col>
            </Row>
          </Card>
        </Col>
        {districtSelect !== "" ? (
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
                    <div className="widget" style={{
                        width: "300px"
                    }}>
                      <div className="widget-content">
                        Detalle de distrito {districtStore.number}
                      </div>
                      <h2 className="widget-title">
                        {districtStore.municipal.name}
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

export default DistrictDetail;
