import MenuToggle from "@/components/MenuToggle";
import SwiperComponent from "@/components/SwiperComponent";

export default function Home() {
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
        <div className="flex gap-4">
          {Array.from({ length: 4 }).map((_, index) => (
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
      <div className="pt-[18px]">123</div>
    </div>
  );
}
