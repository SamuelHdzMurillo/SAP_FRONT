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
const getBase64 = (img: FileType, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result as string));
  reader.readAsDataURL(img);
};
const TemplateDetail = ({
  title,
  form,
  isProfilePhoto = false,
  data,
}: {
  title: string;
  form: ReactNode;
  isProfilePhoto?: boolean;
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
      data.profile_img_path = info.file.response.data.profile_img_path;
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
              action={`${URL}/api/superAdmins/${data.id}/upload-image`}
              beforeUpload={beforeUpload}
              onChange={handleChange}
            >
              {data.profile_img_path ? (
                <img
                  src={`${URL}/storage/${data.profile_img_path}`}
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
      <Col span={24}>
        <h1>Template Detail</h1>
      </Col>
    </Row>
  );
};

export default TemplateDetail;
