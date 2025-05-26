/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from "react";
import {
  Form,
  InputNumber,
  Button,
  Select,
  DatePicker,
  Typography,
  Divider,
  Row,
  Col,
} from "antd";
import { Controller, useForm, useFieldArray, useWatch } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { fetchProducts } from "@/store/slice/productSlice";
import { fetchSuppliers } from "@/store/slice/supplierSlice";

const { Option } = Select;
const { Title } = Typography;

const schema = yup.object().shape({
  supplierId: yup.string().required("Vui lòng chọn nhà cung cấp"),
  importDate: yup.date().required("Vui lòng chọn ngày nhập"),
  status: yup
    .mixed<"PENDING" | "COMPLETED" | "CANCELED">()
    .oneOf(["PENDING", "COMPLETED", "CANCELED"], "Trạng thái không hợp lệ")
    .required("Vui lòng chọn trạng thái"),
  products: yup
    .array()
    .of(
      yup.object().shape({
        productId: yup.string().required("Vui lòng chọn sản phẩm"),
        quantity: yup
          .number()
          .typeError("Số lượng phải là số")
          .positive("Số lượng phải lớn hơn 0")
          .required("Vui lòng nhập số lượng"),
        importPrice: yup
          .number()
          .typeError("Giá nhập phải là số")
          .positive("Giá nhập phải lớn hơn 0")
          .required("Vui lòng nhập giá nhập"),
      })
    )
    .min(1, "Vui lòng thêm ít nhất một sản phẩm")
    .required("Vui lòng thêm ít nhất một sản phẩm"),
});

interface ProductInput {
  productId: string;
  quantity: number;
  importPrice: number;
}

interface AddFormInputs {
  supplierId: string;
  importDate: Date;
  status: "PENDING" | "COMPLETED" | "CANCELED";
  products: ProductInput[];
}

interface Props {
  onSubmit: (data: AddFormInputs & { totalAmount: number }) => void;
  loading?: boolean;
}

const Add: React.FC<Props> = ({ onSubmit, loading }) => {
  const dispatch = useAppDispatch();
  const { suppliers } = useAppSelector((state) => state.suppliers);
  const { products } = useAppSelector((state) => state.products);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<AddFormInputs>({
    resolver: yupResolver(schema),
    defaultValues: {
      supplierId: "",
      importDate: undefined,
      status: "PENDING",
      products: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "products",
  });

  const watchedProducts = useWatch({
    control,
    name: "products",
  });

  useEffect(() => {
    dispatch(fetchProducts({})).unwrap();
    dispatch(fetchSuppliers({})).unwrap();
  }, []);

  const totalAmount =
    watchedProducts?.reduce((sum: number, item: any) => {
      const quantity = Number(item?.quantity) || 0;
      const price = Number(item?.importPrice) || 0;
      return sum + quantity * price;
    }, 0) ?? 0;

  const handleValidSubmit = (data: any) => {
    onSubmit({
      ...data,
      totalAmount,
      importDate: data.importDate,
      products:
        data?.products?.map((item: any) => ({
          ...item,
          totalImportPrice: item.importPrice * item.quantity,
        })) ?? [],
    });
  };

  return (
    <Form layout="vertical" onFinish={handleSubmit(handleValidSubmit)}>
      <Title level={3}>Thêm hóa đơn nhập hàng</Title>

      <Form.Item
        label="Nhà cung cấp"
        validateStatus={errors.supplierId ? "error" : ""}
        help={errors.supplierId?.message}
      >
        <Controller
          name="supplierId"
          control={control}
          render={({ field }) => (
            <Select {...field} placeholder="Chọn nhà cung cấp">
              {suppliers.map((s: any) => (
                <Option key={s.id} value={s.id}>
                  {s.nameSupplier}
                </Option>
              ))}
            </Select>
          )}
        />
      </Form.Item>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            label="Ngày nhập"
            validateStatus={errors.importDate ? "error" : ""}
            help={errors.importDate?.message}
          >
            <Controller
              name="importDate"
              control={control}
              render={({ field }) => (
                <DatePicker
                  {...field}
                  format="YYYY-MM-DD"
                  onChange={(date) => field.onChange(date)}
                  style={{ width: "100%" }}
                />
              )}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="Trạng thái"
            validateStatus={errors.status ? "error" : ""}
            help={errors.status?.message}
          >
            <Controller
              name="status"
              control={control}
              render={({ field }) => (
                <Select {...field} placeholder="Chọn trạng thái">
                  <Option value="PENDING">Chờ duyệt</Option>
                  <Option value="COMPLETED">Hoàn tất</Option>
                  <Option value="CANCELED">Đã hủy</Option>
                </Select>
              )}
            />
          </Form.Item>
        </Col>
      </Row>

      <Divider />
      <Title level={4}>Danh sách sản phẩm</Title>

      {fields.map((item, index) => (
        <Row gutter={16} key={item.id} align="middle">
          <Col span={6}>
            <Form.Item
              label="Sản phẩm"
              validateStatus={
                errors.products?.[index]?.productId ? "error" : ""
              }
              help={errors.products?.[index]?.productId?.message}
            >
              <Controller
                name={`products.${index}.productId`}
                control={control}
                render={({ field }) => (
                  <Select {...field} placeholder="Chọn sản phẩm">
                    {products.map((p: any) => (
                      <Option key={p.id} value={p.id}>
                        {p.nameProduct}
                      </Option>
                    ))}
                  </Select>
                )}
              />
            </Form.Item>
          </Col>

          <Col span={4}>
            <Form.Item
              label="Số lượng"
              validateStatus={errors.products?.[index]?.quantity ? "error" : ""}
              help={errors.products?.[index]?.quantity?.message}
            >
              <Controller
                name={`products.${index}.quantity`}
                control={control}
                render={({ field }) => (
                  <InputNumber
                    {...field}
                    min={1}
                    onChange={(val) => field.onChange(val)}
                  />
                )}
              />
            </Form.Item>
          </Col>

          <Col span={4}>
            <Form.Item
              label="Giá nhập"
              validateStatus={
                errors.products?.[index]?.importPrice ? "error" : ""
              }
              help={errors.products?.[index]?.importPrice?.message}
            >
              <Controller
                name={`products.${index}.importPrice`}
                control={control}
                render={({ field }) => (
                  <InputNumber
                    {...field}
                    min={0}
                    onChange={(val) => field.onChange(val)}
                    style={{ width: "100%" }}
                  />
                )}
              />
            </Form.Item>
          </Col>

          <Col span={4}>
            <Form.Item label="Tổng giá">
              <InputNumber
                value={
                  (Number(watchedProducts?.[index]?.quantity) || 0) *
                  (Number(watchedProducts?.[index]?.importPrice) || 0)
                }
                disabled
              />
            </Form.Item>
          </Col>

          <Col span={4}>
            <Button danger onClick={() => remove(index)}>
              Xóa
            </Button>
          </Col>
        </Row>
      ))}

      <Form.Item>
        <Button
          type="dashed"
          onClick={() => append({ productId: "", quantity: 1, importPrice: 0 })}
        >
          Thêm sản phẩm
        </Button>
      </Form.Item>

      <Divider />
      <Title level={4}>
        Tổng giá trị hóa đơn: {totalAmount.toLocaleString()} VND
      </Title>

      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>
          Lưu hóa đơn
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Add;
