import type { ColumnsType } from "antd/es/table";
import { Tag, Image } from "antd";
import { formatDate } from "@/utils/formatDate";

export interface DataType {
  id: string;
  nameProduct: string;
  description: string;
  quantity: number;
  price: number;
  categoryId: string;
  category: {
    nameCategory: string;
    description: string | null;
  };
  productImages: {
    id: string;
    imageUrl: string;
  }[];
  attributeValues: {
    attributeValue: string;
    nameAttribute: string;
    description: string | null;
    tagValue: string | null;
  }[];
  isDeleted: boolean;
  createDate: Date;
  updateDate: Date;
}

export type Mode = "add" | "edit" | "view" | null;

export const columns: ColumnsType<DataType> = [
  {
    title: "Tên sản phẩm",
    dataIndex: "nameProduct",
    key: "nameProduct",
    sorter: (a, b) => a.nameProduct.localeCompare(b.nameProduct),
  },
  {
    title: "Tên loại sản phẩm",
    dataIndex: "nameCategory",
    key: "nameCategory",
    sorter: (a, b) =>
      a.category.nameCategory.localeCompare(b.category.nameCategory),
    render: (_, record) => record.category.nameCategory,
  },
  {
    title: "Số lượng",
    dataIndex: "quantity",
    key: "quantity",
    sorter: (a, b) => a.quantity - b.quantity,
  },
  {
    title: "Mô tả",
    dataIndex: "description",
    key: "description",
    sorter: (a, b) => a.description.localeCompare(b.description),
  },
  {
    title: "Hình ảnh",
    dataIndex: "productImages",
    key: "productImages",
    render: (images: DataType["productImages"]) => (
      <Image.PreviewGroup>
        <div style={{ display: "flex", gap: 8 }}>
          {images.map((img) => (
            <Image
              key={img.id}
              src={img.imageUrl}
              alt="product"
              width={50}
              height={50}
              style={{ objectFit: "cover", borderRadius: 4 }}
              preview={{ mask: "Xem" }}
            />
          ))}
        </div>
      </Image.PreviewGroup>
    ),
  },
  {
    title: "Đã xóa",
    dataIndex: "isDeleted",
    key: "isDeleted",
    align: "center" as const,
    sorter: (a, b) => Number(b.isDeleted) - Number(a.isDeleted), // true > false
    render: (isDeleted: boolean) => (
      <Tag color={isDeleted ? "volcano" : "green"}>
        {isDeleted ? "Đã xóa" : "Chưa xóa"}
      </Tag>
    ),
  },
  {
    title: "Ngày tạo",
    dataIndex: "createDate",
    key: "createDate",
    align: "center" as const,
    render: (date: string) => formatDate(date),
  },
  {
    title: "Ngày sửa",
    dataIndex: "updateDate",
    key: "updateDate",
    align: "center" as const,
    render: (date: string) => formatDate(date),
  },
];
