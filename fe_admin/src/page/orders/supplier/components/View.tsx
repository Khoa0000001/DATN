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
  description: yup.string().required("Mô tả không được để trống"),
  isDeleted: yup.boolean().default(false),
});

interface Props {
  data: FormData;
  onClose: () => void; // Đảm bảo nhận hàm đóng modal từ DynamicModal
}

const View: React.FC<Props> = ({ data, onClose }) => {
  const {
    control,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: data,
  });

  return (
    <Form layout="vertical">
      <Form.Item
        label="Tên nhà cung cấp"
        validateStatus={errors.nameSupplier ? "error" : ""}
        help={errors.nameSupplier?.message}
      >
        <Controller
          name="nameSupplier"
          control={control}
          render={({ field }) => (
            <Input {...field} value={field.value ?? ""} disabled />
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
            <Input {...field} value={field.value ?? ""} disabled />
          )}
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
          render={({ field }) => (
            <Input {...field} value={field.value ?? ""} disabled />
          )}
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
          render={({ field }) => (
            <Input {...field} value={field.value ?? ""} disabled />
          )}
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
          render={({ field }) => (
            <Input.TextArea rows={4} {...field} disabled />
          )}
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
              disabled
            />
          )}
        />
      </Form.Item>
      <div className="flex justify-center mt-4">
        <Button onClick={onClose} type="primary">
          Đóng
        </Button>
      </div>
    </Form>
  );
};

export default View;
