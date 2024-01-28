import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { Card, Col, Row, Upload, UploadProps, message } from "antd";
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
  isProfilePhoto = false,
  data,
  isTable = false,
  module = "superAdmins",
  attributeProfile = "profile_img_path",
  table = <></>,
}: {
  title: string;
  module?: string;
  titleTable?: string;
  attributeProfile?: string;
  form: ReactNode;
  table?: ReactNode;
  isProfilePhoto?: boolean;
  isTable?: boolean;
  data: AnyObject;
}) => {
  const [loading, setLoading] = useState(false);
  const handleChange: UploadProps["onChange"] = (info) => {
    console.log(info);
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      setLoading(false);
      data[`${attributeProfile}`] =
        info.file.response.data[`${attributeProfile}`];
    }
  };
  const uploadButton = (
    <button style={{ border: 0, background: "none" }} type="button">
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );
  return (
    <Row gutter={[20, 20]}>
      <Col span={24}>
        <Card title={title} bordered={false} style={{ width: "100%" }}>
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
      {isTable && (
        <Col span={24}>
          <Card title={titleTable} bordered={false} style={{ width: "100%" }}>
            {table}
          </Card>
        </Col>
      )}
    </Row>
  );
};

export default TemplateDetail;
