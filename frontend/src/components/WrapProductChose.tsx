/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import ProductBuild from "@/components/ProductBuild";
import Button from "@/components/Button";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  fetchProductByCategoryId,
  setValueComponent,
} from "@/store/slice/buildPcSlice";
import Loading from "./Loading";

export default function WrapProductChose({ data }: { data: any }) {
  const dispatch = useAppDispatch();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { dataProductBuildPC, loading } = useAppSelector(
    (state) => state.buildPc
  );
  function handleDong() {
    setIsDialogOpen(false);
  }
  function handleXoaProduct() {
    dispatch(setValueComponent({ id: data.id, newValue: null }));
  }

  return (
    <div>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <div className="flex justify-between items-center p-[10px] bg-[#f2f4f7]">
          {data.value ? (
            <div className="flex justify-between items-center flex-1">
              <div className="flex items-center ">
                <img
                  src={data?.value?.productImages[0].imageUrl || ""}
                  alt=""
                  className="w-[3.5rem]"
                />
                <h1 className="text-[18px] font-[600] ml-[14px]">
                  {data.value.nameProduct}
                </h1>
              </div>
              <div className="flex items-center">
                <div className="flex flex-col gap-1 text-right">
                  <del className="text-[14px] text-[#999]">
                    {data.value.price.toLocaleString("vi-VN")}
                  </del>
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
          ) : (
            <div className="flex items-center">
              <img src={data.image} alt="" className="w-[3.5rem]" />
              <h1
                className="text-[24px] font-[800] ml-[14px]"
                style={{ color: data.color }}
              >
                {data.title}
              </h1>
            </div>
          )}
          <DialogTrigger asChild>
            <div
              onClick={() => {
                dispatch(fetchProductByCategoryId(data.id)).unwrap();
                setIsDialogOpen(true);
              }}
              className="text-white bg-[#e01a1d] rounded-[4px] px-[12px] py-[8px] cursor-pointer text-[16px] font-[600]"
            >
              Chọn
            </div>
          </DialogTrigger>
        </div>

        <DialogContent
          aria-describedby={undefined}
          className="min-w-[1000px] max-w-[90vw] min-h-[680px] max-h-[90vh] p-0 flex flex-col"
        >
          <DialogHeader>
            <h3 className="items-center font-extrabold text-2xl p-4 border-b border-gray-800 bg-gray-200 rounded-t-md">
              {data.title}
            </h3>
          </DialogHeader>
          <DialogTitle></DialogTitle>
          {/* Chỉ phần này có thể cuộn */}
          {loading ? (
            <Loading title="Đang tải sản phẩm ..." />
          ) : dataProductBuildPC.length > 0 ? (
            <div className="p-4 flex-1 overflow-auto">
              <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
                {dataProductBuildPC.map((_: any) => (
                  <ProductBuild key={_.id} data={_} callBack={handleDong} />
                ))}
              </div>
            </div>
          ) : (
            <div className="flex flex-col justify-center items-center h-[400px] w-full col-span-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 text-gray-300 mb-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 17v-2a4 4 0 018 0v2M9 17H7a2 2 0 01-2-2v-5a2 2 0 012-2h10a2 2 0 012 2v5a2 2 0 01-2 2h-2M9 17v2a2 2 0 002 2h2a2 2 0 002-2v-2"
                />
              </svg>
              <p className="text-gray-500 text-lg font-medium">
                Không có sản phẩm nào
              </p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
