import Button from "./Button";
export default function WrapFlashSale({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-[#47b7fc] rounded-[4px] overflow-hidden">
      <div className="px-[16px] pt-[20px] pb-[12px] flex">
        <div className="text-[#000] font-[700] flex justify-between items-center">
          <div className="bg-white rounded-[4px] p-[6px] tracking-[2px]">
            00
          </div>
          <span className="text-white mx-[6px] text-[20px]">:</span>
          <div className="bg-white rounded-[4px] p-[6px] tracking-[2px]">
            00
          </div>
          <span className="text-white mx-[6px] text-[20px]">:</span>
          <div className="bg-white rounded-[4px] p-[6px] tracking-[2px]">
            00
          </div>
          <span className="text-white mx-[6px] text-[20px]">:</span>
          <div className="bg-white rounded-[4px] p-[6px] tracking-[2px]">
            00
          </div>
        </div>
        <div>
          <h2 className="text-auto ms:text-[26px] font-[900] flex italic">
            <img
              className="w-[48px] h-[36px] block"
              src="https://static.vecteezy.com/system/resources/previews/009/663/150/original/thunder-icon-transparent-free-png.png"
              alt=""
            />
            <a href="#" className="text-[#FFEE12]">
              Flash sale 10H mỗi ngày
            </a>
          </h2>
        </div>
      </div>
      <div
        style={{ background: 'url("src/assets/image/artboard.webp")' }}
        className="bg-cover bg-center p-[16px]"
      >
        <Button color="#fff" className="text-[#000] font-[600]">
          Flash Sale
        </Button>
        <div className="pt-[14px]">{children}</div>
        <div className="flex justify-center items-center my-[20px]">
          <Button color="#1AA6F7" className="text-white px-[40px]">
            Xem thêm khuyến mãi
          </Button>
        </div>
      </div>
    </div>
  );
}
