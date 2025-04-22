import React from "react";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { Button, Form, Input, Divider, Card, Row, Col, Space } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { InferType } from "yup";

const schema = yup.object({
  nameCategory: yup.string().required("Tên danh mục không được để trống"),
  description: yup.string().default(""),
  attributes: yup
    .array()
    .of(
      yup.object({
        nameAttribute: yup
          .string()
          .required("Tên thuộc tính không được để trống"),
        description: yup.string().default(""),
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
    reset,
  } = useForm<CategoryInput>({
    resolver: yupResolver(schema),
    defaultValues: {
      nameCategory: "",
      description: "",
      attributes: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "attributes",
  });

  return (
    <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
      <Row gutter={24}>
        {/* BÊN TRÁI - TẠO DANH MỤC */}
        <Col span={12}>
          <Card title="Tạo danh mục mới" variant="borderless">
            <Form.Item
              label="Tên danh mục"
              validateStatus={errors.nameCategory ? "error" : ""}
              help={errors.nameCategory?.message}
            >
              <Controller
                name="nameCategory"
                control={control}
                render={({ field }) => (
                  <Input placeholder="Nhập tên danh mục" {...field} />
                )}
              />
            </Form.Item>

            <Form.Item
              label="Mô tả danh mục"
              validateStatus={errors.description ? "error" : ""}
              help={errors.description?.message}
            >
              <Controller
                name="description"
                control={control}
                render={({ field }) => (
                  <Input.TextArea
                    rows={3}
                    placeholder="Nhập mô tả"
                    {...field}
                  />
                )}
              />
            </Form.Item>
          </Card>
        </Col>

        {/* BÊN PHẢI - THUỘC TÍNH */}
        <Col span={12}>
          <Card title="Danh sách thuộc tính" variant="borderless">
            <div style={{ maxHeight: 400, overflowY: "auto", paddingRight: 8 }}>
              {fields.map((field, index) => (
                <Card
                  key={field.id}
                  type="inner"
                  size="small"
                  title={`Thuộc tính #${index + 1}`}
                  style={{ marginBottom: 16 }}
                  extra={
                    <Button
                      size="small"
                      danger
                      icon={<MinusCircleOutlined />}
                      onClick={() => remove(index)}
                    >
                      Xóa
                    </Button>
                  }
                >
                  <Form.Item
                    label="Tên thuộc tính"
                    validateStatus={
                      errors.attributes?.[index]?.nameAttribute ? "error" : ""
                    }
                    help={errors.attributes?.[index]?.nameAttribute?.message}
                  >
                    <Controller
                      name={`attributes.${index}.nameAttribute`}
                      control={control}
                      render={({ field }) => (
                        <Input placeholder="Tên thuộc tính" {...field} />
                      )}
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
                      render={({ field }) => (
                        <Input.TextArea
                          rows={2}
                          placeholder="Mô tả"
                          {...field}
                        />
                      )}
                    />
                  </Form.Item>
                </Card>
              ))}
            </div>

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
          </Card>
        </Col>
      </Row>

      <Divider />

      <Form.Item style={{ textAlign: "right" }}>
        <Space>
          <Button htmlType="button" onClick={() => reset()}>
            Reset
          </Button>
          <Button type="primary" htmlType="submit" loading={loading}>
            Tạo danh mục
          </Button>
        </Space>
      </Form.Item>
    </Form>
  );
};

export default Add;
