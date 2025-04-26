/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs } from "swiper/modules";
import { Swiper as SwiperInstance } from "swiper";

export default function SwiperWithImg(data: any) {
  console.log("data", data);
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperInstance | null>(null);
  return (
    <div className="w-full max-w-3xl mx-auto">
      {/* Swiper chính */}
      <Swiper
        modules={[Navigation, Thumbs]}
        navigation
        thumbs={{ swiper: thumbsSwiper }}
        spaceBetween={20}
        slidesPerView={1}
      >
        {data?.data?.map((checkpoint: any) => (
          <SwiperSlide key={checkpoint.id}>
            <div className="relative">
              <img src={checkpoint.imageUrl} className="w-full object-cover" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Swiper thumbnails (hình ảnh nhỏ) */}
      <Swiper
        modules={[Thumbs]}
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={4}
        watchSlidesProgress
        className="mt-4"
      >
        {data?.data?.map((checkpoint: any) => (
          <SwiperSlide key={checkpoint.id} className="cursor-pointer">
            <img
              src={checkpoint.imageUrl}
              className="w-20 h-14 object-cover rounded-lg border-2 border-transparent hover:border-blue-500"
            />
          </SwiperSlide>
        ))}
      </Swiper>
      {/* Ghi đè màu của nút điều hướng */}
      <style>
        {`
          .swiper-button-next, .swiper-button-prev {
            color: white !important;
            font-weight: bold;
          }
          .swiper-pagination-bullet {
            background-color: white !important;
            opacity: 0.7;
          }
          .swiper-pagination-bullet-active {
            background-color: white !important;
            opacity: 1;
          }
        `}
      </style>
    </div>
  );
}
