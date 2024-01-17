import { Form, Input } from "antd";
import { Rule } from "antd/es/form";
interface InputTextProps {
  required?: boolean;
  bordered?: boolean;
  readOnly?: boolean;
  label: string;
  name: string;
  rules?: Rule[];
  dependencies?: string[];
  hasFeedback?: boolean;
  type?: string;
  onPressEnter?: () => void;
  onChangeInputText?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
const InputText = ({
  required,
  bordered = true,
  readOnly = false,
  label,
  name,
  rules = [],
  dependencies,
  hasFeedback,
  type,
  onPressEnter = () => {},
}: InputTextProps) => {
  return (
    <Form.Item
      label={label}
      name={name}
      dependencies={dependencies}
      hasFeedback={hasFeedback}
      
      rules={[
        {
          required: required,
          message: "¡Ups! Olvidaste completar este campo.",
        },
        ...rules,
      ]}
    >
      <Input
        type={type}
        bordered={bordered}
        readOnly={readOnly}
        onPressEnter={onPressEnter}
        
      />
    </Form.Item>
  );
};
export default InputText;
