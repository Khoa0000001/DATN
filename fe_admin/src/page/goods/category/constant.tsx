import type { ColumnsType } from "antd/es/table";
import { Tag } from "antd";
import { formatDate } from "@/utils/formatDate";

export interface DataType {
  id: string;
  nameCategory: string;
  description: string;
  isDeleted: boolean;
  attributes: [
    {
      id: string;
      createDate: Date;
      updateDate: Date;
      nameAttribute: string;
      description: string;
      categoryId: string;
    }
  ];
  createDate: Date;
  updateDate: Date;
}

export type Mode = "add" | "edit" | "view" | null;

export const columns: ColumnsType<DataType> = [
  {
    title: "Tên Loại",
    dataIndex: "nameCategory",
    key: "nameCategory",
    sorter: (a, b) => a.nameCategory.localeCompare(b.nameCategory),
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
