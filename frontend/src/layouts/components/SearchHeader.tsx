import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import Tippy from "@tippyjs/react";
import ItemSearch from "../../components/ItemSearch";

export default function SearchHeader() {
  return (
    <div>
      <Tippy
        content={
          <div className="w-[400px]  max-h-[400px]">
            {/* Container cuộn với thanh cuộn nhỏ */}
            <div className="max-h-[360px]  px-[10px] overflow-y-auto custom-scrollbar">
              <ItemSearch
                title="Tai nghe Logitech G333 Black"
                price={1999}
                urlImg="https://product.hstatic.net/200000722513/product/thumbtainghe_12333999e59540d9b7f5069e9a3cf403_6a5c40636b074b5ba12f43d9c1dda62c.gif"
              />
            </div>

            {/* Nút xem thêm */}
            <div className="flex justify-center items-center py-[10px] cursor-pointer hover:text-[var(--primary-color)]">
              <span>Xem thêm sản phẩm</span>
            </div>
          </div>
        }
        placement="bottom"
        arrow={false}
        theme="light"
        offset={[0, 4]}
        interactive={true}
        trigger="click"
        maxWidth="none"
      >
        <div>
          <div className="container mx-auto flex justify-between items-center">
            <div className="relative ">
              <input
                type="text"
                className="bg-[#fff] text-black pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 min-w-[350px] w-[400px]"
                placeholder="Bạn cần tìm gì?"
              />
              <FontAwesomeIcon
                icon={faSearch}
                className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              />
            </div>
          </div>
        </div>
      </Tippy>
    </div>
  );
}
