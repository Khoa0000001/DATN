import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  Autoplay,
  EffectCoverflow,
} from "swiper/modules";

const images = [
  "https://file.hstatic.net/200000722513/file/gearvn-festival-505-slider.jpg",
  "https://file.hstatic.net/200000722513/file/thang_03_thu_cu_doi_moi_banner_web_slider_800x400.jpg",
  "https://file.hstatic.net/200000722513/file/thang_04_pc_tang_man_banner_web_slider_800x400.jpg",
  "https://file.hstatic.net/200000722513/file/thang_04_laptop_gaming_banner_web_slider_800x400.jpg",
  "https://file.hstatic.net/200000722513/file/thang_03_laptop_rtx_5090_800x400.jpg",
  "https://file.hstatic.net/200000722513/file/banner_web_slider_800x400_1199a3adfc23489798d4163a97f3bc62.jpg",
  "https://file.hstatic.net/200000722513/file/thang_04_laptop_acer.png",
  "https://file.hstatic.net/200000722513/file/thang_04_laptop_rtx_50series_800x400.jpg",
];

const SwiperComponent = () => {
  return (
    <div className="w-full max-w-3xl mx-auto relative h-max-full">
      <Swiper
        modules={[Navigation, Pagination, Autoplay, EffectCoverflow]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        effect="coverflow"
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={1}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        className="rounded-xl shadow-lg"
      >
        {images.map((src, index) => (
          <SwiperSlide key={index}>
            <img
              src={src}
              alt={`Slide ${index}`}
              className="w-full h-[60%] object-cover rounded-xl"
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
};

export default SwiperComponent;
