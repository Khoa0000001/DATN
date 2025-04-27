/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
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

// 👉 Chuẩn hóa dữ liệu đầu vào trước khi đưa vào form
const mapInitialData = (data: any): CategoryInput => ({
  id: data.id,
  nameCategory: data.nameCategory,
  description: data.description || "",
  imageUrl: data.imageUrl || "",
  attributes:
    data.attributes?.map((attr: any) => ({
      id: attr.id,
      nameAttribute: attr.nameAttribute,
      description: attr.description || "",
    })) || [],
});

const schema = yup.object({
  id: yup.string().default(""),
  nameCategory: yup.string().required("Tên danh mục không được để trống"),
  description: yup.string().default(""),
  imageUrl: yup.mixed().default(""),
  attributes: yup
    .array()
    .of(
      yup.object({
        id: yup.string().optional(),
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
  onSubmit: (data: CategoryInput & { deletedAttributeIds: string[] }) => void;
  loading?: boolean;
  data: CategoryInput;
}

const Update: React.FC<Props> = ({ onSubmit, loading, data }) => {
  const [deletedAttributeIds, setDeletedAttributeIds] = useState<string[]>([]);
  const [preview, setPreview] = useState<string | null>(
    (data.imageUrl as string | null) || ""
  );

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<CategoryInput>({
    resolver: yupResolver(schema),
    defaultValues: mapInitialData(data),
    shouldUnregister: true,
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "attributes",
    keyName: "_id",
  });
  // test git

  useEffect(() => {
    if (data) {
      reset(mapInitialData(data));
      setDeletedAttributeIds([]);
    }
  }, [data, reset]);

  const handleImageChange = (file: any) => {
    setValue("imageUrl", file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleFormSubmit = (formData: CategoryInput) => {
    onSubmit({
      ...mapInitialData(formData),
      deletedAttributeIds,
    });
  };

  return (
    <Form layout="vertical" onFinish={handleSubmit(handleFormSubmit)}>
      <Row gutter={24}>
        <Col span={12}>
          <Card title="Cập nhật danh mục" variant="borderless">
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

            {/* Thêm phần Upload ảnh */}
            <Form.Item
              label="Ảnh danh mục"
              validateStatus={errors.imageUrl ? "error" : ""}
              help={errors.imageUrl?.message}
            >
              <Controller
                name="imageUrl"
                control={control}
                render={() => (
                  <>
                    <Upload
                      beforeUpload={(file) => {
                        handleImageChange(file);
                        return false; // Ngừng upload tự động
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

        <Col span={12}>
          <Card title="Danh sách thuộc tính" variant="borderless">
            <div style={{ maxHeight: 400, overflowY: "auto", paddingRight: 8 }}>
              {fields.map((field, index) => (
                <Card
                  key={field._id}
                  type="inner"
                  size="small"
                  title={`Thuộc tính #${index + 1}`}
                  style={{ marginBottom: 16 }}
                  extra={
                    <Button
                      size="small"
                      danger
                      icon={<MinusCircleOutlined />}
                      onClick={() => {
                        const isUUID = (str: string) =>
                          /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/.test(
                            str
                          );
                        const attrId = field.id;
                        if (attrId && isUUID(attrId)) {
                          setDeletedAttributeIds((prev) => [...prev, attrId]);
                        }
                        remove(index);
                      }}
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
          <Button
            htmlType="button"
            onClick={() => {
              reset(mapInitialData(data));
              setDeletedAttributeIds([]);
            }}
          >
            Reset
          </Button>
          <Button type="primary" htmlType="submit" loading={loading}>
            Cập nhật
          </Button>
        </Space>
      </Form.Item>
    </Form>
  );
};

export default Update;
