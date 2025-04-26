import { useState } from "react";
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
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import { resetComponent } from "@/store/DataBuildPCSlice";
import Counsel from "@/components/Counsel";
export default function BuildPC() {
  const dispatch = useDispatch<AppDispatch>();
  const dataBuildPC = useSelector(
    (state: RootState) => state.DataBuildPC.components
  );
  const handleReset = () => {
    dispatch(resetComponent());
  };
  const [isDialogOpen, setIsDialogOpen] = useState(false);
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
                    {dataBuildPC.map((_) => (
                      <WrapProductChose
                        key={_.id}
                        data={{
                          id: _.id,
                          title: _.title,
                          image: _.image,
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
                        {dataBuildPC.map((component) => (
                          <div
                            key={component.id}
                            className="flex justify-between"
                          >
                            <span className="font-[600] min-w-[125px]">
                              {component.title}:
                            </span>
                            <span>{component.value?.name}</span>
                            <span className="text-[#ea1c04] font-[600]">
                              {component.value?.price.toLocaleString("vi-VN")}
                            </span>
                          </div>
                        ))}
                      </div>
                      <div className="flex justify-between items-center mt-[16px]">
                        <div className="text-[24px] font-[600]">Tổng tiền:</div>
                        <div className="text-[24px] font-[800] text-[var(--primary-color)]">
                          {dataBuildPC
                            .reduce(
                              (total, component) =>
                                total + (component.value?.price || 0),
                              0
                            )
                            .toLocaleString("vi-VN")}
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
