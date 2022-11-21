// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

export default function TopSlider() {
  return (
    <>
      <Swiper
        modules={[Autoplay, EffectFade]}
        autoplay={{ delay: 3000 }}
        speed={1500}
        effect={"fade"}
        loop={true}
        className="topSlider"
      >
        <SwiperSlide>
          <div className="topBg1 w-100"></div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="topBg2 w-100"></div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="topBg3 w-100"></div>
        </SwiperSlide>
      </Swiper>
    </>
  );
}
