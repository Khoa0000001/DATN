/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useCallback, useState } from "react";
import { toast } from "react-toastify";
import { CustomTable } from "@/components/customAnt";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  fetchCategories,
  fetchCategoryDetail,
  createCategory,
  updateCategory,
} from "@/store/slice/categorySlice";
import DynamicModal from "@/components/DynamicModal";
import { columns } from "./constant";
import type { Mode } from "./constant";
import Add from "./components/Add";
import View from "./components/View";
import Update from "./components/Update";

const RolePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { categories, meta } = useAppSelector((status) => status.categories);
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
    console.log(data);
    try {
      await dispatch(createCategory(data)).unwrap();
      toast.success("Tạo thành công.");
      dataFetch(1, meta?.limit || 10, "");
      closeModal();
    } catch (err) {
      toast.error("Tạo thất bại.");
      console.log(err);
    }
  };

  const handleEditSubmit = async (data: any) => {
    try {
      await dispatch(updateCategory(data)).unwrap();
      toast.success("Cập nhất thành công.");
      dataFetch(1, meta?.limit || 10, "");
      closeModal();
    } catch (err) {
      toast.error("Cập nhất thất bại.");
      console.log(err);
    }
  };

  const handleAdd = () => {
    openModal("add");
  };

  const handleView = async (record: any) => {
    const { data } = await dispatch(fetchCategoryDetail(record.id)).unwrap();
    openModal("view", data);
  };

  const handleEdit = async (record: any) => {
    const { data } = await dispatch(fetchCategoryDetail(record.id)).unwrap();
    openModal("edit", data);
  };

  //   const handleDelete = async (records: any[], callback?: () => void) => {};

  const dataFetch = useCallback(
    (currentPage: number, pageSize: number, searchText: string) => {
      dispatch(
        fetchCategories({
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
        dataSource={categories}
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
        // onDelete={handleDelete}
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

export default RolePage;
