import { Link } from "react-router-dom";

export default function ItemSearch({
  price,
  title,
  urlImg,
  link,
}: {
  price: number;
  title: string;
  urlImg: string;
  link: string;
}) {
  return (
    <div className="flex justify-between items-center cursor-pointer py-[12px] border-b border-gray-200">
      <div className="w-[calc(100%-40px)] ">
        <Link to={`products/${link}`} className="text-[14px] mb-[6px] block">
          {title}
        </Link>
        <p className="text-[12px] text-[#e30019] font-[500]">
          {price.toLocaleString("vi-VN")}đ
        </p>
      </div>
      <div className="w-[40px] h-[40px]">
        <Link to={`products/${link}`}>
          <img src={urlImg} alt="" />
        </Link>
      </div>
    </div>
  );
}
