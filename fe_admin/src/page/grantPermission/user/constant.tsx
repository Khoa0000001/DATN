import type { ColumnsType } from "antd/es/table";
import { Tag } from "antd";
import { formatDate } from "@/utils/formatDate";

export interface DataType {
  id: string;
  nameUser: string;
  email: string;
  phone: string;
  address: string;
  userRoles: [
    {
      role: {
        nameRole: string;
      };
    }
  ];
  isDeleted: boolean;
  isVerified: boolean;
  createDate: Date;
  updateDate: Date;
}

export type Mode = "add-permission" | "view" | null;

export const columns: ColumnsType<DataType> = [
  {
    title: "Tên",
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
    title: "Số điện thoại",
    dataIndex: "phone",
    key: "phone",
    sorter: (a, b) => a.phone.localeCompare(b.phone),
  },
  {
    title: "Địa chỉ",
    dataIndex: "address",
    key: "address",
    sorter: (a, b) => a.address.localeCompare(b.address),
  },
  {
    title: "Vai trò",
    dataIndex: "userRoles",
    key: "userRoles",
    render: (roles: DataType["userRoles"]) => (
      <>
        {roles.map((roleObj, index) => (
          <Tag color="blue" key={index}>
            {roleObj.role.nameRole}
          </Tag>
        ))}
      </>
    ),
  },
  {
    title: "Đã xóa",
    dataIndex: "isDeleted",
    key: "isDeleted",
    align: "center" as const,
    sorter: (a, b) => Number(b.isDeleted) - Number(a.isDeleted), // true > false
    render: (isDeleted: boolean) => (
      <Tag color={isDeleted ? "green" : "volcano"}>
        {isDeleted ? "Đã xóa" : "Chưa xóa"}
      </Tag>
    ),
  },
  {
    title: "Đã xác thực",
    dataIndex: "isVerified",
    key: "isVerified",
    align: "center" as const,
    sorter: (a, b) => Number(b.isVerified) - Number(a.isVerified), // true > false
    render: (isVerified: boolean) => (
      <Tag color={isVerified ? "green" : "volcano"}>
        {isVerified ? "Đã xác thực" : "Chưa xác thực"}
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
