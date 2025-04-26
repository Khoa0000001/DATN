/* eslint-disable @typescript-eslint/no-explicit-any */
import MenuToggle from "@/components/MenuToggle";
import SwiperComponent from "@/components/SwiperComponent";
import WrapProduct from "@/components/WrapProduct";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Product from "@/components/Product";
import WrapFlashSale from "@/components/WrapFlashSale";
import { DataPCProduct } from "@/data/DataFake";
import { useAppDispatch } from "@/store/hooks";
import { fetchProducts } from "@/store/slice/productSlice";
import { useEffect, useState } from "react";

export default function Home() {
  const dispatch = useAppDispatch();
  const [products, setProducts] = useState<any[]>([]);
  const [listPc, setListPc] = useState<any[]>([]);

  const handleFetchProducts = async () => {
    const res = await dispatch(fetchProducts({}));
    if (fetchProducts.fulfilled.match(res)) {
      setProducts(res.payload.data);
      setListPc(res.payload.data); // hoặc res.payload nếu bạn xử lý lại từ slice
    } else {
      console.error("Lỗi:", res.payload);
    }
  };

  useEffect(() => {
    handleFetchProducts();
  }, [dispatch]);
  return (
    <div className="max-w-[1220px] mx-[auto]">
      {/* Header Home */}
      <div className="pt-[18px]">
        <div className="flex justify-center">
          <div className="px-[10px] hidden sm:block">
            <MenuToggle />
          </div>
          <div className="flex">
            <div className="w-[95vw] sm:w-[calc(100%/3*2)]">
              <div className="w-full max-w-[41rem]">
                <SwiperComponent />
              </div>
              <div className="hidden  gap-2 pt-[8px] lg:flex">
                {Array.from({ length: 2 }).map((_, index) => (
                  <div key={index}>
                    <a href="">
                      <picture>
                        <img
                          src="https://file.hstatic.net/200000722513/file/thang_02_layout_web_-01.png"
                          alt=""
                        />
                      </picture>
                    </a>
                  </div>
                ))}
              </div>
            </div>
            <div className="hidden sm:block pl-[8px] w-[33.33333%]">
              <div className="flex flex-col lg:gap-4">
                {Array.from({ length: 3 }).map((_, index) => (
                  <div key={index}>
                    <a href="">
                      <picture>
                        <img
                          src="https://file.hstatic.net/200000722513/file/thang_02_layout_web_-01.png"
                          alt=""
                        />
                      </picture>
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="flex gap-4 overflow-x-auto sm:overflow-hidden">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index}>
              <a href="">
                <picture>
                  <img
                    src="https://file.hstatic.net/200000722513/file/thang_02_layout_web_-01.png"
                    alt=""
                    className="min-w-[290px]"
                  />
                </picture>
              </a>
            </div>
          ))}
        </div>
      </div>
      {/* Flash Sale */}
      <div className="pt-[18px]">
        <WrapFlashSale>
          <Carousel
            opts={{
              align: "start",
              slidesToScroll: 2,
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-1">
              {products.map((_: any, index: number) => (
                <CarouselItem
                  key={index}
                  className="pl-1 basis-1/2 md:basis-1/3 lg:basis-1/6"
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
        </WrapFlashSale>
      </div>
      {/* QQ */}
      <div className="block sm:flex gap-2 mt-[18px] px-[8px]">
        <div>
          <img
            src="https://file.hstatic.net/200000722513/file/thang_02_build_pc_1015x325.png"
            alt=""
          />
        </div>
        <div>
          <img
            src="https://file.hstatic.net/200000722513/file/thang_02_build_pc_1015x325.png"
            alt=""
          />
        </div>
      </div>
      {/* PC bán chạy */}
      <div className="pt-[18px]">
        <WrapProduct
          title={DataPCProduct.title}
          condition={DataPCProduct.condition}
          data={DataPCProduct.listType}
        >
          <Carousel
            opts={{
              align: "start",
              slidesToScroll: 2,
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-1">
              {listPc.map((_, index) => (
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
        </WrapProduct>
      </div>
      {/* Danh mục sản phẩm */}
      <div className="pt-[18px]">
        <div className="bg-white rounded-[4px]">
          <div className="border-b-1 border-gray-300 px-[16px] pt-[18px] pb-[14px]">
            <h1 className="text-[26px] font-[600]">Danh mục sản phẩm</h1>
          </div>
          <div className="p-[16px]">
            <div className="gap-4 flex flex-wrap">
              {Array.from({ length: 18 }).map((_, index) => (
                <div key={index} className="mx-[12px] cursor-pointer">
                  <div className="w-22">
                    <img
                      className="p-[10px]"
                      src="src/assets/image/typeLaptop.webp"
                      alt=""
                    />
                  </div>
                  <div className="items-center flex justify-center font-[500]">
                    Laptop
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
