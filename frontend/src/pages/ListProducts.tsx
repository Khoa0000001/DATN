/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";

import Product from "@/components/Product";
import Dropdown from "@/components/Dropdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCaretDown,
  faBarsStaggered,
} from "@fortawesome/free-solid-svg-icons";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchProductByCategoryId } from "@/store/slice/productSlice";
import { useParams } from "react-router-dom";
export default function ListProdeucts() {
  const dispath = useAppDispatch();
  const { id } = useParams<{ id: string }>();
  const sortOptions = [
    "Nổi bật",
    "Tên từ A-Z",
    "Tên từ Z-A",
    "Giá tăng dần",
    "Giá giảm dần",
  ];
  const [selectedSort, setSelectedSort] = useState<string>("Nổi bật");
  const listProducts = useAppSelector(
    (state) => state.products.productByCategoryId
  );
  useEffect(() => {
    if (id) {
      dispath(fetchProductByCategoryId(id)).unwrap();
    }
  }, [dispath, id]);
  return (
    <div className="max-w-[1220px] mx-[auto]">
      <div className="pt-[18px]">
        <div className="bg-white rounded-[4px]">
          <div className="p-[14px]">
            <div className="py-[16px]">
              <div className="px-[4px] flex justify-end gap-4 items-center sm:px-[50px]">
                <Dropdown
                  trigger={
                    <div className="p-[4px] px-[8px] rounded-[4px] border border-gray-300 cursor-pointer">
                      Giá
                      <FontAwesomeIcon
                        icon={faCaretDown}
                        className="ml-[8px]"
                      />
                    </div>
                  }
                  content={
                    <div className="p-[10px] rounded-[4px] border border-gray-300">
                      <div className="min-w-[120px]">
                        <div className="flex justify-between">
                          <div className="py-[8px] px-[12px]">
                            <input
                              type="number"
                              placeholder="Giá min"
                              className="border border-gray-300 rounded-[4px] p-[8px] w-full"
                              min="0"
                              id="minPrice"
                            />
                          </div>
                          <div className="py-[8px] px-[12px]">
                            <input
                              type="number"
                              placeholder="Giá max"
                              className="border border-gray-300 rounded-[4px] p-[8px] w-full"
                              min="0"
                              id="maxPrice"
                            />
                          </div>
                        </div>
                        <div className="py-[8px] px-[12px]">
                          <button className="bg-blue-500 text-white rounded-[4px] p-[8px] w-full">
                            Áp dụng
                          </button>
                        </div>
                      </div>
                    </div>
                  }
                />
                <Dropdown
                  trigger={
                    <div className="p-[4px] min-w-[240px] rounded-[4px] border border-gray-300 cursor-pointer">
                      <FontAwesomeIcon
                        icon={faBarsStaggered}
                        className="mr-[8px]"
                      />
                      <span>Xếp theo:</span>
                      <strong>{selectedSort}</strong>
                      <FontAwesomeIcon
                        icon={faCaretDown}
                        className="ml-[8px]"
                      />
                    </div>
                  }
                  content={
                    <div className="p-[10px] rounded-[4px] border border-gray-300">
                      <div className="min-w-[120px]">
                        <div className="bg-white w-48 py-2">
                          {sortOptions.map((option, index) => (
                            <button
                              key={index}
                              onClick={() => setSelectedSort(option)}
                              className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                            >
                              {option}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  }
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
              {listProducts.map((_: any, index: number) => (
                <Product key={index} data={_} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
