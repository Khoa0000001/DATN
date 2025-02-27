import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTag,
  faWrench,
  faShieldHeart,
  faNewspaper,
  faHouseUser,
  faMoneyBillTransfer,
  faBars,
  faArrowRightToBracket,
  faHeadset,
  faCartShopping,
  faReceipt,
  faCircleQuestion,
} from "@fortawesome/free-solid-svg-icons";
import Tippy from "@tippyjs/react";
import CollHeader from "../../components/CollHeader";
import SearchHeader from "./SearchHeader";
import BlurFull from "../../components/BlurFull";
import MenuToggle from "../../components/MenuToggle";

export default function Header() {
  const dataDichVu = [
    {
      title: "Tự Build PC theo ý của bạn",
      link: "",
      icon: faTag,
    },
    {
      title: "Tin công nghệ",
      link: "",
      icon: faNewspaper,
    },
    {
      title: "Dịch vụ sửa chữa",
      link: "",
      icon: faWrench,
    },
    {
      title: "Dịch vụ kỹ thuật tại nhà",
      link: "",
      icon: faHouseUser,
    },
    {
      title: "Thu cũ đổi mới",
      link: "",
      icon: faMoneyBillTransfer,
    },
    {
      title: "Tra cứu bảo hành",
      link: "",
      icon: faShieldHeart,
    },
  ];

  const [menuToggle, setMenuToggle] = useState(false);
  return (
    <>
      <div className="flex items-center justify-center bg-[rgb(255,183,67)] z-50 relative">
        <a href="">
          <img
            src="https://file.hstatic.net/200000722513/file/banner_ffb743.png"
            alt=""
            className="max-w-[1200px] w-full"
          />
        </a>
      </div>
      <div className="bg-[var(--primary-color)] sticky top-0 z-50 shadow-md">
        <div className="max-w-[1220px] mx-auto flex justify-between items-center bg-[var(--primary-color)] text-[var(--white-color)] p-4">
          {/* Bên trái */}
          <div className="flex items-center space-x-4">
            <div>Home</div>
            <Tippy
              content={
                <>
                  <div className="w-full sticky z-50 ">
                    <MenuToggle />
                  </div>
                </>
              }
              placement="bottom"
              theme="light"
              interactive={true}
              arrow={false}
              trigger="click"
              maxWidth="none"
              offset={[-60, 80]}
              onShow={() => setMenuToggle(true)}
              onHide={() => setMenuToggle(false)}
            >
              <div>
                <CollHeader
                  titleArray={["Danh mục"]}
                  icon={faBars}
                  color="#BE1529"
                  sizeIcon="24"
                />
              </div>
            </Tippy>
          </div>

          {/* Bên phải */}
          <div className="flex items-center space-x-4">
            <SearchHeader />
            <CollHeader titleArray={["Hotline", "0989880"]} icon={faHeadset} />
            <CollHeader
              titleArray={["Kiểm tra", "đơn hàng"]}
              icon={faReceipt}
            />
            <div className="relative">
              <CollHeader titleArray={["Giỏ", "hàng"]} icon={faCartShopping} />
              <span className="absolute -top-1 left-4 bg-[#FDD835] text-black text-xs font-bold px-1 py-0.15 rounded-full border-2 border-white">
                1
              </span>
            </div>
            <div>
              <Tippy
                placement="bottom"
                theme="light"
                interactive={true}
                content={
                  <div className="w-[320px] max-w-[400px] ">
                    <div className="p-5">
                      <span className="text-lg font-medium text-black">
                        Xin chào, vui lòng đăng nhập.
                      </span>
                      <div className="flex gap-3 mt-4">
                        <button className="flex items-center justify-center min-w-[120px] min-h-[30px] px-4 py-2 text-white bg-black border border-black rounded-md font-medium cursor-pointer transition-all hover:bg-gray-800">
                          Đăng nhập
                        </button>
                        <button className="flex items-center justify-center min-w-[120px] min-h-[30px] px-4 py-2 text-black bg-white border border-black rounded-md font-medium cursor-pointer transition-all hover:bg-gray-100">
                          Đăng ký
                        </button>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 p-4 border-t border-gray-200">
                      <FontAwesomeIcon
                        icon={faCircleQuestion}
                        className="text-gray-500"
                      />
                      <span className="text-gray-600 text-sm cursor-pointer hover:text-black">
                        Trợ giúp
                      </span>
                    </div>
                  </div>
                }
              >
                <div>
                  <CollHeader
                    titleArray={["Đăng nhập"]}
                    icon={faArrowRightToBracket}
                    color="#BE1529"
                    sizeIcon="18"
                  />
                </div>
              </Tippy>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center bg-[var(--white-color)] border-b border-[#E0E0E0]">
        <ul className="flex flex-wrap gap-4 relative w-full justify-center">
          {dataDichVu.map((item, index, arr) => (
            <li
              key={index}
              className="relative flex items-center whitespace-nowrap hover:text-[var(--primary-color)]"
            >
              <a
                href={item.link}
                className="text-[13px] py-[12px] px-[26px] font-semibold"
              >
                <FontAwesomeIcon
                  icon={item.icon}
                  className="mr-[7px] text-[19px]"
                />
                <span>{item.title}</span>
              </a>
              {index < arr.length - 1 && (
                <span className="absolute right-0 top-1/2 -translate-y-1/2 w-px h-[62%] bg-gray-300"></span>
              )}
            </li>
          ))}
        </ul>
      </div>
      <div>{menuToggle && <BlurFull />}</div>
    </>
  );
}
