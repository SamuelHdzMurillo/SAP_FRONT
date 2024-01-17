import { Modal } from "antd";

interface ModalCProps {
  children: React.ReactNode;
  title: string;
  isModalOpen: boolean;
  handleOk?: () => void;
  handleCancel: () => void;
}

const ModalC = ({
  children,
  title,
  isModalOpen,
  handleOk,
  handleCancel,
}: ModalCProps) => {
  const typeOk = typeof handleOk;
  return (
    <Modal
      title={title}
      open={isModalOpen}
      onOk={handleOk}
      footer={typeOk === "function" ? true : null}
      onCancel={handleCancel}
    >
      {children}
    </Modal>
  );
};
export default ModalC;
