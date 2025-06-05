/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useCallback, useState } from "react";
import { toast } from "react-toastify";
import { CustomTable } from "@/components/customAnt";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  fetchSupplierDetail,
  fetchSuppliers,
  createSupplier,
  updateSuppliery,
  deleteSuppliery,
} from "@/store/slice/supplierSlice";
import DynamicModal from "@/components/DynamicModal";
import { columns } from "./constant";
import type { Mode } from "./constant";
import Add from "./components/Add";
import Update from "./components/Update";
import View from "./components/View";

const SupplierPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { suppliers, meta } = useAppSelector((status) => status.suppliers);
  const [modalMode, setModalMode] = useState<Mode>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedData, setSelectedData] = useState<any>(null);

  const [submitLoading, setSubmitLoading] = useState(false);

  const openModal = (mode: Mode, data?: any) => {
    setModalMode(mode);
    setSelectedData(data || null);
    setModalOpen(true);
  };

  const closeModal = () => setModalOpen(false);

  const handleAddSubmit = async (data: any) => {
    console.log("data", data);
    try {
      setSubmitLoading(true); // Bắt đầu loading
      await dispatch(createSupplier(data)).unwrap();
      toast.success("Tạo thành công.");
      dataFetch(1, meta?.limit || 10, "");
      closeModal();
    } catch (err) {
      toast.error("Tạo thất bại.");
      console.log(err);
    } finally {
      setSubmitLoading(false); // Kết thúc loading
    }
  };

  const handleEditSubmit = async (data: any) => {
    try {
      setSubmitLoading(true); // Bắt đầu loading
      await dispatch(updateSuppliery(data)).unwrap();
      toast.success("Cập nhất thành công.");
      dataFetch(1, meta?.limit || 10, "");
      closeModal();
    } catch (err) {
      toast.error("Cập nhất thất bại.");
      console.log(err);
    } finally {
      setSubmitLoading(false); // Kết thúc loading
    }
  };

  const handleAdd = () => {
    openModal("add");
  };

  const handleView = async (record: any) => {
    const { data } = await dispatch(fetchSupplierDetail(record.id)).unwrap();
    openModal("view", data);
  };

  const handleEdit = async (record: any) => {
    const { data } = await dispatch(fetchSupplierDetail(record.id)).unwrap();
    openModal("edit", data);
  };

  const handleDelete = async (records: any[], callback?: () => void) => {
    const ids = records.map((_: any) => _.id);
    const { success } = await dispatch(deleteSuppliery(ids)).unwrap();
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
        fetchSuppliers({
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
        dataSource={suppliers}
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
          add: { roles: ["admin", "NVNH"] },
          edit: { roles: ["admin", "NVNH"], permissions: [] },
          delete: { roles: ["admin", "NVNH"] },
          view: { roles: ["admin", "NVNH"] },
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
        {modalMode === "add" && (
          <Add onSubmit={handleAddSubmit} loading={submitLoading} />
        )}
        {modalMode === "edit" && selectedData && (
          <Update
            onSubmit={handleEditSubmit}
            data={selectedData}
            loading={submitLoading}
          />
        )}
        {modalMode === "view" && selectedData && (
          <View data={selectedData} onClose={closeModal} />
        )}
      </DynamicModal>
    </>
  );
};

export default SupplierPage;
