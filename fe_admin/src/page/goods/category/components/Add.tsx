import React from "react";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { Button, Form, Input, Space, Typography, Divider } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { InferType } from "yup";

const { Title } = Typography;

// Cập nhật schema để bỏ qua validation cho description và attributes
const schema = yup.object({
  nameCategory: yup.string().required("Tên danh mục không được để trống"),
  description: yup.string().default(""), // ✅ fix chỗ này
  attributes: yup
    .array()
    .of(
      yup.object({
        nameAttribute: yup
          .string()
          .required("Tên thuộc tính không được để trống"),
        description: yup.string().default(""), // ✅ và ở đây luôn
      })
    )
    .required(),
});
type CategoryInput = InferType<typeof schema>;

interface Props {
  onSubmit: (data: CategoryInput) => void;
  loading?: boolean;
}

const Add: React.FC<Props> = ({ onSubmit, loading }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CategoryInput>({
    resolver: yupResolver(schema),
    defaultValues: {
      nameCategory: "",
      description: "", // description có thể là chuỗi rỗng hoặc không có giá trị
      attributes: [], // Không có thuộc tính nào lúc đầu
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "attributes",
  });

  return (
    <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
      <Title level={4}>Thông tin danh mục</Title>

      <Form.Item
        label="Tên danh mục"
        validateStatus={errors.nameCategory ? "error" : ""}
        help={errors.nameCategory?.message}
      >
        <Controller
          name="nameCategory"
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

      <Divider />

      <Title level={4}>Danh sách thuộc tính</Title>

      {fields.map((field, index) => (
        <Space
          key={field.id}
          direction="vertical"
          style={{ display: "flex", marginBottom: 16 }}
        >
          <Form.Item
            label={`Tên thuộc tính #${index + 1}`}
            validateStatus={
              errors.attributes?.[index]?.nameAttribute ? "error" : ""
            }
            help={errors.attributes?.[index]?.nameAttribute?.message}
          >
            <Controller
              name={`attributes.${index}.nameAttribute`}
              control={control}
              render={({ field }) => <Input {...field} />}
            />
          </Form.Item>

          <Form.Item
            label="Mô tả thuộc tính"
            validateStatus={
              errors.attributes?.[index]?.description ? "error" : ""
            }
            help={errors.attributes?.[index]?.description?.message}
          >
            <Controller
              name={`attributes.${index}.description`}
              control={control}
              render={({ field }) => <Input.TextArea rows={3} {...field} />}
            />
          </Form.Item>

          {fields.length > 0 && (
            <Button
              danger
              onClick={() => remove(index)}
              icon={<MinusCircleOutlined />}
            >
              Xóa thuộc tính
            </Button>
          )}
          <Divider />
        </Space>
      ))}

      <Form.Item>
        <Button
          type="dashed"
          onClick={() => append({ nameAttribute: "", description: "" })}
          block
          icon={<PlusOutlined />}
        >
          Thêm thuộc tính
        </Button>
      </Form.Item>

      <Form.Item style={{ textAlign: "right" }}>
        <Button type="primary" htmlType="submit" loading={loading}>
          Tạo danh mục
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Add;
