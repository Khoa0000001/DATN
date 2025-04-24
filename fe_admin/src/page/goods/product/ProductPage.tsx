/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useCallback, useState } from "react";
import { toast } from "react-toastify";
import { CustomTable } from "@/components/customAnt";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  fetchProducts,
  fetchProductDetail,
  createProduct,
  deleteProduct,
  updateProduct,
} from "@/store/slice/productSlice";
import DynamicModal from "@/components/DynamicModal";
import { columns } from "./constant";
import type { Mode } from "./constant";
import Add from "./components/Add";
import View from "./components/View";
import Update from "./components/Update";

const ProductPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { products, meta } = useAppSelector((status) => status.products);

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
    console.log("submit", data);
    try {
      setSubmitLoading(true); // Bắt đầu loading
      await dispatch(createProduct(data)).unwrap();
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
    const newDate = {
      ...data,
      productImages: data.productImages.filter((_: any) => _ instanceof File),
      keepProductImages: data.productImages
        .filter((_: any) => !(_ instanceof File))
        .map((_: any) => _.id),
    };
    console.log(data);
    console.log(newDate);
    try {
      setSubmitLoading(true); // Bắt đầu loading
      await dispatch(updateProduct(newDate)).unwrap();
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
    const { data } = await dispatch(fetchProductDetail(record.id)).unwrap();
    openModal("view", data);
  };

  const handleEdit = async (record: any) => {
    const { data } = await dispatch(fetchProductDetail(record.id)).unwrap();
    openModal("edit", data);
  };

  const handleDelete = async (records: any[], callback?: () => void) => {
    const ids = records.map((_: any) => _.id);
    const { success } = await dispatch(deleteProduct(ids)).unwrap();
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
        fetchProducts({
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
        dataSource={products}
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

export default ProductPage;
