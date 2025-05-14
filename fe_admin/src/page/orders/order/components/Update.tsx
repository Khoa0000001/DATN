/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { Button, Form, Input, Select, Row, Col } from "antd";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const { TextArea } = Input;

interface FormData {
  createDate: Date;
  updateDate: Date;
  nameCustomer: string;
  phoneCustomer: string;
  address: string;
  timeOfReceipt: string | null;
  paymentMethod: string | null;
  shippingMethod: string | null;
  totalAmount: number;
  status: string;
  nameUser: string | null;
  email: string | null;
}

const schema: yup.ObjectSchema<FormData> = yup.object({
  createDate: yup.date().default(() => new Date()),
  updateDate: yup.date().default(() => new Date()),
  nameCustomer: yup.string().required("Tên khách hàng không được để trống"),
  phoneCustomer: yup.string().required("SĐT không được để trống"),
  address: yup.string().required("Địa chỉ không được để trống"),
  timeOfReceipt: yup.string().nullable().default(""),
  paymentMethod: yup.string().nullable().default(""),
  shippingMethod: yup.string().nullable().default(""),
  totalAmount: yup.number().default(0),
  status: yup.string().required("Trạng thái không được để trống"),
  nameUser: yup.string().nullable().default(""),
  email: yup.string().nullable().default(""),
});

interface Props {
  onSubmit: (data: FormData) => void;
  loading?: boolean;
  data: FormData;
}

const Update: React.FC<Props> = ({ onSubmit, loading, data }) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: data,
  });

  useEffect(() => {
    if (data) reset(data);
  }, [data, reset]);

  return (
    <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
      <Row gutter={16}>
        {/* Cột trái */}
        <Col span={12}>
          <Form.Item
            label="Tên khách hàng"
            validateStatus={errors.nameCustomer ? "error" : ""}
            help={errors.nameCustomer?.message}
          >
            <Controller
              name="nameCustomer"
              control={control}
              render={({ field }) => (
                <Input {...field} value={field.value ?? ""} />
              )}
            />
          </Form.Item>

          <Form.Item
            label="Số điện thoại"
            validateStatus={errors.phoneCustomer ? "error" : ""}
            help={errors.phoneCustomer?.message}
          >
            <Controller
              name="phoneCustomer"
              control={control}
              render={({ field }) => (
                <Input {...field} value={field.value ?? ""} />
              )}
            />
          </Form.Item>

          <Form.Item
            label="Địa chỉ"
            validateStatus={errors.address ? "error" : ""}
            help={errors.address?.message}
          >
            <Controller
              name="address"
              control={control}
              render={({ field }) => (
                <TextArea rows={2} {...field} value={field.value ?? ""} />
              )}
            />
          </Form.Item>

          <Form.Item
            label="Trạng thái"
            validateStatus={errors.status ? "error" : ""}
            help={errors.status?.message}
          >
            <Controller
              name="status"
              control={control}
              render={({ field }) => (
                <Select {...field} value={field.value ?? ""}>
                  <Select.Option value="PENDING">Chờ xử lý</Select.Option>
                  <Select.Option value="PROCESSING">Đang xử lý</Select.Option>
                  <Select.Option value="SHIPPED">Đã giao hàng</Select.Option>
                  <Select.Option value="DELIVERED">Đã nhận hàng</Select.Option>
                  <Select.Option value="CANCELED">Đã hủy</Select.Option>
                </Select>
              )}
            />
          </Form.Item>

          <Form.Item label="Thời gian nhận hàng">
            <Controller
              name="timeOfReceipt"
              control={control}
              render={({ field }) => (
                <Input {...field} value={field.value ?? ""} />
              )}
            />
          </Form.Item>
        </Col>

        {/* Cột phải */}
        <Col span={12}>
          <Form.Item label="Phương thức thanh toán">
            <Controller
              name="paymentMethod"
              control={control}
              render={({ field }) => (
                <Input {...field} value={field.value ?? ""} />
              )}
            />
          </Form.Item>

          <Form.Item label="Phương thức giao hàng">
            <Controller
              name="shippingMethod"
              control={control}
              render={({ field }) => (
                <Input {...field} value={field.value ?? ""} />
              )}
            />
          </Form.Item>

          <Form.Item label="Tổng tiền">
            <Controller
              name="totalAmount"
              control={control}
              render={({ field }) => (
                <Input {...field} value={field.value ?? ""} disabled />
              )}
            />
          </Form.Item>

          <Form.Item label="Người tạo đơn">
            <Controller
              name="nameUser"
              control={control}
              render={({ field }) => (
                <Input {...field} value={field.value ?? ""} disabled />
              )}
            />
          </Form.Item>

          <Form.Item label="Email">
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <Input {...field} value={field.value ?? ""} disabled />
              )}
            />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item style={{ textAlign: "right" }}>
        <Button type="primary" htmlType="submit" loading={loading}>
          Cập nhật
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Update;
