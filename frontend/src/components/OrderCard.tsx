/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { ProductItem } from "./ProductItem";
import { ChevronDown, ChevronUp } from "lucide-react";

interface Props {
  order: any;
}

export const OrderCard: React.FC<Props> = ({ order }) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="bg-white border shadow-md rounded-xl mb-6 p-6 transition-all">
      {/* Thông tin đơn hàng */}
      <div className="flex justify-between items-start">
        <div className="flex flex-col sm:flex-row gap-8 w-full">
          {/* Nhóm 1 */}
          <div className="flex-1 space-y-1">
            <p className="text-gray-600">
              <span className="font-medium">Ngày mua:</span> {order.date}
            </p>
            <p className="text-gray-600">
              <span className="font-medium">Thanh toán:</span>{" "}
              {order.paymentMethod}
            </p>
            <p className="text-gray-600">
              <span className="font-medium">Tổng tiền:</span>{" "}
              <span className="text-red-600 font-semibold">
                {order.total ? order.total.toLocaleString("vi-VN") : "0"}₫
              </span>
            </p>
          </div>

          {/* Nhóm 2 */}
          <div className="flex-1 space-y-1">
            <p className="text-gray-600">
              <span className="font-medium">Người nhận:</span>{" "}
              {order.recipientName}
            </p>
            <p className="text-gray-600">
              <span className="font-medium">SĐT:</span> {order.phoneNumber}
            </p>
            <p className="text-gray-600">
              <span className="font-medium">Địa chỉ:</span> {order.address}
            </p>
            <p className="text-gray-600">
              <span className="font-medium">Nhận lúc:</span>{" "}
              {order.deliveryTime}
            </p>
          </div>
        </div>

        {/* Nút toggle */}
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="ml-4 text-red-600 flex items-center hover:underline whitespace-nowrap  cursor-pointer"
        >
          {showDetails ? (
            <>
              Ẩn sản phẩm <ChevronUp className="ml-1 w-4 h-4" />
            </>
          ) : (
            <>
              Xem sản phẩm
              <ChevronDown className="ml-1 w-4 h-4" />
            </>
          )}
        </button>
      </div>

      {/* Chi tiết sản phẩm nổi lên */}
      {showDetails && (
        <div className="mt-6 bg-white border rounded-lg shadow-xl p-4 animate-fadeIn grid gap-4">
          {order.products.map((product: any) => (
            <ProductItem key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};
