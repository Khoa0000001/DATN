/* eslint-disable @typescript-eslint/no-explicit-any */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

export default function ItemMenuToggle({
  title,
  icon,
  data,
  idCategory,
}: {
  title: string;
  icon: any;
  data: any[];
  idCategory: string;
}) {
  return (
    <div className="group">
      <div className="relative">
        <Link
          to={`/list-products/${idCategory}`}
          className=" cursor-pointer flex items-center py-[2px] px-[16px]  h-[32px] relative hover:bg-[#ea1c04] hover:text-whit transition group-hover:bg-[#ea1c04]"
        >
          <FontAwesomeIcon
            icon={icon}
            className="text-[16px] text-[#333] mr-[10px] group-hover:text-white"
          />

          <span className="text-[13px] font-[600] text-[#333] group-hover:text-white">
            {title}
          </span>

          <FontAwesomeIcon
            icon={faAngleRight}
            className="text-[16px] text-[#333] ml-auto group-hover:text-white"
          />
        </Link>
        {/* Pseudo Element ::before */}
        <div className="absolute z-20 top-0 right-[-32px] hidden group-hover:block">
          <div className="w-0 h-0 border-t-[16px] border-t-transparent border-l-[16px] border-l-[#ea1c04] border-b-[15px] border-b-transparent border-r-[16px] border-r-transparent z-10 "></div>
        </div>
      </div>
      <div className="overflow-y-auto custom-scrollbar ml-[10px] absolute z-10 top-0 left-[100%] border-l-[8px] border-[#fff] min-h-[100%] w-[calc(65vw)] bg-[#fff] hidden group-hover:block">
        <div className="grid grid-cols-2 lg:grid-cols-5  gap-4">
          {data.map((item, index) => (
            <div key={index} className=" text-black p-4">
              <span className="text-[15px] font-[600] text-[#BE1529] block mb-[6px]">
                {item.title}
              </span>
              <ul className="text-[13px] font-[600]">
                {item.data.map((subItem: { title: string }, index: number) => (
                  <li
                    key={index}
                    className="p-[6px] cursor-pointer hover:text-[var(--primary-color)]"
                  >
                    <Link to={`/list-products/${idCategory}`}>
                      {subItem.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
