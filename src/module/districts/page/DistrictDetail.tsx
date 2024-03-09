/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import LayoutC from "@/components/LayoutC";
import TableC from "@/components/TableC";
import { useDistrictsC } from "../hooks/useDistrictsC";
import { useEffect } from "react";

import { useDistrictStore } from "../store";
import { Card, Col, Flex, Row } from "antd";

import { UsergroupAddOutlined } from "@ant-design/icons";
import { useParams } from "react-router-dom";
import { usePromotedC } from "@/module/promoted/hooks/usePromotedC";
import { usePromotedStore } from "@/module/promoted/store";

const DistrictDetail = () => {
  const { countPromoted, handleGetDistrict, handleCountPromoteds } =
    useDistrictsC();
  const {
    columns,
    loading,
    tableParams,

    handleGetPromoteds,
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
  const widgets = [
    {
      icon: <UsergroupAddOutlined />,
      value: countPromoted,
      title: "Total de promovidos",
    },
  ];

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
            <Flex justify={"space-between"} align={"center"}>
              <div className="widget">
                <div className="widget-content">
                  Detalle de distrito {districtStore.number}
                </div>
                <h2 className="widget-title">{districtStore.municipal.name}</h2>
              </div>
              <div className="widget">
                <div className="widget-content">
                  <div className={`icon icon-${0 + 1}`}>
                    <UsergroupAddOutlined />
                  </div>
                  <p>{countPromoted}</p>
                </div>
                <h2 className="widget-title">Total de promovidos</h2>
              </div>
            </Flex>
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
      </Row>
    </LayoutC>
  );
};

export default DistrictDetail;
