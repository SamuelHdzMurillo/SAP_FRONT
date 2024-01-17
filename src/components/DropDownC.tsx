import { Dropdown, MenuProps, Space } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { AnyObject } from "antd/es/_util/type";

interface DropDownCProps {
  handleGetItemsDropdown: (record: AnyObject) => MenuProps["items"] | undefined;
  record: AnyObject;
}

const DropDownC = ({ handleGetItemsDropdown, record }: DropDownCProps) => {
  return (
    <div style={{ margin: "10px 20px" }}>
      <Dropdown
        menu={{
          items: handleGetItemsDropdown(record),
        }}
      >
        <a onClick={(e) => e.preventDefault()}>
          <Space>
            Opciones
            <DownOutlined />
          </Space>
        </a>
      </Dropdown>
    </div>
  );
};

export default DropDownC;
