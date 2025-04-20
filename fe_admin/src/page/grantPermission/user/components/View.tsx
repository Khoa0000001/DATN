import React from "react";
import { Descriptions, Tag, Button } from "antd";
import { formatDate } from "@/utils/formatDate";
import type { DataType } from "../constant";

interface Props {
  data: DataType;
  onClose: () => void;
}

const View: React.FC<Props> = ({ data, onClose }) => {
  return (
    <>
      <Descriptions bordered column={1} size="middle">
        <Descriptions.Item label="Tên người dùng">
          {data.nameUser || "—"}
        </Descriptions.Item>
        <Descriptions.Item label="Email">{data.email || "—"}</Descriptions.Item>
        <Descriptions.Item label="Số điện thoại">
          {data.phone || "—"}
        </Descriptions.Item>
        <Descriptions.Item label="Địa chỉ">
          {data.address || "—"}
        </Descriptions.Item>
        <Descriptions.Item label="Vai trò">
          {data.userRoles && data.userRoles.length > 0
            ? data.userRoles.map((ur, idx) => (
                <Tag color="blue" key={idx}>
                  {ur.role.nameRole}
                </Tag>
              ))
            : "—"}
        </Descriptions.Item>
        <Descriptions.Item label="Đã xác thực">
          <Tag color={data.isVerified ? "green" : "volcano"}>
            {data.isVerified ? "Đã xác thực" : "Chưa xác thực"}
          </Tag>
        </Descriptions.Item>
        <Descriptions.Item label="Trạng thái">
          <Tag color={data.isDeleted ? "red" : "blue"}>
            {data.isDeleted ? "Đã xóa" : "Hoạt động"}
          </Tag>
        </Descriptions.Item>
        <Descriptions.Item label="Ngày tạo">
          {formatDate(data.createDate || "")}
        </Descriptions.Item>
        <Descriptions.Item label="Ngày cập nhật">
          {formatDate(data.updateDate || "")}
        </Descriptions.Item>
      </Descriptions>

      <div className="flex justify-center mt-4">
        <Button onClick={onClose} type="primary">
          Đóng
        </Button>
      </div>
    </>
  );
};

export default View;
