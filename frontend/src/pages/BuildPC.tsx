/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCommentNodes,
  faRotateLeft,
} from "@fortawesome/free-solid-svg-icons";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogHeader,
} from "@/components/ui/dialog";
import Button from "@/components/Button";
import WrapProductChose from "@/components/WrapProductChose";
import Counsel from "@/components/Counsel";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { fetchCategories, resetAllComponent } from "@/store/slice/buildPcSlice";

export default function BuildPC() {
  const dispatch = useAppDispatch();
  const handleReset = () => {
    dispatch(resetAllComponent());
  };
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { computer_components } = useAppSelector((state) => state.buildPc);
  useEffect(() => {
    dispatch(fetchCategories({})).unwrap();
  }, []);
  return (
    <div>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <div className="max-w-[1220px] mx-[auto]">
          <div className="pt-[18px]">
            <div className="bg-white rounded-[4px]">
              <div className="p-[12px]">
                <div className="px-[14px] flex gap-4">
                  <Button
                    color="#fff"
                    className="text-[#0082e7] text-[14px] border border-[#0082e7]"
                    onClick={handleReset}
                  >
                    <FontAwesomeIcon icon={faRotateLeft} />
                    Chọn lại từ đầu
                  </Button>
                  <Button
                    color="#fff"
                    className="text-[#0082e7] text-[14px] border border-[#0082e7]"
                    onClick={() => setIsDialogOpen(true)}
                  >
                    <FontAwesomeIcon icon={faCommentNodes} />
                    Tư vấn bằng ai
                  </Button>
                </div>
                <div className="p-[6px] rounded-lg flex gap-4">
                  {/* Chọn linh kiện */}
                  <div className="flex flex-col flex-3/5 gap-4">
                    {computer_components.map((_: any) => (
                      <WrapProductChose
                        key={_.id}
                        data={{
                          id: _.id,
                          title: _.nameCategory,
                          image: _.imageUrl,
                          color: _.color,
                          value: _.value,
                        }}
                      />
                    ))}
                  </div>
                  {/* Hóa đơn */}
                  <div className="flex-2/5">
                    <div className="bg-[#ECECEC] p-[14px] rounded-2xl">
                      <h1 className="text-[24px] font-[800] flex justify-center">
                        Hóa đơn
                      </h1>
                      <div className="flex flex-col gap-1">
                        {computer_components.map((component: any) => (
                          <div
                            key={component.id}
                            className="flex justify-between"
                          >
                            <span className="font-[600] min-w-[125px]">
                              {component.nameCategory}:
                            </span>
                            <span>{component.value?.nameProduct}</span>
                            <span className="text-[#ea1c04] font-[600]">
                              {component.value?.price.toLocaleString("vi-VN")}
                            </span>
                          </div>
                        ))}
                      </div>
                      <div className="flex justify-between items-center mt-[16px]">
                        <div className="text-[24px] font-[600]">Tổng tiền:</div>
                        <div className="text-[24px] font-[800] text-[var(--primary-color)]">
                          {computer_components
                            .reduce(
                              (total: number, component: any) =>
                                total + (component.value?.price || 0),
                              0
                            )
                            .toLocaleString("vi-VN")}
                          đ
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <DialogContent
          aria-describedby={undefined}
          className="min-w-[1200px] max-w-[90vw] min-h-[680px] max-h-[90vh] p-0 flex flex-col gap-0"
        >
          <DialogHeader>
            <h3 className="items-center font-extrabold text-2xl p-4 border-b border-gray-800 bg-gray-200 rounded-t-md">
              Tư vấn bằng ai
            </h3>
          </DialogHeader>
          <DialogTitle></DialogTitle>
          <Counsel />
        </DialogContent>
      </Dialog>
    </div>
  );
}
