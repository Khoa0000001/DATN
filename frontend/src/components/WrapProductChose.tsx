/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DataFlashSaleProduct } from "@/data/DataFake";
import ProductBuild from "@/components/ProductBuild";
import Button from "@/components/Button";
import { useDispatch } from "react-redux";
import { updateComponentValue } from "@/rudex/DataBuildPCSlice";
import { AppDispatch } from "@/rudex/store";

export default function wrapProductChose({ data }: { data: any }) {
  const dispatch = useDispatch<AppDispatch>();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  function handleDong() {
    setIsDialogOpen(false);
  }
  function handleXoaProduct() {
    dispatch(updateComponentValue({ id: data.id, newValue: null }));
  }
  return (
    <div>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <div className="flex justify-between items-center p-[10px] bg-[#f2f4f7]">
          <div className="flex items-center">
            <img src={data.image} alt="" className="w-[3.5rem]" />
            <h1
              className="text-[24px] font-[800] ml-[14px]"
              style={{ color: data.color }}
            >
              {data.title}
            </h1>
          </div>
          <DialogTrigger asChild>
            <div
              onClick={() => setIsDialogOpen(true)}
              className="text-white bg-[#e01a1d] rounded-[4px] px-[12px] py-[8px] cursor-pointer text-[16px] font-[600]"
            >
              Chọn
            </div>
          </DialogTrigger>
        </div>
        {data.value && (
          <div className="flex justify-between items-center mx-[16px] py-[12px] bg-[#e5e6e9] rounded-b-lg">
            <div className="flex items-center">
              <img src={data.value?.img} alt="" className="w-[3.5rem]" />
              <h1 className="text-[18px] font-[600] ml-[14px]">
                {data.value.name}
              </h1>
            </div>
            <div className="flex items-center">
              <div className="flex flex-col gap-1 text-right">
                <del className="text-[14px] text-[#999]">1.299.000đ</del>
                <span className="text-[16px] font-[600] text-[var(--primary-color)]">
                  {data.value.price.toLocaleString("vi-VN")}đ
                </span>
              </div>
              <Button
                color="#3b82f680"
                className="mx-[12px] text-[#fff]"
                onClick={handleXoaProduct}
              >
                Xóa
              </Button>
            </div>
          </div>
        )}

        <DialogContent
          aria-describedby={undefined}
          className="min-w-[1000px] max-w-[90vw] min-h-[680px] max-h-[90vh] p-0 flex flex-col"
        >
          <DialogHeader>
            <h3 className="items-center font-extrabold text-2xl p-4 border-b border-gray-800 bg-gray-200 rounded-t-md">
              CPU
            </h3>
          </DialogHeader>
          <DialogTitle></DialogTitle>
          {/* Chỉ phần này có thể cuộn */}
          <div className="p-4 flex-1 overflow-auto">
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
              {DataFlashSaleProduct.listProdeuct.map((_, index) => (
                <ProductBuild
                  key={index}
                  idDataBuildPC={data.id}
                  data={_}
                  callBack={handleDong}
                />
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
