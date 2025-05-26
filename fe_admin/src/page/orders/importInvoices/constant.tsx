import type { ColumnsType } from "antd/es/table";
import { Tag } from "antd";
import { formatDate } from "@/utils/formatDate";

export interface DataType {
  id: string;
  createDate: string;
  updateDate: string;
  importDate: string;
  totalAmount: number;
  description: string | null;
  status: string;
  isDeleted: boolean;
  nameSupplier: string;
}

export type Mode = "add" | "edit" | "view" | null;
export const columns: ColumnsType<DataType> = [
  {
    title: "Nhà cung cấp",
    dataIndex: "nameSupplier",
    key: "nameSupplier",
    sorter: (a, b) => a.nameSupplier.localeCompare(b.nameSupplier),
  },
  {
    title: "Tổng tiền",
    dataIndex: "totalAmount",
    key: "totalAmount",
    sorter: (a, b) => a.totalAmount - b.totalAmount,
  },
  {
    title: "Ngày nhập",
    dataIndex: "importDate",
    key: "importDate",
    render: (date: string) => formatDate(date),
    sorter: (a, b) => a.importDate.localeCompare(b.importDate),
  },
  {
    title: "Trạng thái",
    dataIndex: "status",
    key: "status",
    sorter: (a, b) => a.status.localeCompare(b.status),
    render: (status: string) => {
      let color = "";
      let text = "";

      switch (status) {
        case "PENDING":
          color = "orange";
          text = "Chờ duyệt";
          break;
        case "COMPLETED":
          color = "green";
          text = "Hoàn tất";
          break;
        case "CANCELED":
          color = "red";
          text = "Đã hủy";
          break;
        default:
          color = "gray";
          text = status;
      }

      return <Tag color={color}>{text}</Tag>;
    },
  },
  {
    title: "Ngày cập nhật",
    dataIndex: "updateDate",
    key: "updateDate",
    render: (date: string) => formatDate(date),
    align: "center" as const,
  },
];
