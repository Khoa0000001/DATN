/* eslint-disable @typescript-eslint/no-explicit-any */
import CheckoutSteps from "@/components/CheckoutSteps";
import Button from "@/components/Button";
import CartItem from "@/components/CartItemProps";
import DiscountCode from "@/components/DiscountCode";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  removeItem,
  increaseQuantity,
  decreaseQuantity,
  getTotalPrice,
} from "@/store/slice/cartSlice";
import { Link } from "react-router-dom";
export default function Cart() {
  const dispatch = useAppDispatch();
  const { carts } = useAppSelector((state) => state.carts);
  const totalPrice = useAppSelector(getTotalPrice);
  console.log(carts);

  // Xóa sản phẩm khỏi giỏ hàng
  const handleRemoveItem = (item: any) => {
    dispatch(removeItem(item)); // Dispatch action xóa sản phẩm
  };

  // Tăng số lượng sản phẩm
  const handleIncreaseQuantity = (item: any) => {
    dispatch(increaseQuantity(item)); // Dispatch action tăng số lượng
  };

  // Giảm số lượng sản phẩm
  const handleDecreaseQuantity = (item: any) => {
    dispatch(decreaseQuantity(item)); // Dispatch action giảm số lượng
  };
  return (
    <div className="max-w-[620px] mx-[auto]">
      <div className="pt-[18px]">
        <div className="bg-white">
          <div className="p-[8px]">
            <div className="px-[14px] bg-[#FFEDED]">
              <CheckoutSteps currentStep={1} />
            </div>
          </div>
          {Array.isArray(carts) && carts.length > 0 ? (
            <div className="px-[16px]">
              <div className="py-[16px] border-b border-gray-300">
                {carts?.map((item: any, index: number) => (
                  <CartItem
                    key={index}
                    id={item.id}
                    image={item.productImages[0].imageUrl}
                    name={item.nameProduct}
                    price={item.price}
                    oldPrice={4550000}
                    quantity={item.quantity}
                    onRemove={() => handleRemoveItem(item)}
                    onIncrease={() => handleIncreaseQuantity(item)}
                    onDecrease={() => handleDecreaseQuantity(item)}
                  />
                ))}
              </div>
              <div className="py-[16px] border-b border-gray-300">
                <DiscountCode />
              </div>
              <div className="py-[16px]">
                <div className="mb-[14px]">
                  <div className="flex justify-between items-center">
                    <h1 className="font-[700]">Phí vận chuyển:</h1>
                    <span className="font-[600]">40.000₫</span>
                  </div>
                  <div className="flex justify-between items-center mt-[14px]">
                    <h2 className="font-[700]">Tổng tiền:</h2>
                    <span className="font-[600] text-[22px] text-[var(--primary-color)]">
                      {totalPrice.toLocaleString("vi-VN")}₫
                    </span>
                  </div>
                </div>
                <Button
                  color="var(--primary-color)"
                  className="w-[100%] text-white py-[20px]"
                >
                  ĐẶT HÀNG NGAY
                </Button>
              </div>
            </div>
          ) : (
            <div className="px-[16px] py-[28px]">
              <div className="py-[16px] flex flex-col justify-center ">
                <span className="flex justify-center ">
                  Giỏ hàng của bạn đang trống
                </span>
                <div className="flex justify-center mt-[16px]">
                  <Link to="/">
                    <Button
                      color="#fff"
                      className="ml-[16px] border-2 border-[#2485f6] text-[#2485f6]"
                    >
                      Tiếp tục mua hàng
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
