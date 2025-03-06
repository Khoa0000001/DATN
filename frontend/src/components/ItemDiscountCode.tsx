import React from "react";
import Button from "@/components/Button";

interface ItemDiscountCardProps {
  title: string;
  code: string;
  expiry: string;
}

const ItemDiscountCard: React.FC<ItemDiscountCardProps> = ({
  title,
  code,
  expiry,
}) => {
  return (
    <div className="flex items-center border rounded-lg px-[8px] shadow-md w-full max-w-lg">
      <div className="flex items-center justify-center w-16 h-16 rounded-lg">
        <img src="src/assets/image/DiscountCode.webp" alt="" />
      </div>
      <div className="ml-4 flex-grow">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-gray-500 text-[12px]">null</p>
        <p className="text-[12px]">
          Mã: <span className="font-bold">{code}</span>
        </p>
        <p className=" text-gray-500 text-[12px]">HSD: {expiry}</p>
      </div>
      <Button color="#2485f6" className=" text-white">
        Áp dụng
      </Button>
    </div>
  );
};

export default ItemDiscountCard;
