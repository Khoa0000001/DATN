import React from "react";
import {
  Descriptions,
  Button,
  Typography,
  Row,
  Col,
  Card,
  Divider,
} from "antd";
import { formatDate } from "@/utils/formatDate";
import type { DataType } from "../constant";

const { Title, Text } = Typography;

interface Props {
  data: DataType;
  onClose: () => void;
}

const View: React.FC<Props> = ({ data, onClose }) => {
  return (
    <>
      <Row gutter={[16, 16]}>
        {/* Cột trái: Thông tin loại sản phẩm */}
        <Col xs={24} md={12}>
          <Card
            title={<Title level={5}>📁 Thông tin loại sản phẩm</Title>}
            variant="borderless"
            size="small"
          >
            <Descriptions
              column={1}
              size="middle"
              styles={{ label: { width: "120px", fontWeight: 500 } }}
            >
              <Descriptions.Item label="Tên danh mục">
                {data.nameCategory || <Text type="secondary">Không có</Text>}
              </Descriptions.Item>
              <Descriptions.Item label="Mô tả">
                {data.description || <Text type="secondary">Không có</Text>}
              </Descriptions.Item>
              <Descriptions.Item label="Ngày tạo">
                {formatDate(data.createDate)}
              </Descriptions.Item>
              <Descriptions.Item label="Ngày cập nhật">
                {formatDate(data.updateDate)}
              </Descriptions.Item>
            </Descriptions>
          </Card>
        </Col>

        {/* Cột phải: Thuộc tính */}
        <Col xs={24} md={12}>
          <Card
            title={<Title level={5}>📌 Danh sách thuộc tính</Title>}
            variant="borderless"
            size="small"
            styles={{
              body: { maxHeight: 400, overflowY: "auto", paddingRight: 12 },
            }}
          >
            {data.attributes.length > 0 ? (
              data.attributes.map((attr, index) => (
                <div key={attr.id} style={{ marginBottom: 16 }}>
                  <Descriptions
                    title={<Text strong>🔹 Thuộc tính {index + 1}</Text>}
                    column={1}
                    size="small"
                    bordered
                    styles={{ label: { width: "130px", fontWeight: 500 } }}
                  >
                    <Descriptions.Item label="Tên thuộc tính">
                      {attr.nameAttribute || "—"}
                    </Descriptions.Item>
                    <Descriptions.Item label="Mô tả">
                      {attr.description || "—"}
                    </Descriptions.Item>
                    <Descriptions.Item label="Ngày tạo">
                      {formatDate(attr.createDate)}
                    </Descriptions.Item>
                    <Descriptions.Item label="Ngày cập nhật">
                      {formatDate(attr.updateDate)}
                    </Descriptions.Item>
                  </Descriptions>
                  {index < data.attributes.length - 1 && (
                    <Divider style={{ margin: "16px 0" }} />
                  )}
                </div>
              ))
            ) : (
              <Text type="secondary">Không có thuộc tính nào.</Text>
            )}
          </Card>
        </Col>
      </Row>

      {/* Nút đóng */}
      <div className="flex justify-center mt-6">
        <Button onClick={onClose} type="primary">
          Đóng
        </Button>
      </div>
    </>
  );
};

export default View;
