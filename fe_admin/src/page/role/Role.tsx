/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useCallback } from "react";

import type { ColumnsType } from "antd/es/table";

import { CustomTable } from "@/components/customAnt";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchUsers } from "@/store/slice/userSlice";
import { Tag } from "antd";

const Role: React.FC = () => {
  interface DataType {
    id: string;
    nameUser: string;
    email: string;
    phone: string;
    address: string;
    isVerified: boolean;
  }

  const dispatch = useAppDispatch();
  const { users, meta } = useAppSelector((status) => status.users);

  const handleAdd = () => {
    console.log("add");
  };

  const handleView = (record: any) => {
    console.log(`Xem chi tiết: ${record.id}`);
  };

  const handleEdit = (record: any) => {
    console.log(`Chuyển đến chỉnh sửa: ${record.id}`);
  };

  const handleDelete = (record: any) => {
    console.log(`Đã xóa: ${record}`);
  };

  const columns: ColumnsType<DataType> = [
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
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
      key: "address",
      sorter: (a, b) => (a.address || "").localeCompare(b.address || ""),
    },
    {
      title: "Xác thực",
      dataIndex: "isVerified",
      key: "isVerified",
      width: 180,
      align: "center" as const,
      sorter: (a, b) => Number(b.isVerified) - Number(a.isVerified), // true > false
      render: (verified: boolean) => (
        <Tag color={verified ? "green" : "volcano"}>
          {verified ? "Đã xác thực" : "Chưa xác thực"}
        </Tag>
      ),
    },
  ];

  const dataFetch = useCallback(
    (currentPage: number, pageSize: number, searchText: string) => {
      dispatch(
        fetchUsers({ page: currentPage, limit: pageSize, search: searchText })
      ).unwrap();
    },
    [dispatch]
  );

  return (
    <>
      <CustomTable
        columns={columns}
        dataSource={users}
        total={meta?.total}
        dataFetch={(
          currentPage: number,
          pageSize: number,
          searchText: string
        ) => {
          dataFetch(currentPage, pageSize, searchText);
        }}
        onAdd={handleAdd}
        onView={handleView}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />
    </>
  );
};

export default Role;
