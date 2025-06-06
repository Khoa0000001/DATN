import { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTag,
  faWrench,
  faShieldHeart,
  faNewspaper,
  faHouseUser,
  faMoneyBillTransfer,
  faBars,
  faHeadset,
  faCartShopping,
  faReceipt,
} from "@fortawesome/free-solid-svg-icons";
import Tippy from "@tippyjs/react";
import CollHeader from "../../components/CollHeader";
import SearchHeader from "./SearchHeader";
import BlurFull from "../../components/BlurFull";
import MenuToggle from "../../components/MenuToggle";
import LoginRegister from "./LoginRegister";
import MenuMobile from "../../components/MenuMobile";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import UserDropdown from "@/components/UserDropdown";
import { Link } from "react-router-dom";
import { getTotalQuantity, setCartPosition } from "@/store/slice/cartSlice";

export default function Header() {
  const dataDichVu = [
    {
      title: "Tự Build PC theo ý của bạn",
      link: "/build-pc",
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

  const { userInfo } = useAppSelector((state) => state.auth);
  const totalQuantity = useAppSelector(getTotalQuantity);

  const [menuToggle, setMenuToggle] = useState(false);
  const cartRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (cartRef.current) {
      const rect = cartRef.current.getBoundingClientRect();
      dispatch(setCartPosition({ x: rect.left, y: rect.top }));
    }
  }, []);
  return (
    <>
      <Sheet>
        <div className="hidden sm:flex items-center justify-center bg-[rgb(0,0,0)] z-50 relative">
          <a>
            <img
              src="https://file.hstatic.net/200000722513/file/banner_000000.jpg"
              alt=""
              className="max-w-[1200px] w-full"
            />
          </a>
        </div>
        <div className="bg-[var(--primary-color)] sticky top-0 z-50 shadow-md">
          <div className="max-w-[1220px] mx-auto flex justify-between items-center bg-[var(--primary-color)] text-[var(--white-color)] p-4">
            {/* Bên trái */}
            <div className=" flex items-center space-x-4">
              <div className="hidden lg:flex items-center gap-2">
                <Link to={"/"}>
                  <img
                    src="/src/assets/logoCPT.png"
                    alt="Logo"
                    className="w-[140px] h-10 cursor-pointer"
                  />
                </Link>
              </div>
              <div>
                <Tippy
                  content={
                    <>
                      <div className="sm:w-full sticky z-50">
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
                  offset={[-110, 80]}
                  onShow={() => setMenuToggle(true)}
                  onHide={() => setMenuToggle(false)}
                >
                  <div className="hidden  sm:block">
                    <CollHeader
                      titleArray={["Danh mục"]}
                      icon={faBars}
                      color="#BE1529"
                      sizeIcon={24}
                    />
                  </div>
                </Tippy>
              </div>
            </div>
            {/* Menu Mobile */}
            <div className="block sm:hidden">
              <SheetTrigger>
                <CollHeader
                  titleArray={["Danh mục"]}
                  icon={faBars}
                  color="#BE1529"
                  sizeIcon={24}
                />
              </SheetTrigger>
            </div>

            {/* Bên phải */}
            <div className="flex flex-1 items-center ml-[8px] justify-between">
              <div className="flex-1 flex justify-center">
                <SearchHeader />
              </div>
              <div className="hidden sm:block mr-[10px]">
                <CollHeader
                  titleArray={["Hotline", "0989880"]}
                  icon={faHeadset}
                />
              </div>
              <div className="mr-[10px]">
                <Link to={"/order-history-page"}>
                  <CollHeader
                    titleArray={["Kiểm tra", "đơn hàng"]}
                    icon={faReceipt}
                  />
                </Link>
              </div>
              <Link to={"/cart"}>
                <div className="relative mr-[10px]" ref={cartRef}>
                  <CollHeader
                    titleArray={["Giỏ", "hàng"]}
                    icon={faCartShopping}
                  />
                  {totalQuantity > 0 && (
                    <span className="absolute -top-1 left-4 bg-[#FDD835] text-black text-xs font-bold px-1 py-0.15 rounded-full border-2 border-white">
                      {totalQuantity}
                    </span>
                  )}
                </div>
              </Link>
              <div className="hidden sm:block">
                {userInfo ? (
                  <UserDropdown user={userInfo} />
                ) : (
                  <LoginRegister />
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="hidden sm:flex justify-center bg-[var(--white-color)] border-b border-[#E0E0E0]">
          <ul className="flex flex-wrap gap-4 relative w-full justify-center">
            {dataDichVu.map((item, index, arr) => (
              <li
                key={index}
                className="relative flex items-center whitespace-nowrap hover:text-[var(--primary-color)]"
              >
                <Link
                  to={item.link}
                  className="text-[13px] py-[12px] px-[26px] font-semibold"
                >
                  <FontAwesomeIcon
                    icon={item.icon}
                    className="mr-[7px] text-[19px]"
                  />
                  <span>{item.title}</span>
                </Link>
                {index < arr.length - 1 && (
                  <span className="absolute right-0 top-1/2 -translate-y-1/2 w-px h-[62%] bg-gray-300"></span>
                )}
              </li>
            ))}
          </ul>
        </div>
        <div>{menuToggle && <BlurFull zIndex={40} />}</div>
        <SheetContent side="left" className="w-[88vw]">
          <MenuMobile />
        </SheetContent>
      </Sheet>
    </>
  );
}
