import type { ColumnsType } from "antd/es/table";
import { formatDate } from "@/utils/formatDate";

export interface DataType {
  id: string;
  permissionName: string;
  description: string;
  createDate: Date;
  updateDate: Date;
}

export type Mode = "add" | "edit" | "view" | null;

export const columns: ColumnsType<DataType> = [
  {
    title: "Tên quyền",
    dataIndex: "permissionName",
    key: "permissionName",
    sorter: (a, b) => a.permissionName.localeCompare(b.permissionName),
  },
  {
    title: "Mô tả",
    dataIndex: "description",
    key: "description",
    sorter: (a, b) => a.description.localeCompare(b.description),
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
