export default function ItemSearch({
  price,
  title,
  urlImg,
}: {
  price: number;
  title: string;
  urlImg: string;
}) {
  return (
    <div className="flex justify-between items-center cursor-pointer py-[12px] border-b border-gray-200">
      <div className="w-[calc(100%-40px)] ">
        <a href="" className="text-[14px] mb-[6px] block">
          {title}
        </a>
        <p className="text-[12px] text-[#e30019] font-[500]">{price}đ</p>
      </div>
      <div className="w-[40px] h-[40px]">
        <a href="">
          <img src={urlImg} alt="" />
        </a>
      </div>
    </div>
  );
}
