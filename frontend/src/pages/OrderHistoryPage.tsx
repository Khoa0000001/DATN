/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from "react";
import { OrderCard } from "../components/OrderCard";
import NoOrders from "../components/NoOrders"; // Thêm component hiển thị nếu không có đơn
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchOrders } from "@/store/slice/orderSlice";

export default function OrderHistoryPage() {
  const dispatch = useAppDispatch();
  const { orders } = useAppSelector((state) => state.orders);
  const { userInfo } = useAppSelector((state) => state.auth);
  const userId = userInfo?.userId;

  useEffect(() => {
    if (userId) dispatch(fetchOrders(userId)).unwrap();
  }, [dispatch]);
  return (
    <div className="max-w-4xl mx-auto mt-10 p-4">
      <h1 className="text-3xl font-bold text-red-600 mb-8 text-center">
        🛒 Lịch sử mua hàng
      </h1>

      {orders.length === 0 ? (
        <NoOrders />
      ) : (
        <div className="space-y-6">
          {orders.map((order: any) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>
      )}
    </div>
  );
}
