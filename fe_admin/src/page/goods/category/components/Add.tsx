import React, { useState } from "react";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import {
  Button,
  Form,
  Input,
  Divider,
  Card,
  Row,
  Col,
  Space,
  Upload,
  Image,
} from "antd";
import {
  MinusCircleOutlined,
  PlusOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { InferType } from "yup";

const schema = yup.object({
  nameCategory: yup.string().required("Tên danh mục không được để trống"),
  description: yup.string().default(""),
  image: yup
    .mixed()
    .required("Ảnh không được để trống")
    .test("fileExist", "Ảnh không được để trống", (value) => !!value),
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
    setValue,
  } = useForm<CategoryInput>({
    resolver: yupResolver(schema),
    defaultValues: {
      nameCategory: "",
      description: "",
      image: undefined,
      attributes: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "attributes",
  });

  const [preview, setPreview] = useState<string | null>(null);

  const handleImageChange = (file: File) => {
    setValue("image", file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

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

            <Form.Item
              label="Ảnh danh mục"
              validateStatus={errors.image ? "error" : ""}
              help={errors.image?.message}
            >
              <Controller
                name="image"
                control={control}
                render={() => (
                  <>
                    <Upload
                      beforeUpload={(file) => {
                        handleImageChange(file);
                        return false; // Ngăn Upload tự động
                      }}
                      showUploadList={false}
                      accept="image/*"
                    >
                      <Button icon={<UploadOutlined />}>Chọn ảnh</Button>
                    </Upload>

                    {preview && (
                      <div style={{ marginTop: 10 }}>
                        <Image
                          src={preview}
                          alt="Preview"
                          width={150}
                          height={150}
                          style={{
                            objectFit: "cover",
                            border: "1px solid #ccc",
                          }}
                        />
                      </div>
                    )}
                  </>
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
