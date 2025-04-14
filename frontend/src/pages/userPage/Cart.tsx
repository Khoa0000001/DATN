import CheckoutSteps from "@/components/CheckoutSteps";
import Button from "@/components/Button";
import CartItem from "@/components/CartItemProps";
import DiscountCode from "@/components/DiscountCode";
export default function Cart() {
  return (
    <div className="max-w-[620px] mx-[auto]">
      <div className="pt-[18px]">
        <div className="bg-white">
          <div className="p-[8px]">
            <div className="px-[14px] bg-[#FFEDED]">
              <CheckoutSteps currentStep={1} />
            </div>
          </div>
          {true ? (
            <div className="px-[16px]">
              <div className="py-[16px] border-b border-gray-300">
                <CartItem
                  image="src\assets\image\yaoyao.jpg"
                  name='Màn hình Viewsonic VA2432-H 24" IPS 100Hz viền mỏng'
                  price={1990000}
                  oldPrice={4550000}
                  quantity={1}
                  onRemove={() => console.log("Removed")}
                  onIncrease={() => console.log("Increased")}
                  onDecrease={() => console.log("Decreased")}
                />
                <CartItem
                  image="src\assets\image\yaoyao.jpg"
                  name='Màn hình Viewsonic VA2432-H 24" IPS 100Hz viền mỏng'
                  price={1990000}
                  oldPrice={4550000}
                  quantity={1}
                  onRemove={() => console.log("Removed")}
                  onIncrease={() => console.log("Increased")}
                  onDecrease={() => console.log("Decreased")}
                />
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
                      2.130.000₫
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
                  <a href="">
                    <Button
                      color="#fff"
                      className="ml-[16px] border-2 border-[#2485f6] text-[#2485f6]"
                    >
                      Tiếp tục mua hàng
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
