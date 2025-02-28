import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPager, faXmark } from "@fortawesome/free-solid-svg-icons";
import {
  faTag,
  faWrench,
  faShieldHeart,
  faNewspaper,
  faHouseUser,
  faMoneyBillTransfer,
  faHeadset,
} from "@fortawesome/free-solid-svg-icons";

export default function MenuMobile({ callBack }: { callBack?: Function }) {
  const dataDichVu = [
    {
      title: "1900.5301",
      link: "",
      icon: faHeadset,
    },
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
  return (
    <div>
      <div className="flex items-center justify-between p-4 text-white bg-[var(--primary-color)] top-[0] sticky z-50">
        <div className="font-[600] text-[17px]">Danh mục sản phẩm</div>
        <div>
          <FontAwesomeIcon icon={faXmark} size="2x" />
        </div>
      </div>
      <div></div>
      <div>
        <div className="font-[600] text-[16px] py-[12px] pr-[36px] pl-[20px]">
          Thông tin
        </div>
        {dataDichVu.map((item, index) => (
          <div key={index}>
            <a
              href={item.link}
              className="flex items-center font-[600] text-[13px] py-[12px] pr-[36px] pl-[20px] hover:text-[#ea1c04]"
            >
              <FontAwesomeIcon icon={item.icon} size="2x" />
              <span className="ml-[16px]">{item.title}</span>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
