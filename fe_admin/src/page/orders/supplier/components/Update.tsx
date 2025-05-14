import React from "react";
import { useForm, Controller } from "react-hook-form";
import { Button, Form, Input, Switch } from "antd";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

interface FormData {
  nameSupplier: string;
  address: string;
  email: string;
  phone: string;
  description: string;
  isDeleted: boolean;
}

const schema = yup.object({
  nameSupplier: yup.string().required("Tên nhà cung cấp không được để trống"),
  address: yup.string().required("Địa chỉ không được để trống"),
  email: yup
    .string()
    .email("Email không hợp lệ")
    .required("Email không được để trống"),
  phone: yup.string().required("Số điện thoại không được để trống"),
  description: yup.string().default(""),
  isDeleted: yup.boolean().default(false),
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
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: data,
  });

  return (
    <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
      <Form.Item
        label="Tên nhà cung cấp"
        validateStatus={errors.nameSupplier ? "error" : ""}
        help={errors.nameSupplier?.message}
      >
        <Controller
          name="nameSupplier"
          control={control}
          render={({ field }) => <Input {...field} value={field.value ?? ""} />}
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
          render={({ field }) => <Input {...field} value={field.value ?? ""} />}
        />
      </Form.Item>

      <Form.Item
        label="Email"
        validateStatus={errors.email ? "error" : ""}
        help={errors.email?.message}
      >
        <Controller
          name="email"
          control={control}
          render={({ field }) => <Input {...field} value={field.value ?? ""} />}
        />
      </Form.Item>

      <Form.Item
        label="Số điện thoại"
        validateStatus={errors.phone ? "error" : ""}
        help={errors.phone?.message}
      >
        <Controller
          name="phone"
          control={control}
          render={({ field }) => <Input {...field} value={field.value ?? ""} />}
        />
      </Form.Item>

      <Form.Item
        label="Mô tả"
        validateStatus={errors.description ? "error" : ""}
        help={errors.description?.message}
      >
        <Controller
          name="description"
          control={control}
          render={({ field }) => <Input.TextArea rows={4} {...field} />}
        />
      </Form.Item>

      <Form.Item label="Đánh dấu xóa">
        <Controller
          name="isDeleted"
          control={control}
          render={({ field }) => (
            <Switch
              checked={field.value}
              onChange={(checked) => field.onChange(checked)}
            />
          )}
        />
      </Form.Item>

      <Form.Item style={{ textAlign: "right" }}>
        <Button type="primary" htmlType="submit" loading={loading}>
          Thêm mới
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Update;
