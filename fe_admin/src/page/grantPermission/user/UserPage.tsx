/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useCallback, useState } from "react";
// import { toast } from "react-toastify";
import { CustomTable } from "@/components/customAnt";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchUsers, fetchDetailUser } from "@/store/slice/userSlice";
import DynamicModal from "@/components/DynamicModal";
import { columns } from "./constant";
import type { Mode } from "./constant";
import View from "./components/View";

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

  //   const handleDelete = async (records: any[], callback?: () => void) => {
  //     const ids = records.map((_: any) => _.id);
  //     const { success } = await dispatch(deleteRole(ids)).unwrap();
  //     if (success) {
  //       toast.success("Xóa thành công.");
  //       dataFetch(1, meta?.limit || 10, "");
  //       callback?.(); // Gọi callback để clear selection
  //     } else {
  //       toast.error("Xóa thất bại.");
  //     }
  //   };

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
        // onDelete={handleDelete}
        permissions={{
          delete: { roles: ["admin"] },
          view: { roles: ["admin"] },
        }}
      />
      <DynamicModal
        open={modalOpen}
        onCancel={closeModal}
        title={
          modalMode === "add-permission" ? "Cấp quyền" : "Chi tiết vai trò"
        }
      >
        {modalMode === "view" && selectedData && (
          <View data={selectedData} onClose={closeModal} />
        )}
      </DynamicModal>
    </>
  );
};

export default RolePage;
