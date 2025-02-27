import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export default function Footer() {
  return (
    <footer className=" bg-[#fff]">
      <div className="pt-[30px]">
        <div className="max-w-[1220px] mx-[auto] px-[10px]">
          <div className="grid grid-cols-12 gap-4 text-black">
            <div className=" col-span-2 p-4 ">
              <div className="pb-[12px]">
                <h4 className="text-[16px] font-[600] mb-[10px]">Về GEARVN</h4>
                <div>
                  <ul className="text-[14px] font-[400]">
                    <li className="block pb-[8px] cursor-pointer hover:text-[var(--primary-color)]">
                      Giới thiệu
                    </li>
                    <li className="block pb-[8px] cursor-pointer hover:text-[var(--primary-color)]">
                      Tuyển dụng
                    </li>
                    <li className="block pb-[8px] cursor-pointer hover:text-[var(--primary-color)]">
                      Liên hệ
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className=" col-span-2 p-4 ">
              <div className="pb-[12px]">
                <h4 className="text-[16px] font-[600] mb-[10px]">Chính sách</h4>
                <div>
                  <ul className="text-[14px] font-[400]">
                    <li className="block pb-[8px] cursor-pointer hover:text-[var(--primary-color)]">
                      Chính sách bảo hành
                    </li>
                    <li className="block pb-[8px] cursor-pointer hover:text-[var(--primary-color)]">
                      Chính sách giao hàng
                    </li>
                    <li className="block pb-[8px] cursor-pointer hover:text-[var(--primary-color)]">
                      Chính sách bảo mật
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className=" col-span-2 p-4 ">
              <div className="pb-[12px]">
                <h4 className="text-[16px] font-[600] mb-[10px]">Thông tin</h4>
                <div>
                  <ul className="text-[14px] font-[400]">
                    <li className="block pb-[8px] cursor-pointer hover:text-[var(--primary-color)]">
                      Hệ thống cửa hàng
                    </li>
                    <li className="block pb-[8px] cursor-pointer hover:text-[var(--primary-color)]">
                      Hướng dẫn mua hàng
                    </li>
                    <li className="block pb-[8px] cursor-pointer hover:text-[var(--primary-color)]">
                      Hướng dẫn thanh toán
                    </li>
                    <li className="block pb-[8px] cursor-pointer hover:text-[var(--primary-color)]">
                      Hướng dẫn trả góp
                    </li>
                    <li className="block pb-[8px] cursor-pointer hover:text-[var(--primary-color)]">
                      Tra cứu địa chỉ bảo hành
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-span-3 p-4">
              <div className="pb-[12px]">
                <h4 className="text-[16px] font-[600] mb-[10px]">
                  TỔNG ĐÀI HỖ TRỢ
                  <span className="text-[15px] font-[400]">
                    {" "}
                    (8:00 - 21:00)
                  </span>
                </h4>
                <div>
                  <ul className="text-[14px] font-[400]">
                    <li className="block pb-[8px] ">
                      <span className="w-[80px] inline-block pr-[6px]">
                        Mua hàng:
                      </span>
                      <a href="" className="text-[#1982F9] font-[600]">
                        1900.5301
                      </a>
                    </li>
                    <li className="block pb-[8px] ">
                      <span className="w-[80px] inline-block pr-[6px]">
                        Bảo hành:
                      </span>
                      <a href="" className="text-[#1982F9] font-[600]">
                        1900.5301
                      </a>
                    </li>
                    <li className="block pb-[8px] ">
                      <span className="w-[80px] inline-block pr-[6px]">
                        Khiếu nại:
                      </span>
                      <a href="" className="text-[#1982F9] font-[600]">
                        1900.5301
                      </a>
                    </li>
                    <li className="block pb-[8px] ">
                      <span className="w-[80px] inline-block pr-[6px]">
                        Email:
                      </span>
                      <a href="" className="text-[#1982F9] font-[600]">
                        cskh@gearvn.com
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-span-3 p-4">
              <div className="pb-[12px]">
                <h4 className="text-[16px] font-[600] mb-[10px] ]">
                  Đơn vị vận chuyển
                </h4>
                <div className="grid grid-cols-4">
                  <div>
                    <img
                      src="https://theme.hstatic.net/200000722513/1001090675/14/ship_1.png?v=7925"
                      alt=""
                    />
                  </div>
                  <div>
                    <img
                      src="https://theme.hstatic.net/200000722513/1001090675/14/ship_2.png?v=7925"
                      alt=""
                    />
                  </div>
                  <div>
                    <img
                      src="https://theme.hstatic.net/200000722513/1001090675/14/ship_3.png?v=7925"
                      alt=""
                    />
                  </div>
                  <div>
                    <img
                      src="https://theme.hstatic.net/200000722513/1001090675/14/ship_4.png?v=7925"
                      alt=""
                    />
                  </div>
                </div>
              </div>
              <div className="pb-[12px]">
                <h4 className="text-[16px] font-[600] mb-[10px]">
                  Cách thức thanh toán
                </h4>
                <div className="grid grid-cols-4 gap-1">
                  <div>
                    <img
                      src="https://theme.hstatic.net/200000722513/1001090675/14/pay_1.png?v=7925"
                      alt=""
                    />
                  </div>
                  <div>
                    <img
                      src="https://theme.hstatic.net/200000722513/1001090675/14/pay_2.png?v=7925"
                      alt=""
                    />
                  </div>
                  <div>
                    <img
                      src="https://theme.hstatic.net/200000722513/1001090675/14/pay_3.png?v=7925"
                      alt=""
                    />
                  </div>
                  <div>
                    <img
                      src="https://theme.hstatic.net/200000722513/1001090675/14/pay_4.png?v=7925"
                      alt=""
                    />
                  </div>
                  <div>
                    <img
                      src="https://theme.hstatic.net/200000722513/1001090675/14/pay_5.png?v=7925"
                      alt=""
                    />
                  </div>
                  <div>
                    <img
                      src="https://theme.hstatic.net/200000722513/1001090675/14/pay_6.png?v=7925"
                      alt=""
                    />
                  </div>
                  <div>
                    <img
                      src="https://theme.hstatic.net/200000722513/1001090675/14/pay_7.png?v=7925"
                      alt=""
                    />
                  </div>
                  <div>
                    <img
                      src="https://theme.hstatic.net/200000722513/1001090675/14/pay_8.png?v=7925"
                      alt=""
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="pt-[16px] ">
        <div className="max-w-[1220px] mx-[auto] px-[10px]">
          <div className="py-[16px] border-t border-[var(--color-body-bg)] flex items-center min-h-[80px]">
            <h4 className="text-[18px] font-[600]">Kết nối với chúng tôi</h4>
            <div className="flex items-center ml-[14px]">
              <a href="">
                <img
                  src="https://file.hstatic.net/200000636033/file/facebook_1_0e31d70174824ea184c759534430deec.png"
                  alt=""
                  className="h-[32px] mr-[12px]"
                />
              </a>
              <a href="">
                <img
                  src="https://file.hstatic.net/200000722513/file/tiktok-logo_fe1e020f470a4d679064cec31bc676e4.png"
                  alt=""
                  className="h-[32px] mr-[12px]"
                />
              </a>
              <a href="">
                <img
                  src="https://file.hstatic.net/200000636033/file/youtube_1_d8de1f41ca614424aca55aa0c2791684.png"
                  alt=""
                  className="h-[32px] mr-[12px]"
                />
              </a>
              <a href="">
                <img
                  src="https://file.hstatic.net/200000722513/file/icon_zalo__1__f5d6f273786c4db4a3157f494019ab1e.png"
                  alt=""
                  className="h-[32px] mr-[12px]"
                />
              </a>
              <a href="">
                <img
                  src="https://file.hstatic.net/200000636033/file/group_1_54d23abd89b74ead806840aa9458661d.png"
                  alt=""
                  className="h-[32px] mr-[12px]"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
