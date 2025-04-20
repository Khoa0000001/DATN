import React from "react";
import { Modal } from "antd";

interface DynamicModalProps {
  open: boolean;
  onCancel: () => void;
  title?: string;
  children: React.ReactNode;
  width?: number;
}

const DynamicModal: React.FC<DynamicModalProps> = ({
  open,
  onCancel,
  title,
  children,
  width = 1200,
}) => {
  return (
    <Modal
      open={open}
      title={title}
      onCancel={onCancel}
      footer={null}
      width={width}
      destroyOnClose
    >
      {children}
    </Modal>
  );
};

export default DynamicModal;
