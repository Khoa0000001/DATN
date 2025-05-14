import type { ColumnsType } from "antd/es/table";
import { Tag } from "antd";
import { formatDate } from "@/utils/formatDate";

export interface DataType {
  id: string;
  createDate: Date;
  updateDate: Date;
  nameCustomer: string;
  phoneCustomer: string;
  address: string;
  timeOfReceipt: string;
  paymentMethod: string;
  shippingMethod: string;
  totalAmount: number;
  status: string;
  nameUser: string;
  email: string;
}

export type Mode = "add" | "edit" | "view" | null;

export const columns: ColumnsType<DataType> = [
  {
    title: "Tên khách hàng",
    dataIndex: "nameUser",
    key: "nameUser",
    sorter: (a, b) => a.nameUser.localeCompare(b.nameUser),
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
    sorter: (a, b) => a.email.localeCompare(b.email),
  },
  {
    title: "Tổng giá tiền",
    dataIndex: "totalAmount",
    key: "totalAmount",
    sorter: (a, b) => a.totalAmount - b.totalAmount,
  },
  {
    title: "SĐT",
    dataIndex: "phoneCustomer",
    key: "phoneCustomer",
  },
  {
    title: "Người nhận",
    dataIndex: "nameCustomer",
    key: "nameCustomer",
    sorter: (a, b) => a.nameCustomer.localeCompare(b.nameCustomer),
  },
  {
    title: "Địa chỉ nhận",
    dataIndex: "address",
    key: "address",
    sorter: (a, b) => a.address.localeCompare(b.address),
  },
  {
    title: "Thời gian nhận",
    dataIndex: "timeOfReceipt",
    key: "timeOfReceipt",
    sorter: (a, b) => a.timeOfReceipt.localeCompare(b.timeOfReceipt),
  },
  {
    title: "Phương thức thanh toán",
    dataIndex: "paymentMethod",
    key: "paymentMethod",
    sorter: (a, b) => a.paymentMethod.localeCompare(b.paymentMethod),
  },
  {
    title: "Phương thức nhận",
    dataIndex: "shippingMethod",
    key: "shippingMethod",
    sorter: (a, b) => a.shippingMethod.localeCompare(b.shippingMethod),
  },
  {
    title: "Trạng thái",
    dataIndex: "status",
    key: "status",
    sorter: (a, b) => a.status.localeCompare(b.status),
    render: (status: string) => {
      let color = "";
      switch (status) {
        case "PENDING":
          color = "default";
          break;
        case "PROCESSING":
          color = "processing";
          break;
        case "SHIPPED":
          color = "blue";
          break;
        case "DELIVERED":
          color = "green";
          break;
        case "CANCELED":
          color = "red";
          break;
        default:
          color = "gray";
      }
      return <Tag color={color}>{status}</Tag>;
    },
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
