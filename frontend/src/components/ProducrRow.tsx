import { Link } from "react-router-dom";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function ProductRow({ data }: { data: any }) {
  return (
    <div className="mb-[8px]">
      <div className="flex justify-between gap-4">
        <div className="basis-1/4">
          <a href="">
            <img
              src={data.productImages && data?.productImages[0]?.imageUrl}
              alt=""
            />
          </a>
        </div>
        <div className="basis-3/4">
          <Link to={`/products/${data.id}`} className="font-[600] mb-[12px]">
            <h2>{data.nameProduct}</h2>
          </Link>
          <div className="flex gap-2">
            <del>{(data.price * 1.2).toLocaleString("vi-VN")}đ</del>
            <p className="text-[var(--primary-color)] font-[600]">
              {data.price.toLocaleString("vi-VN")}đ
            </p>
            <div className="rounded-[4px] border-1 border-[var(--primary-color)] text-[var(--primary-color)] px-[6px] py-[4px] text-[12px]">
              -20%
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
