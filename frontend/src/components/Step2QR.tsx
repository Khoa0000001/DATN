/* eslint-disable @typescript-eslint/no-explicit-any */
import { QRCodeCanvas } from "qrcode.react";
import { useAppSelector } from "@/store/hooks";
import { getTotalPrice } from "@/store/slice/cartSlice";

interface Step2QRProps {
  shippingInfo: any;
  onBack: () => void;
}

export default function Step2QR({ shippingInfo, onBack }: Step2QRProps) {
  const { carts } = useAppSelector((state) => state.carts);
  const totalPrice = useAppSelector(getTotalPrice);
  const orderId = `ORD${Date.now()}`;
  const qrValue = `https://example.com/pay?orderId=${orderId}&amount=${totalPrice}`;

  return (
    <>
      <h2 className="text-2xl font-bold mb-4 text-center">Thanh toán</h2>
      <div className="mb-4 text-sm text-gray-700">
        <p>
          Họ tên: <strong>{shippingInfo.name}</strong>
        </p>
        <p>
          SĐT: <strong>{shippingInfo.phone}</strong>
        </p>
        <p>
          Địa chỉ: <strong>{shippingInfo.address}</strong>
        </p>
        <p>
          Thời gian nhận: <strong>{shippingInfo.deliveryTime}</strong>
        </p>
      </div>
      <div className="border-t border-b py-4 mb-4">
        {carts.map((item: any, i: number) => (
          <div key={i} className="flex justify-between text-sm mb-2">
            <span>
              {item.nameProduct} x{item.quantity}
            </span>
            <span>{(item.price * item.quantity).toLocaleString("vi-VN")}₫</span>
          </div>
        ))}
        <div className="flex justify-between font-bold mt-4">
          <span>Tổng tiền:</span>
          <span className="text-[var(--primary-color)]">
            {totalPrice.toLocaleString("vi-VN")}₫
          </span>
        </div>
      </div>
      <div className="flex justify-center mb-4">
        <QRCodeCanvas value={qrValue} size={200} />
      </div>
      <button
        className="w-full border border-gray-400 text-gray-700 py-2 rounded hover:bg-gray-100"
        onClick={onBack}
      >
        Quay lại
      </button>
    </>
  );
}
