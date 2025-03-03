import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTruckMoving } from "@fortawesome/free-solid-svg-icons";

export default function WrapProduct({
  children,
  title,
  condition,
  data,
}: {
  children: React.ReactNode;
  title: string;
  condition: string;
  data: any;
}) {
  return (
    <div className="rounded-[4px] bg-[#fff]">
      <div className="py-[12px] pr-[28px] pl-[24px] flex justify-between items-center">
        <div className="flex justify-center items-center">
          <h2 className="text-[22px] font-[600] mb-[8px] hover:text-[var(--primary-color)]">
            <a href="">{title}</a>
          </h2>
          <div className="hidden ms:flex items-center justify-center">
            <div className="bg-gray-400 h-[20px] w-[1px] mx-[26px]"></div>
            <FontAwesomeIcon
              icon={faTruckMoving}
              className="text-[var(--primary-color)]"
            />
            <h3 className="text-[18px] font-[500] pl-[12px]">{condition}</h3>
          </div>
        </div>
        <div className="flex justify-center items-center">
          <div className="hidden ms:block">
            <ul className="inline-flex gap-4">
              {data.map((_: any, index: number) => (
                <li key={index}>
                  <a
                    href=""
                    className="px-[5px] py-[16px] text-[#333] text-[18px] font-[500] hover:text-[var(--primary-color)] hover:underline"
                  >
                    {_.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="ml-[20px]">
            <a
              href=""
              className="text-[#1982F9] items-center font-[500] text-[18px] hover:text-[var(--primary-color)]"
            >
              Xem tất cả
            </a>
          </div>
        </div>
      </div>
      <div className="px-[20px] pt-[16px] pb-[12px]">{children}</div>
    </div>
  );
}
