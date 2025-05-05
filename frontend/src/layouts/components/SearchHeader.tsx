/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import Tippy from "@tippyjs/react";
import ItemSearch from "../../components/ItemSearch";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchProducts } from "@/store/slice/productSlice";

export default function SearchHeader() {
  const dispatch = useAppDispatch();
  const listProducts = useAppSelector((state) => state.products.products);
  const [search, setSearch] = useState("");
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (search.trim() !== "") {
        dispatch(fetchProducts({ page: 1, limit: 10, search }));
        setShowResults(true);
      } else {
        setShowResults(false);
      }
    }, 500); // 500ms debounce

    return () => clearTimeout(delayDebounce);
  }, [dispatch, search]);

  return (
    <div>
      <Tippy
        content={
          <div className="max-h-[400px] sm:w-[400px]">
            <div className="max-h-[360px] overflow-y-auto custom-scrollbar px-[10px]">
              {listProducts.length > 0 ? (
                listProducts.map((product: any) => (
                  <ItemSearch
                    key={product.id}
                    title={product.nameProduct}
                    price={product.price}
                    urlImg={product.productImages?.[0]?.imageUrl || ""}
                    link={product.id}
                  />
                ))
              ) : (
                <div className="text-center text-gray-500 py-4">
                  Không có sản phẩm phù hợp.
                </div>
              )}
            </div>
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
        visible={showResults && search.trim() !== ""}
        onClickOutside={() => setShowResults(false)}
      >
        <div>
          <div className="container mx-auto flex justify-between items-center">
            <div className="relative">
              <input
                type="text"
                className="bg-[#fff] text-black pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 sm:w-[400px]"
                placeholder="Bạn cần tìm gì?"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
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
