/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useMemo, useState } from "react";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { getTotalPrice } from "@/store/slice/cartSlice";
import { createQR } from "@/store/slice/cartSlice";
import Loading from "@/components/Loading";
import socket from "@/utils/socket";
import { deleteAllData } from "@/store/slice/cartSlice";
import SuccessMessage from "@/components/SuccessMessage";

interface Step2QRProps {
  shippingInfo: any;
  onBack: () => void;
  onClose: () => void;
}

export default function Step2QR({
  shippingInfo,
  onBack,
  onClose,
}: Step2QRProps) {
  const dispatch = useAppDispatch();
  const [maQR, setMaQR] = useState<string>();
  const [isLoadingQR, setIsLoadingQR] = useState(true);
  const [showSuccess, setShowSuccess] = useState(false);
  const { carts } = useAppSelector((state) => state.carts);
  const { userInfo } = useAppSelector((state) => state.auth);
  const totalPrice = useAppSelector(getTotalPrice);
  // const totalPriceQR = totalPrice / 1000;
  const totalPriceQR = 5000;

  const acc = "105875260930";
  const bank = "VietinBank";

  useEffect(() => {
    (async () => {
      try {
        setIsLoadingQR(true); // bắt đầu loading
        const data = await dispatch(
          createQR({
            shippingInfo: {
              ...shippingInfo,
              userId: userInfo?.userId,
              totalPrice: totalPrice,
            },
            listCarts: carts.map((_: any) => ({
              productId: _.id,
              price: _.price,
              quantity: _.quantity,
            })),
          })
        ).unwrap();

        setMaQR(data.data.MaQR); // cập nhật QR
      } catch (err) {
        console.error("Error creating carts:", err);
      } finally {
        setIsLoadingQR(false); // kết thúc loading
      }
    })();
  }, [dispatch, carts, userInfo]);

  useEffect(() => {
    if (!userInfo?.userId) return;

    socket.emit("join", userInfo?.userId);

    socket.on("payment-success", (data) => {
      dispatch(deleteAllData());
      setShowSuccess(true); // hiển thị thông báo
    });

    return () => {
      socket.off("payment-success");
    };
  }, [userInfo?.userId]);

  // ✅ Tạo qrValue sau khi có listCarts
  const qrValue = useMemo(() => {
    console.log(maQR);
    return `https://qr.sepay.vn/img?acc=${acc}&bank=${bank}&amount=${totalPriceQR}&des=SEVQR%20${maQR}`;
  }, [maQR, totalPriceQR]);

  return (
    <div className="py-2 px-2 max-w-md mx-auto relative">
      {showSuccess && (
        <SuccessMessage
          message="Bạn đã thanh toán thành công!"
          onClose={onClose} // đóng Step2 khi tắt thông báo
        />
      )}
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

      <div className="border-t border-b py-4 mb-4 max-h-[200px] overflow-y-auto">
        {carts.map((item: any, i: number) => (
          <div key={i} className="flex justify-between text-sm mb-2">
            <span>
              {item.nameProduct} x{item.quantity}
            </span>
            <span>{(item.price * item.quantity).toLocaleString("vi-VN")}₫</span>
          </div>
        ))}
      </div>

      <div className="flex justify-between font-bold mb-4">
        <span>Tổng tiền:</span>
        <span className="text-[var(--primary-color)]">
          {totalPrice.toLocaleString("vi-VN")}₫
        </span>
      </div>

      <div className="flex justify-center mb-4">
        {isLoadingQR ? (
          <div className="flex justify-center items-center max-h-[176px] w-44">
            <Loading title="Đang tạo mã QR..." />
          </div>
        ) : (
          <img src={qrValue} alt="QR Code" className="w-44" />
        )}
      </div>

      <button
        className="w-full border border-gray-400 text-gray-700 py-2 rounded hover:bg-gray-100"
        onClick={onBack}
      >
        Quay lại
      </button>
    </div>
  );
}
