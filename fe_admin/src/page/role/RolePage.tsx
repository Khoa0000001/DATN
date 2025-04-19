/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useCallback } from "react";

import { CustomTable } from "@/components/customAnt";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchRoles } from "@/store/slice/roleSlice";
import { columns } from "./constant";
import Add from "./components/Add";

const RolePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { roles, meta } = useAppSelector((status) => status.roles);

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

  const dataFetch = useCallback(
    (currentPage: number, pageSize: number, searchText: string) => {
      dispatch(
        fetchRoles({ page: currentPage, limit: pageSize, search: searchText })
      ).unwrap();
    },
    [dispatch]
  );

  return (
    <>
      <CustomTable
        columns={columns}
        dataSource={roles}
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
        permissions={{
          add: { roles: ["admin", "editor"] },
          edit: { permissions: ["update_document"] },
          delete: { roles: ["admin"] },
          view: { roles: ["editor"], permissions: ["view_role"] },
        }}
      />
    </>
  );
};

export default RolePage;
