/* eslint-disable @typescript-eslint/no-explicit-any */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import GetIconType from "@/utils/GetIconTypeProduct";
import isExitAttrubuteShow from "@/utils/isExitAttrubuteShow";
import { Link } from "react-router-dom";
export default function Product({ data }: { data: any }) {
  return (
    <div className="rounded-[4px] bg-white text-white border border-gray-300 items-center min-h-[400px]  max-w-[220px]">
      <div className="p-[12px] flex justify-center items-center min-h-[180px] ">
        <Link to={`/products/${data.id}`}>
          <img
            src={data.productImages && data?.productImages[0]?.imageUrl}
            alt=""
            className="max-h-[160px] object-contain"
          />
        </Link>
      </div>
      <div className="px-[12px] pt-[16px] pb-[12px]">
        <h3 className="text-[14px] font-[600] mb-[16px] line-clamp-2">
          <Link to={`/products/${data.id}`} className="text-[#333]">
            {data.nameProduct}
          </Link>
        </h3>

        {data?.attributeValues?.filter((_: any) =>
          isExitAttrubuteShow(data.category.nameCategory, _.nameAttribute)
        ).length > 0 && (
          <div className="text-[#6D6E72] text-[12px] py-[4px] px-[8px] mb-[8px] bg-[#ECECEC]">
            {data.attributeValues
              ?.filter((_: any) =>
                isExitAttrubuteShow(data.category.nameCategory, _.nameAttribute)
              )
              .map((_: any, index: number) => (
                <div
                  key={index}
                  className="inline-flex pr-[5px] items-center pb-[5px]"
                >
                  <FontAwesomeIcon
                    icon={GetIconType(_.nameAttribute)}
                    className="mr-[5px]"
                  />
                  <span>{_.tagValue}</span>
                </div>
              ))}
          </div>
        )}
        <div>
          <div>
            <del className="text-[14px] text-[#999]">
              {(data.price * 1.2).toLocaleString("vi-VN")}đ
            </del>
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
