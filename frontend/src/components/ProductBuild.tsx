import Button from "@/components/Button";
import { useDispatch } from "react-redux";
import { updateComponentValue } from "@/rudex/DataBuildPCSlice";
import { AppDispatch } from "@/rudex/store";
export default function ProductBuild({
  idDataBuildPC,
  data,
  callBack,
}: {
  idDataBuildPC: number;
  data: any;
  callBack: Function;
}) {
  const dispatch = useDispatch<AppDispatch>();
  function handleChon(data: any) {
    console.log(data, idDataBuildPC);
    dispatch(updateComponentValue({ id: idDataBuildPC, newValue: data }));
    callBack();
  }
  return (
    <div className="rounded-[4px] bg-white text-white border border-gray-300 items-center">
      <div className="p-[12px] flex justify-center items-center">
        <a href="">
          <img src={data.img} alt="" />
        </a>
      </div>
      <div className="px-[12px] pt-[10px] pb-[10px]">
        <h3 className="text-[14px] font-[600]">
          <a href="" className="text-[#333]">
            {data.name}
          </a>
        </h3>
        <div className="flex justify-between items-center">
          <div>
            <del className="text-[12px] text-[#999]">1.299.000đ</del>
          </div>
          <div className="items-center">
            <span className="text-[14px] text-[var(--primary-color)]">
              {data.price.toLocaleString("vi-VN")}đ
            </span>
          </div>
        </div>
        <div className="flex justify-between items-center mt-[8px]">
          <a className="text-[#0082e7] text-[13px] font-[600] cursor-pointer">
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
