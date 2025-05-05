/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useAppDispatch } from "@/store/hooks";
import { setShippingInfo } from "@/store/slice/cartSlice";

interface Step1FormProps {
  shippingInfo: any;
  onNext: () => void;
}

export default function Step1Form({ shippingInfo, onNext }: Step1FormProps) {
  const [errors, setErrors] = useState<{ phone?: string; address?: string }>(
    {}
  );
  const dispatch = useAppDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(
      setShippingInfo({
        ...shippingInfo,
        [e.target.name]: e.target.value,
      })
    );
    setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
  };

  const validate = () => {
    const newErrors: typeof errors = {};
    if (!/^0\d{9}$/.test(shippingInfo?.phone)) {
      newErrors.phone = "Số điện thoại không hợp lệ. VD: 0123456789";
    }
    if (!shippingInfo?.address.trim()) {
      newErrors.address = "Địa chỉ không được để trống.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validate()) {
      onNext();
    }
  };

  return (
    <>
      <h2 className="text-2xl font-bold mb-4 text-center">
        Thông tin giao hàng
      </h2>
      <div className="space-y-4">
        <div>
          <label className="block font-medium mb-1">Họ và tên</label>
          <input
            className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Nguyễn Văn A"
            name="name"
            value={shippingInfo?.name}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Số điện thoại</label>
          <input
            className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="0123456789"
            name="phone"
            value={shippingInfo?.phone}
            onChange={handleChange}
          />
          {errors.phone && (
            <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
          )}
        </div>

        <div>
          <label className="block font-medium mb-1">Địa chỉ nhận hàng</label>
          <input
            className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="123 Lê Lợi, Quận 1, TP.HCM"
            name="address"
            value={shippingInfo?.address}
            onChange={handleChange}
          />
          {errors.address && (
            <p className="text-red-500 text-sm mt-1">{errors.address}</p>
          )}
        </div>

        <div>
          <label className="block font-medium mb-1">
            Thời gian nhận hàng (nếu có)
          </label>
          <input
            className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Chiều mai, 10h sáng thứ 7, ..."
            name="deliveryTime"
            value={shippingInfo?.deliveryTime}
            onChange={handleChange}
          />
        </div>

        <button
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
          onClick={handleNext}
        >
          Tiếp tục
        </button>
      </div>
    </>
  );
}
