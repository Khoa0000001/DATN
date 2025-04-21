/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useCallback, useState } from "react";
import { toast } from "react-toastify";
import { CustomTable } from "@/components/customAnt";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  fetchUsers,
  fetchDetailUser,
  editRoleUser,
} from "@/store/slice/userSlice";
import DynamicModal from "@/components/DynamicModal";
import { columns } from "./constant";
import type { Mode } from "./constant";
import View from "./components/View";
import EditPermission from "./components/EditPermission";

const RolePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { users, meta } = useAppSelector((status) => status.users);

  const [modalMode, setModalMode] = useState<Mode>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedData, setSelectedData] = useState<any>(null);

  const openModal = (mode: Mode, data?: any) => {
    setModalMode(mode);
    setSelectedData(data || null);
    setModalOpen(true);
  };

  const closeModal = () => setModalOpen(false);

  const handleView = async (record: any) => {
    const { data } = await dispatch(fetchDetailUser(record.id)).unwrap();
    openModal("view", data);
  };

  const handleEditSubmit = async (data: any) => {
    console.log(data);
    try {
      await dispatch(editRoleUser(data)).unwrap();
      toast.success("Tạo thành công.");
      dataFetch(1, meta?.limit || 10, "");
      closeModal();
    } catch (err) {
      toast.error("Cập nhật thất bại.");
      console.log(err);
    }
  };

  const handleEdit = async (record: any) => {
    openModal("edit-permission", record);
  };

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
        onView={handleView}
        onEdit={handleEdit}
        permissions={{
          delete: { roles: ["admin"] },
          view: { roles: ["admin"] },
        }}
      />
      <DynamicModal
        open={modalOpen}
        onCancel={closeModal}
        title={
          modalMode === "edit-permission" ? "Cấp quyền" : "Chi tiết vai trò"
        }
      >
        {modalMode === "view" && selectedData && (
          <View data={selectedData} onClose={closeModal} />
        )}
        {modalMode === "edit-permission" && selectedData && (
          <EditPermission onSubmit={handleEditSubmit} data={selectedData} />
        )}
      </DynamicModal>
    </>
  );
};

export default RolePage;
