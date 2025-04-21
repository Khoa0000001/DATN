import React from "react";
import { Card, Tag, Button, Row, Col, Avatar, Typography, Divider } from "antd";
import { formatDate } from "@/utils/formatDate";
import type { DataType } from "../constant";

const { Title, Text } = Typography;

interface Props {
  data: DataType;
  onClose: () => void;
}

const View: React.FC<Props> = ({ data, onClose }) => {
  return (
    <Card style={{ width: "100%" }}>
      <Row gutter={[16, 16]}>
        {/* Avatar và Tên */}
        <Col span={6}>
          <Avatar
            src={data.profilePicture}
            size={160}
            style={{ border: "2px solid #1890ff" }}
          />
        </Col>
        <Col span={18}>
          <Title level={4} style={{ marginBottom: 4 }}>
            {data.nameUser || "Không có tên"}
          </Title>
          <Text type="secondary">{data.email}</Text>
          <br />
          <Text>{data.phone}</Text>
        </Col>

        {/* Địa chỉ & Vai trò */}
        <Col span={24}>
          <Divider />
          <Text strong>Địa chỉ: </Text>
          <Text>{data.address || "—"}</Text>
        </Col>

        <Col span={24}>
          <Text strong>Vai trò: </Text>
          <div
            style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 4 }}
          >
            {data.userRoles?.length > 0
              ? data.userRoles.map((ur, idx) => (
                  <Tag color="blue" key={idx}>
                    {ur.role.nameRole}
                  </Tag>
                ))
              : "—"}
          </div>
        </Col>

        {/* Trạng thái & xác thực */}
        <Col span={12}>
          <Text strong>Xác thực: </Text>
          <Tag color={data.isVerified ? "green" : "volcano"}>
            {data.isVerified ? "Đã xác thực" : "Chưa xác thực"}
          </Tag>
        </Col>
        <Col span={12}>
          <Text strong>Trạng thái: </Text>
          <Tag color={data.isDeleted ? "red" : "blue"}>
            {data.isDeleted ? "Đã xóa" : "Hoạt động"}
          </Tag>
        </Col>

        {/* Thời gian tạo/cập nhật */}
        <Col span={12}>
          <Text strong>Ngày tạo: </Text>
          <Text>{formatDate(data.createDate)}</Text>
        </Col>
        <Col span={12}>
          <Text strong>Ngày cập nhật: </Text>
          <Text>{formatDate(data.updateDate)}</Text>
        </Col>
      </Row>

      <div className="flex justify-center mt-6">
        <Button type="primary" onClick={onClose}>
          Đóng
        </Button>
      </div>
    </Card>
  );
};

export default View;
