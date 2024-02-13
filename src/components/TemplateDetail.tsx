import ChartPromotorDetail from "@/module/charts/pages/ChartPromotorDetail";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { Card, Col, Row, Spin, Upload, UploadProps, message } from "antd";
import { AnyObject, GetProp } from "antd/es/_util/type";
import { ReactNode, useState } from "react";
const URL = import.meta.env.VITE_API_URL;
type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];
const beforeUpload = (file: FileType) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
};

const TemplateDetail = ({
  title,
  titleTable,
  form,
  loading,
  isProfilePhoto = false,
  data,
  isTable = false,
  module = "superAdmins",
  attributeProfile = "profile_img_path",
  table = <></>,
  problem = <></>,
  map = <></>,
  isProblem = false,
  isMap = false,
}: {
  title: string;
  loading: boolean;
  module?: string;
  titleTable?: string;
  attributeProfile?: string;
  form: ReactNode;
  problem?: ReactNode;
  table?: ReactNode;
  isProfilePhoto?: boolean;
  isProblem?: boolean;
  isTable?: boolean;
  data: AnyObject;
  map?: ReactNode;
  isMap?: boolean;
}) => {
  const [loadingUpload, setLoadingUpload] = useState(false);
  const handleChange: UploadProps["onChange"] = (info) => {
    if (info.file.status === "uploading") {
      setLoadingUpload(true);
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      setLoadingUpload(false);
      data[`${attributeProfile}`] =
        info.file.response.data[`${attributeProfile}`];
    }
  };
  const uploadButton = (
    <button style={{ border: 0, background: "none" }} type="button">
      {loadingUpload ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );
  return (
    <>
      {loading ? (
        <Spin tip="Loading" size="large">
          <div
            style={{
              padding: "50px",
              background: "rgba(0, 0, 0, 0.05)",
              borderRadius: "4px",
            }}
          />
        </Spin>
      ) : (
        <Row gutter={[20, 20]}>
          <Col lg={module === "promotores" ? 12 : 24} sm={24}>
            <Card
              title={title}
              bordered={false}
              style={{ maxWidth: "100%", width: "100%", margin: "0 auto" }}
            >
              {isProfilePhoto && (
                <Upload
                  name="profile_img_path"
                  listType="picture-card"
                  className="avatar-uploader"
                  showUploadList={false}
                  action={`${URL}/api/${module}/${data.id}/upload-image`}
                  beforeUpload={beforeUpload}
                  onChange={handleChange}
                >
                  {data[`${attributeProfile}`] ? (
                    <img
                      src={`${URL}/storage/${data[`${attributeProfile}`]}`}
                      alt="avatar"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        borderRadius: "5px",
                      }}
                    />
                  ) : (
                    uploadButton
                  )}
                </Upload>
              )}
              {form}
            </Card>
          </Col>
          {module === "promotores" && (
            <Col span={12}>
              <ChartPromotorDetail promotorId={data.id} />
            </Col>
          )}
          {isTable && (
            <Col span={24}>
              <Card
                title={titleTable}
                bordered={false}
                style={{ width: "100%" }}
              >
                {table}
              </Card>
            </Col>
          )}
          {isProblem && (
            <Col span={24}>
              <Card
                title={titleTable}
                bordered={false}
                style={{ width: "100%" }}
              >
                {problem}
              </Card>
            </Col>
          )}
          {isMap && (
            <Col span={24}>
              <Card bordered={false} style={{ width: "100%" }}>
                {map}
              </Card>
            </Col>
          )}
        </Row>
      )}
    </>
  );
};

export default TemplateDetail;
