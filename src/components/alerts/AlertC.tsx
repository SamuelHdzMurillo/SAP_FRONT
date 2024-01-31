import { Alert } from "antd";
import { useAlertStore } from "./alertStore";

const AlertC = () => {
  const { message, type, isShow } = useAlertStore((state) => state.alert);
  return (
    <>
      {isShow && (
        <Alert
          showIcon
          banner
          message={message}
          type={type}
          style={{ margin: "10px", width: 400 }}
        />
      )}
    </>
  );
};

export default AlertC;
