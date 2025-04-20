/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useCallback, useState } from "react";
import { toast } from "react-toastify";
import { CustomTable } from "@/components/customAnt";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  fetchPermissions,
  fetchPermissionDetail,
  createPermission,
  updatePermission,
  deletePermission,
} from "@/store/slice/permissionSlice";
import DynamicModal from "@/components/DynamicModal";
import { columns } from "./constant";
import type { Mode } from "./constant";
import Add from "./components/Add";
import View from "./components/View";
import Update from "./components/Update";

const PermissionPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { permissions, meta } = useAppSelector((status) => status.permissions);

  const [modalMode, setModalMode] = useState<Mode>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedData, setSelectedData] = useState<any>(null);

  const openModal = (mode: Mode, data?: any) => {
    setModalMode(mode);
    setSelectedData(data || null);
    setModalOpen(true);
  };

  const closeModal = () => setModalOpen(false);

  const handleAddSubmit = async (data: any) => {
    console.log("Submit thêm:", data);
    const { success } = await dispatch(createPermission(data)).unwrap();
    if (success) {
      toast.success("Tạo thành công.");
      dataFetch(1, meta?.limit || 10, "");
      closeModal();
    } else {
      toast.error("Tạo thất bại.");
    }
  };

  const handleEditSubmit = async (data: any) => {
    const { success } = await dispatch(updatePermission(data)).unwrap();
    if (success) {
      toast.success("Cập nhật thành công.");
      dataFetch(1, meta?.limit || 10, "");
      closeModal();
    } else {
      toast.error("Cập nhật thất bại.");
    }
  };

  const handleAdd = () => {
    openModal("add");
  };

  const handleView = async (record: any) => {
    const { data } = await dispatch(fetchPermissionDetail(record.id)).unwrap();
    openModal("view", data);
  };

  const handleEdit = async (record: any) => {
    const { data } = await dispatch(fetchPermissionDetail(record.id)).unwrap();
    openModal("edit", data);
  };

  const handleDelete = async (records: any[], callback?: () => void) => {
    const ids = records.map((_: any) => _.id);
    const { success } = await dispatch(deletePermission(ids)).unwrap();
    if (success) {
      toast.success("Xóa thành công.");
      dataFetch(1, meta?.limit || 10, "");
      callback?.(); // Gọi callback để clear selection
    } else {
      toast.error("Xóa thất bại.");
    }
  };

  const dataFetch = useCallback(
    (currentPage: number, pageSize: number, searchText: string) => {
      dispatch(
        fetchPermissions({
          page: currentPage,
          limit: pageSize,
          search: searchText,
        })
      ).unwrap();
    },
    [dispatch]
  );

  return (
    <>
      <CustomTable
        columns={columns}
        dataSource={permissions}
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
          edit: { roles: ["admin", "editor"], permissions: [] },
          delete: { roles: ["admin"] },
          view: { roles: ["admin"] },
        }}
      />
      <DynamicModal
        open={modalOpen}
        onCancel={closeModal}
        title={
          modalMode === "add"
            ? "Thêm vai trò"
            : modalMode === "edit"
            ? "Sửa vai trò"
            : "Chi tiết vai trò"
        }
      >
        {modalMode === "add" && <Add onSubmit={handleAddSubmit} />}
        {modalMode === "edit" && selectedData && (
          <Update onSubmit={handleEditSubmit} data={selectedData} />
        )}
        {modalMode === "view" && selectedData && (
          <View data={selectedData} onClose={closeModal} />
        )}
      </DynamicModal>
    </>
  );
};

export default PermissionPage;
