import React from "react";
import { useForm, Controller } from "react-hook-form";
import { Button, Form, Input } from "antd";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

interface FormData {
  codeRole: string;
  nameRole: string;
  description: string;
}

const schema = yup.object({
  codeRole: yup.string().required("Mã quyền không được để trống"),
  nameRole: yup.string().required("Tên vai trò không được để trống"),
  description: yup.string().default(""),
});

interface Props {
  onSubmit: (data: FormData) => void;
  loading?: boolean;
}

const Add: React.FC<Props> = ({ onSubmit, loading }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  return (
    <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
      <Form.Item
        label="Mã quyền"
        validateStatus={errors.codeRole ? "error" : ""}
        help={errors.codeRole?.message}
      >
        <Controller
          name="codeRole"
          control={control}
          render={({ field }) => <Input {...field} />}
        />
      </Form.Item>

      <Form.Item
        label="Tên vai trò"
        validateStatus={errors.nameRole ? "error" : ""}
        help={errors.nameRole?.message}
      >
        <Controller
          name="nameRole"
          control={control}
          render={({ field }) => <Input {...field} />}
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

      <Form.Item style={{ textAlign: "right" }}>
        <Button type="primary" htmlType="submit" loading={loading}>
          Tạo
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Add;
