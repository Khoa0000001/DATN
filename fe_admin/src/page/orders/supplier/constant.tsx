import type { ColumnsType } from "antd/es/table";
import { Tag } from "antd";
import { formatDate } from "@/utils/formatDate";

export interface DataType {
  id: string;
  createDate: Date;
  updateDate: Date;
  nameSupplier: string;
  address: string;
  email: string;
  phone: string;
  description: string;
  isDeleted: boolean;
}

export type Mode = "add" | "edit" | "view" | null;

export const columns: ColumnsType<DataType> = [
  {
    title: "Tên nhà cung cấp",
    dataIndex: "nameSupplier",
    key: "nameSupplier",
    sorter: (a, b) => a.nameSupplier.localeCompare(b.nameSupplier),
  },
  {
    title: "Địa chỉ",
    dataIndex: "address",
    key: "address",
    sorter: (a, b) => a.address.localeCompare(b.address),
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
    sorter: (a, b) => a.email.localeCompare(b.email),
  },
  {
    title: "SĐT",
    dataIndex: "phone",
    key: "phone",
  },
  {
    title: "Mô tả",
    dataIndex: "description",
    key: "description",
    sorter: (a, b) => a.description.localeCompare(b.description),
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
