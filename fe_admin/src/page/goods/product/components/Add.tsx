/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { useForm, Controller } from "react-hook-form";
import { Button, Form, Input, InputNumber } from "antd";
import { yupResolver } from "@hookform/resolvers/yup";
import { fetchCategories } from "@/store/slice/categorySlice";
import { fetchAttributeByCategoryId } from "@/store/slice/productSlice";
import { CustomSelect, UploadMultipleImages } from "@/components/customAnt";
import * as yup from "yup";

// Định nghĩa kiểu dữ liệu cho form
export interface FormData {
  nameProduct: string;
  description?: string;
  price: number;
  categoryId: string;
  productImages: File[];
  //   attributeValues: {
  //     nameAttribute: string;
  //     attributeValue: string;
  //     description?: string | null;
  //   }[];
}

// Schema validation với Yup
const schema: yup.ObjectSchema<FormData> = yup.object({
  nameProduct: yup.string().required("Tên sản phẩm không được để trống"),
  description: yup.string().optional(),
  price: yup
    .number()
    .typeError("Giá phải là số")
    .positive("Giá phải lớn hơn 0")
    .required("Giá không được để trống"),
  categoryId: yup.string().required("Vui lòng chọn loại sản phẩm"),
  productImages: yup
    .array(yup.mixed<File>().required("Cần ít nhất 1 hình ảnh"))
    .required("Cần ít nhất 1 hình ảnh")
    .min(1, "Cần ít nhất 1 hình ảnh"),
  //   attributeValues: yup
  //     .array(
  //       yup.object({
  //         nameAttribute: yup
  //           .string()
  //           .required("Tên thuộc tính không được để trống"),
  //         attributeValue: yup.string().required("Giá trị không được để trống"),
  //         description: yup.string().nullable().optional(),
  //       })
  //     )
  //     .default([]),
});

interface Props {
  onSubmit: (data: FormData) => void;
  loading?: boolean;
}

const AddProduct: React.FC<Props> = ({ onSubmit, loading }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      nameProduct: "",
      description: "",
      price: 0,
      categoryId: "",
      productImages: [],
      //   attributeValues: [],
    },
  });

  return (
    <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
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
        label="ID loại sản phẩm"
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

      {/* Render danh sách hình ảnh */}
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
              onChange={(files) => {
                field.onChange(files); // Đừng chuyển đổi nữa, cứ giữ nguyên File[]
              }}
            />
          )}
        />
      </Form.Item>

      <Form.Item style={{ textAlign: "right" }}>
        <Button type="primary" htmlType="submit" loading={loading}>
          Tạo sản phẩm
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AddProduct;
