/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useCallback, useState } from "react";
import { toast } from "react-toastify";
import { CustomTable } from "@/components/customAnt";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  fetchOrders,
  fetchOrderDetail,
  updateOrders,
} from "@/store/slice/orderSlice";
import DynamicModal from "@/components/DynamicModal";
import { columns } from "./constant";
import type { Mode } from "./constant";
import Update from "./components/Update";

const OrderPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { orders, meta } = useAppSelector((status) => status.orders);

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

  const handleEdit = async (record: any) => {
    const { data } = await dispatch(fetchOrderDetail(record.id)).unwrap();
    openModal("edit", data);
  };

  const handleEditSubmit = async (data: any) => {
    try {
      setSubmitLoading(true); // Bắt đầu loading
      await dispatch(updateOrders(data)).unwrap();
      toast.success("Cấp quyền thành công.");
      dataFetch(1, meta?.limit || 10, "");
      closeModal();
    } catch (err) {
      toast.error("Cấp quyền thất bại.");
      console.log(err);
    } finally {
      setSubmitLoading(false); // Kết thúc loading
    }
  };

  const dataFetch = useCallback(
    (currentPage: number, pageSize: number, searchText: string) => {
      dispatch(
        fetchOrders({ page: currentPage, limit: pageSize, search: searchText })
      ).unwrap();
    },
    [dispatch]
  );

  return (
    <>
      <CustomTable
        columns={columns}
        dataSource={orders}
        total={meta?.total}
        dataFetch={(
          currentPage: number,
          pageSize: number,
          searchText: string
        ) => {
          dataFetch(currentPage, pageSize, searchText);
        }}
        onEdit={handleEdit}
        permissions={{
          delete: { roles: ["admin", "NVNH"] },
          view: { roles: ["admin", "NVNH"] },
        }}
      />
      <DynamicModal
        open={modalOpen}
        onCancel={closeModal}
        title={modalMode === "edit" ? "Chuyển trạng thái" : "Chi tiết đơn hàng"}
      >
        {modalMode === "edit" && selectedData && (
          <Update
            onSubmit={handleEditSubmit}
            data={selectedData}
            loading={submitLoading}
          />
        )}
      </DynamicModal>
    </>
  );
};

export default OrderPage;
