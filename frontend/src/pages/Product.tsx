/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import SwiperWithImg from "@/components/SwiperWithImg";
import Button from "@/components/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import ProductRow from "@/components/ProducrRow";
import Product from "@/components/Product";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  fetchProductByCategoryId,
  fetchProductDetail,
} from "@/store/slice/productSlice";
import { addItem } from "@/store/slice/cartSlice";
export default function Products() {
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();
  const { product } = useAppSelector((state) => state.products);
  const [showAll, setShowAll] = useState(false);
  const handleAddToCart = () => {
    dispatch(addItem(product));
  };

  const listProducts = useAppSelector(
    (state) => state.products.productByCategoryId
  );

  useEffect(() => {
    if (id) {
      dispatch(fetchProductDetail(id)).unwrap();
    }
  }, [dispatch, id]);
  useEffect(() => {
    if (product.categoryId) {
      dispatch(fetchProductByCategoryId(product.categoryId)).unwrap();
    }
  }, [dispatch, product.categoryId]);
  return (
    <div className="mb-[8x]">
      <div className="max-w-[1220px] mx-[auto]">
        {/* Phần chính của sản phẩmphẩm*/}
        <div className="pt-[18px]">
          <div className="bg-white rounded-[4px]">
            <div className="gap-4 sm:flex">
              {/* hình ảnh chính */}
              <div className="sm:max-w-[35%] flex-[35%]">
                <div className="p-[24px]">
                  <SwiperWithImg data={product?.productImages || []} />
                  <div className="mt-[16px] max-w-full">
                    <a href="">
                      <img
                        src="https://file.hstatic.net/200000722513/file/banner_600x200.jpg"
                        alt=""
                      />
                    </a>
                  </div>
                </div>
              </div>
              {/* title của sản phẩm */}
              <div className="sm:max-w-[65%] flex-[65%] border-l-1 border-gray-300 ">
                <div className="p-[24px] ">
                  <div className="pb-[14px] border-b border-gray-300">
                    <div>
                      <div>
                        <h2 className="text-[24px] font-[600]">
                          {product.nameProduct}
                        </h2>
                      </div>
                      <div className="flex items-center gap-4 my-[10px]">
                        <h3 className="text-3xl text-[var(--primary-color)] font-[600]">
                          {product?.price?.toLocaleString("vi-VN")}₫
                        </h3>
                        <del className="text-[18px] text-gray-400">
                          {(product?.price * 1.2)?.toLocaleString("vi-VN")}₫
                        </del>
                        <div className="rounded-[4px] border-1 border-[var(--primary-color)] text-[var(--primary-color)] px-[6px] py-[4px] text-[12px]">
                          -20%
                        </div>
                      </div>
                    </div>
                    <div className="mt-[28px]">
                      <Button color="#E30019" onClick={handleAddToCart}>
                        <div className="text-white px-[84px]">
                          <div>MUA NGAY</div>
                          <span className="text-[13px]">
                            Giao tận nơi hoặc nhận tại cửa hàng
                          </span>
                        </div>
                      </Button>
                    </div>
                    <div className="mt-[20px]">
                      <ul>
                        <li>
                          <div className="flex gap-2 items-center text-[18px] mt-[12px]">
                            <FontAwesomeIcon icon={faCheck} />
                            <span>Bảo hành chính hãng.</span>
                          </div>
                        </li>
                        <li>
                          <div className="flex gap-2 items-center text-[18px] mt-[12px]">
                            <FontAwesomeIcon icon={faCheck} />
                            <span>Nhiều phần quà hấp dẫn.</span>
                          </div>
                        </li>
                        <li>
                          <div className="flex gap-2 items-center text-[18px] mt-[12px]">
                            <FontAwesomeIcon icon={faCheck} />
                            <span>
                              Chính sách đổi trả 1 1 với sản phẩm lỗi.
                            </span>
                          </div>
                        </li>
                        <li>
                          <div className="flex gap-2 items-center text-[18px] mt-[12px]">
                            <FontAwesomeIcon icon={faCheck} />
                            <span>Hỗ trợ 24/7.</span>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="pb-[14px] border-b border-gray-300">
                    <div className="text-[18px] font-[600] text-[var(--primary-color)] py-[8px] underline">
                      Quà tặng:
                    </div>
                    <div>
                      <span className="text-[18px] font-[700]">
                        🎁 Balo Gigabyte Kit Bag
                      </span>
                    </div>
                  </div>
                  <div>
                    <div className="text-[20px] py-[10px]">
                      ⭐
                      <a href="" className="text-[#428bca]">
                        <strong> Ưu đãi lên đến 54% khi mua kèm Laptop </strong>
                        xem ngay tại đây
                      </a>
                    </div>
                    <div className="text-[20px]">
                      <strong className="text-[var(--primary-color)]">
                        Hỗ trợ trả góp MPOS (Thẻ tín dụng), HDSAISON (
                        <a href="" className="text-[#428bca]">
                          Xem chi tiết
                        </a>
                        ).
                      </strong>
                    </div>
                    <div className="mt-[12px]">
                      <div className="border rounded-[4px] border-[#CFCFCF]">
                        <div className="bg-[#CFCFCF] px-[20px] py-[12px]">
                          <h3 className="text-[18px] font-[600]">Khuyến mãi</h3>
                        </div>
                        <div className="px-[20px] py-[12px]">
                          <ul>
                            <li>
                              <div className="px-[6px]">
                                <FontAwesomeIcon
                                  icon={faCircleCheck}
                                  className="text-green-400 mr-[6px]"
                                />
                                <span className="font-[600]">
                                  Ưu đãi 500.000đ khi mua thêm RAM với Laptop
                                  Gaming.
                                </span>
                                <a
                                  href=""
                                  className="text-[#428bca] hover:underline"
                                >
                                  (Xem thêm)
                                </a>
                              </div>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Phần giữa */}
        <div className="pt-[18px]">
          <div className="flex gap-4 flex-col  sm:flex-row ">
            {/* Thông tin sản phẩm */}
            <div className="basis-3/5">
              <div className="bg-white rounded-[4px]">
                <div className="px-[10px] pb-[12px]">
                  <h1 className="font-[600] text-[22px] px-[24px] py-[12px] ">
                    Thông tin sản phẩm
                  </h1>
                  <div className="px-[24px]">
                    <table className="w-full border-collapse border border-gray-300 overflow-hidden">
                      <tbody>
                        {(showAll
                          ? product?.attributeValues
                          : product?.attributeValues?.slice(0, 6)
                        )?.map((_: any, index: number) => (
                          <tr
                            key={index}
                            className="hover:bg-gray-100 transition"
                          >
                            <td className="border border-gray-300 px-4 py-2 bg-gray-100 font-semibold text-[16px]  w-1/4">
                              {_.nameAttribute}
                            </td>
                            <td className="border border-gray-300 px-4 py-2 text-[17px] w-3/4">
                              {_.attributeValue}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>

                    {/* Nút Xem thêm / Thu gọn */}
                    {product?.attributeValues?.length > 5 && (
                      <div className="text-center mt-4">
                        <button
                          onClick={() => setShowAll(!showAll)}
                          className="text-[16px] text-blue-500 hover:underline"
                        >
                          {showAll ? "Thu gọn" : "Xem thêm"}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            {/* Sản phẩm tương tự */}
            <div className="basis-2/5">
              <div className="bg-white rounded-[4px]">
                <div className="px-[10px] pb-[12px]">
                  <h1 className="font-[600] text-[22px] px-[24px] py-[12px] ">
                    Sản phẩm tương tự
                  </h1>
                  <div className="px-[24px]">
                    <div className="flex flex-col gap-2">
                      {listProducts
                        .slice(0, 3)
                        .map((item: any, index: number) => (
                          <ProductRow key={index} data={item} />
                        ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Sản phẩm đã xem */}
        <div className="pt-[18px]">
          <div className="bg-white rounded-[4px]">
            <div className="px-[10px] pb-[12px]">
              <h1 className="font-[600] text-[22px] px-[24px] py-[12px] ">
                Sản phẩm liên quan
              </h1>
              <div>
                <Carousel
                  opts={{
                    align: "start",
                    slidesToScroll: 2,
                    loop: true,
                  }}
                  className="w-full"
                >
                  <CarouselContent className="-ml-1">
                    {listProducts.map((_: any, index: number) => (
                      <CarouselItem
                        key={index}
                        className="pl-1 basis-1/2 md:basis-1/3 lg:basis-1/5"
                      >
                        <div className="p-1">
                          <Product data={_} />
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious className="ml-[32px]" />
                  <CarouselNext className="mr-[32px]" />
                </Carousel>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
