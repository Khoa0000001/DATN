import React from "react";
import { Descriptions, Button } from "antd";
import { formatDate } from "@/utils/formatDate";
import type { DataType } from "../constant";

interface Props {
  data: DataType;
  onClose: () => void; // Đảm bảo nhận hàm đóng modal từ DynamicModal
}

const View: React.FC<Props> = ({ data, onClose }) => {
  return (
    <>
      <Descriptions bordered column={1} size="middle">
        <Descriptions.Item label="Tên quyền">
          {data.permissionName || "—"}
        </Descriptions.Item>
        <Descriptions.Item label="Mô tả">
          {data.description || "—"}
        </Descriptions.Item>
        <Descriptions.Item label="Ngày tạo">
          {formatDate(data.createDate || "")}
        </Descriptions.Item>
        <Descriptions.Item label="Ngày cập nhật">
          {formatDate(data.updateDate || "")}
        </Descriptions.Item>
      </Descriptions>

      {/* Nút đóng Modal sẽ được xử lý qua DynamicModal */}
      <div className="flex justify-center mt-4">
        <Button onClick={onClose} type="primary">
          Đóng
        </Button>
      </div>
    </>
  );
};

export default View;
