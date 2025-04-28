/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
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
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchProducts } from "@/store/slice/productSlice";
import { fetchCategories } from "@/store/slice/categorySlice";

const DatafileLeft03 = [
  {
    id: 1,
    valueSrc:
      "https://file.hstatic.net/200000722513/file/thang_04_layout_web_-01.png",
  },
  {
    id: 2,
    valueSrc:
      "https://file.hstatic.net/200000722513/file/thang_04_layout_web_-02.png",
  },
  {
    id: 3,
    valueSrc:
      "https://file.hstatic.net/200000722513/file/thang_04_layout_web_-03.png",
  },
];

const DatafileBottom02 = [
  {
    id: 5,
    valueSrc:
      "https://file.hstatic.net/200000722513/file/thang_04_layout_web_-05.png",
  },
  {
    id: 4,
    valueSrc:
      "https://file.hstatic.net/200000722513/file/thang_04_layout_web_-04.png",
  },
];
const DatafileBottom04 = [
  {
    id: 999,
    valueSrc:
      "https://file.hstatic.net/200000722513/file/gearvn-festival-sub-banner.jpg",
  },
  {
    id: 8,
    valueSrc:
      "https://file.hstatic.net/200000722513/file/thang_04_layout_web_-08.png",
  },
  {
    id: 7,
    valueSrc:
      "https://file.hstatic.net/200000722513/file/thang_04_layout_web_-07.png",
  },
  {
    id: 6,
    valueSrc:
      "https://file.hstatic.net/200000722513/file/thang_04_layout_web_-06.png",
  },
];

export default function Home() {
  const dispatch = useAppDispatch();
  const [products, setProducts] = useState<any[]>([]);
  const [listPc, setListPc] = useState<any[]>([]);
  const { categories } = useAppSelector((state) => state.categories);

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
    dispatch(fetchCategories({})).unwrap(); // Pass an empty object or the required argument(s)
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
                {DatafileBottom02.map((_, index) => (
                  <div key={index}>
                    <a href="">
                      <picture>
                        <img src={_.valueSrc} alt="" />
                      </picture>
                    </a>
                  </div>
                ))}
              </div>
            </div>
            <div className="hidden sm:block pl-[8px] w-[33.33333%]">
              <div className="flex flex-col lg:gap-4">
                {DatafileLeft03.map((_, index) => (
                  <div key={index}>
                    <a href="">
                      <picture>
                        <img src={_.valueSrc} alt="" />
                      </picture>
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="flex gap-4 overflow-x-auto sm:overflow-hidden">
          {DatafileBottom04.map((_, index) => (
            <div key={index}>
              <a href="">
                <picture>
                  <img src={_.valueSrc} alt="" className="min-w-[290px]" />
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
            src="https://file.hstatic.net/200000722513/file/thang_04_layout_web__1015x325.png"
            alt=""
          />
        </div>
        <div>
          <img
            src="https://file.hstatic.net/200000722513/file/thang_04_layout_web__1015x325_copy.png"
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
              {categories?.map((_: any, index: number) => (
                <div key={index} className="mx-[12px] cursor-pointer">
                  <div className="w-[88px] h-[88px] flex items-center justify-center overflow-hidden  rounded-md">
                    <img
                      className="object-cover w-full h-full p-[10px]"
                      src={_.imageUrl || ""}
                      alt=""
                    />
                  </div>
                  <div className="items-center flex justify-center font-[500] mt-2 text-center">
                    {_.nameCategory}
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
