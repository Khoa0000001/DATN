/* eslint-disable @typescript-eslint/no-unsafe-function-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
import Button from "@/components/Button";
import { useAppDispatch } from "@/store/hooks";
import { setValueComponent } from "@/store/slice/buildPcSlice";

export default function ProductBuild({
  data,
  callBack,
}: {
  data: any;
  callBack: Function;
}) {
  const dispatch = useAppDispatch();
  function handleChon(data: any) {
    dispatch(setValueComponent({ id: data.categoryId, newValue: data }));
    callBack();
  }
  return (
    <div className="rounded-[4px] bg-white text-white border border-gray-300 items-center">
      <div className="p-[12px] flex justify-center items-center">
        <a href={`/products/${data.id}`}>
          <img src={data?.productImages[0].imageUrl || ""} alt="" />
        </a>
      </div>
      <div className="px-[12px] pt-[10px] pb-[10px]">
        <h3 className="text-[14px] font-[600] overflow-hidden line-clamp-3 break-words">
          <a href={`/products/${data.id}`} className="text-[#333]">
            {data.nameProduct}
          </a>
        </h3>
        <div className="flex justify-between items-center">
          <div>
            <del className="text-[12px] text-[#999]">
              {data.price.toLocaleString("vi-VN")}đ
            </del>
          </div>
          <div className="items-center">
            <span className="text-[14px] text-[var(--primary-color)]">
              {data.price.toLocaleString("vi-VN")}đ
            </span>
          </div>
        </div>
        <div className="flex justify-between items-center mt-[8px]">
          <a
            href={`/products/${data.id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#0082e7] text-[13px] font-[600] cursor-pointer"
          >
            Xem chi tiết
          </a>
          <Button
            color="#e01a1d"
            className="py-1!"
            onClick={() => handleChon(data)}
          >
            Chọn
          </Button>
        </div>
      </div>
    </div>
  );
}
