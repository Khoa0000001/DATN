/* eslint-disable @typescript-eslint/no-explicit-any */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import GetIconType from "@/unit/GetIconTypeProduct";
export default function Product({ data }: { data: any }) {
  return (
    <div className="rounded-[4px] bg-white text-white border border-gray-300 items-center">
      <div className="p-[12px] flex justify-center items-center">
        <a href="">
          <img src={data.img} alt="" />
        </a>
      </div>
      <div className="px-[12px] pt-[16px] pb-[12px]">
        <h3 className="text-[14px] font-[600] mb-[16px]">
          <a href="" className="text-[#333]">
            {data.name}
          </a>
        </h3>
        {data.components && (
          <div className="text-[#6D6E72] text-[12px] py-[4px] px-[8px] mb-[8px] bg-[#ECECEC]">
            {data.components?.map((_: any, index: number) => (
              <div
                key={index}
                className="inline-flex pr-[5px] items-center pb-[5px]"
              >
                <FontAwesomeIcon
                  icon={GetIconType(_.type)}
                  className="mr-[5px]"
                />
                <span>{_.name}</span>
              </div>
            ))}
          </div>
        )}
        <div>
          <div>
            <del className="text-[14px] text-[#999]">1.299.000đ</del>
          </div>
          <div className="items-center">
            <span className="text-[16px] text-[var(--primary-color)]">
              {data.price.toLocaleString("vi-VN")}đ
            </span>
            <span className="text-[12px] ml-[8px] text-[#ea1c04] rounded-[2px] p-[4px] border-1 border-red-600">
              -20%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
