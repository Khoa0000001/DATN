import type { ColumnsType } from "antd/es/table";
import { Tag } from "antd";
import { formatDate } from "@/utils/formatDate";

export interface DataType {
  id: string;
  nameRole: string;
  description: string;
  isDeleted: boolean;
  createDate: Date;
  updateDate: Date;
}

export const columns: ColumnsType<DataType> = [
  {
    title: "Tên",
    dataIndex: "nameRole",
    key: "nameRole",
    sorter: (a, b) => a.nameRole.localeCompare(b.nameRole),
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
    width: 180,
    align: "center" as const,
    sorter: (a, b) => Number(b.isDeleted) - Number(a.isDeleted), // true > false
    render: (isDeleted: boolean) => (
      <Tag color={isDeleted ? "green" : "volcano"}>
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
