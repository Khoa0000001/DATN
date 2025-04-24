/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from "react";
import { useForm, Controller, useWatch, useFieldArray } from "react-hook-form";
import { Button, Col, Form, Input, Row, Typography, InputNumber } from "antd";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { fetchAttributeByCategoryId } from "@/store/slice/productSlice";
import { fetchCategories } from "@/store/slice/categorySlice";
import { useAppDispatch } from "@/store/hooks";

import { CustomSelect, UploadMultipleImages } from "@/components/customAnt";

export interface FormData {
  nameProduct: string;
  description?: string;
  price: number;
  categoryId: string;
  productImages: File[];
  attributeValues: {
    id?: string;
    attributeId?: string;
    nameAttribute: string;
    attributeValue: string;
  }[];
}

interface Props {
  onSubmit: (data: FormData) => void;
  loading?: boolean;
  data: FormData; // Dữ liệu sản phẩm cần cập nhật
}

const schema: yup.ObjectSchema<FormData> = yup.object({
  nameProduct: yup.string().required("Tên sản phẩm không được để trống"),
  description: yup.string().optional(),
  price: yup
    .number()
    .positive("Giá phải lớn hơn 0")
    .required("Giá không được để trống"),
  categoryId: yup.string().required("Vui lòng chọn loại sản phẩm"),
  productImages: yup
    .array(yup.mixed<File>().required("Hình ảnh không hợp lệ"))
    .min(1, "Cần ít nhất 1 hình ảnh")
    .required("Hình ảnh không được để trống"),
  attributeValues: yup
    .array()
    .of(
      yup.object({
        id: yup.string().optional(),
        attributeId: yup.string().optional(),
        nameAttribute: yup.string().required(),
        attributeValue: yup.string().required("Vui lòng nhập giá trị"),
      })
    )
    .default([]),
});

const Update: React.FC<Props> = ({ onSubmit, loading, data }) => {
  const dispatch = useAppDispatch();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: data,
  });

  const categoryId = useWatch({ control, name: "categoryId" });
  const { fields: attributeFields, replace } = useFieldArray({
    control,
    name: "attributeValues",
  });

  const fetch = async (categoryId: string) => {
    if (!categoryId) {
      replace([]);
      return;
    }
    try {
      const response = await dispatch(
        fetchAttributeByCategoryId(categoryId)
      ).unwrap();
      const attributes = response.data;

      const mapped = attributes.map((attr: any, index: number) => ({
        id:
          (categoryId === data.categoryId &&
            data?.attributeValues[index]?.id) ||
          "",
        attributeId: attr.id,
        nameAttribute: attr.nameAttribute,
        attributeValue:
          (categoryId === data.categoryId &&
            data?.attributeValues[index]?.attributeValue) ||
          "",
        description: attr.description || null,
      }));

      replace(mapped);
    } catch (error) {
      console.error("Lỗi lấy thuộc tính:", error);
      replace([]);
    }
  };

  useEffect(() => {
    if (categoryId) {
      fetch(categoryId);
    }
  }, [categoryId]);

  useEffect(() => {
    if (data) {
      reset(data);
    }
  }, [data, reset]);

  return (
    <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
      <Row gutter={24}>
        <Col xs={24} md={12}>
          <Typography.Title level={4}>Cập nhật sản phẩm</Typography.Title>
          <Form.Item
            label="Tên sản phẩm"
            validateStatus={errors.nameProduct ? "error" : ""}
            help={errors.nameProduct?.message}
          >
            <Controller
              name="nameProduct"
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
              render={({ field }) => <Input.TextArea rows={3} {...field} />}
            />
          </Form.Item>

          <Form.Item
            label="Giá"
            validateStatus={errors.price ? "error" : ""}
            help={errors.price?.message}
          >
            <Controller
              name="price"
              control={control}
              render={({ field }) => (
                <InputNumber {...field} style={{ width: "100%" }} />
              )}
            />
          </Form.Item>

          <Form.Item
            label="Loại sản phẩm"
            validateStatus={errors.categoryId ? "error" : ""}
            help={errors.categoryId?.message}
          >
            <Controller
              name="categoryId"
              control={control}
              render={({ field }) => (
                <CustomSelect
                  {...field}
                  value={[field.value]}
                  onChange={field.onChange}
                  placeholder="Chọn loại sản phẩm"
                  fetchData={fetchCategories}
                  dataType="categories"
                  itemField="nameCategory"
                  limit={10}
                  renderItem={(item) => <div>{item.nameCategory}</div>}
                />
              )}
            />
          </Form.Item>

          <Form.Item
            label="Hình ảnh sản phẩm"
            validateStatus={errors.productImages ? "error" : ""}
            help={errors.productImages?.message}
          >
            <Controller
              control={control}
              name="productImages"
              render={({ field }) => (
                <UploadMultipleImages
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            />
          </Form.Item>
        </Col>

        <Col xs={24} md={12}>
          <Typography.Title level={4}>Thuộc tính sản phẩm</Typography.Title>
          <div
            style={{ maxHeight: "400px", overflowY: "auto", paddingRight: 8 }}
          >
            {!categoryId ? (
              <Typography.Text type="warning">
                Vui lòng chọn loại sản phẩm.
              </Typography.Text>
            ) : attributeFields.length === 0 ? (
              <Typography.Text type="secondary">
                Không có thuộc tính nào.
              </Typography.Text>
            ) : (
              attributeFields.map((field, index) => (
                <Form.Item
                  key={field.id}
                  label={field.nameAttribute}
                  validateStatus={
                    errors.attributeValues?.[index]?.attributeValue
                      ? "error"
                      : ""
                  }
                  help={
                    errors.attributeValues?.[index]?.attributeValue?.message
                  }
                >
                  <Controller
                    name={`attributeValues.${index}.attributeValue`}
                    control={control}
                    render={({ field }) => <Input {...field} />}
                  />
                </Form.Item>
              ))
            )}
          </div>
        </Col>
      </Row>

      <Form.Item style={{ textAlign: "right", marginTop: 24 }}>
        <Button style={{ marginRight: 8 }} onClick={() => reset(data)}>
          Đặt lại
        </Button>
        <Button type="primary" htmlType="submit" loading={loading}>
          Cập nhật sản phẩm
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Update;
