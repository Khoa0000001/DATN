import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";

const NoOrders = () => {
  return (
    <div className="flex flex-col items-center justify-center py-20 bg-white rounded-lg shadow-md border border-gray-200">
      <div className="text-red-500 text-6xl mb-4">
        <FontAwesomeIcon icon={faCartShopping} />
      </div>
      <h2 className="text-xl font-semibold text-gray-800 mb-2">
        Không có đơn hàng nào
      </h2>
      <p className="text-gray-500 mb-6">
        Bạn chưa có đơn hàng nào. Hãy mua sắm ngay!
      </p>
      <button
        className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-full transition duration-300 shadow"
        onClick={() => (window.location.href = "/")} // ← chỉnh link tới trang shop của bạn
      >
        Tiếp tục mua hàng
      </button>
    </div>
  );
};

export default NoOrders;
