import React from "react";
import { Descriptions, Button, Divider, Tag, Image } from "antd";
import { formatDate } from "@/utils/formatDate";
import type { DataType } from "../constant";

interface Props {
  data: DataType;
  onClose: () => void;
}

const View: React.FC<Props> = ({ data, onClose }) => {
  return (
    <div style={{ padding: 16 }}>
      <Descriptions
        bordered
        column={2}
        title="Thông tin sản phẩm"
        size="middle"
      >
        <Descriptions.Item label="Tên sản phẩm" span={2}>
          {data.nameProduct}
        </Descriptions.Item>
        <Descriptions.Item label="Mô tả" span={2}>
          {data.description || "—"}
        </Descriptions.Item>
        <Descriptions.Item label="Giá">
          {data.price.toLocaleString()} VNĐ
        </Descriptions.Item>
        <Descriptions.Item label="Trạng thái">
          <Tag color={data.isDeleted ? "volcano" : "green"}>
            {data.isDeleted ? "Đã xóa" : "Còn hoạt động"}
          </Tag>
        </Descriptions.Item>
        <Descriptions.Item label="Loại sản phẩm">
          {data.category?.nameCategory}
        </Descriptions.Item>
        <Descriptions.Item label="Mô tả loại">
          {data.category?.description || "—"}
        </Descriptions.Item>
        <Descriptions.Item label="Ngày tạo">
          {formatDate(data.createDate)}
        </Descriptions.Item>
        <Descriptions.Item label="Ngày cập nhật">
          {formatDate(data.updateDate)}
        </Descriptions.Item>
      </Descriptions>

      <Divider orientation="left">Hình ảnh sản phẩm</Divider>
      <Image.PreviewGroup>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          {data.productImages.map((img) => (
            <Image
              key={img.id}
              src={img.imageUrl}
              width={100}
              height={100}
              style={{ objectFit: "cover", borderRadius: 4 }}
              preview={{ mask: "Xem" }}
            />
          ))}
        </div>
      </Image.PreviewGroup>

      <Divider orientation="left">Thuộc tính</Divider>
      <Descriptions bordered column={1} size="small">
        {data.attributeValues.length > 0 ? (
          data.attributeValues.map((attr, idx) => (
            <Descriptions.Item
              key={idx}
              label={`${attr.nameAttribute} (${attr.description || "—"})`}
            >
              {attr.attributeValue}
            </Descriptions.Item>
          ))
        ) : (
          <Descriptions.Item label="Không có thuộc tính">—</Descriptions.Item>
        )}
      </Descriptions>

      <div className="flex justify-center mt-6">
        <Button type="primary" onClick={onClose}>
          Đóng
        </Button>
      </div>
    </div>
  );
};

export default View;
