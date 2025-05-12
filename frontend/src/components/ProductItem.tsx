/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";

export const ProductItem: React.FC<{ product: any }> = ({ product }) => {
  return (
    <div className="flex items-center gap-4 p-3 border rounded-md bg-gray-50">
      <img
        src={product.image}
        alt={product.name}
        className="w-16 h-16 object-cover rounded-md"
      />
      <div className="flex flex-col flex-1">
        <h4 className="font-semibold">{product.name}</h4>
        <div className="text-sm text-gray-500">
          Giá:{" "}
          <span className="text-red-600 font-medium">
            {product.price.toLocaleString("vi-VN")}₫
          </span>
        </div>
        <div className="text-sm text-gray-500">
          Số lượng: {product.quantity}
        </div>
      </div>
    </div>
  );
};
