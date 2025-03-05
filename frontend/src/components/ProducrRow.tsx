export default function ProductRow() {
  return (
    <div className="mb-[8px]">
      <div className="flex justify-between gap-4">
        <div className="basis-1/4">
          <a href="">
            <img src="src/assets/image/yaoyao.jpg" alt="" />
          </a>
        </div>
        <div className="basis-3/4">
          <a href="" className="font-[600] mb-[12px]">
            <h2>Laptop gaming Acer Predator Helios Neo 16S PHN16S 71 94T0</h2>
          </a>
          <div className="flex gap-2">
            <del>1.999.000 đ</del>
            <p className="text-[var(--primary-color)] font-[600]">
              1.999.000 đ
            </p>
            <div className="rounded-[4px] border-1 border-[var(--primary-color)] text-[var(--primary-color)] px-[6px] py-[4px] text-[12px]">
              -1%
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
