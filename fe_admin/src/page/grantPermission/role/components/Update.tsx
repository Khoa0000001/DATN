import React, { useEffect } from "react";
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
  description: yup.string().required("Mô tả không được để trống"),
});

interface Props {
  onSubmit: (data: FormData) => void;
  loading?: boolean;
  data: FormData; // Dữ liệu truyền vào từ modal
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
          Cập nhật
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Update;
