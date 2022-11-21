// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

export default function TopImageSlider() {
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
          <img
            style={{ width: "100%", height: "auto" }}
            src={require("../images/trans1.png")}
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            style={{ width: "100%", height: "auto" }}
            src={require("../images/trans2.png")}
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            style={{ width: "100%", height: "auto" }}
            src={require("../images/trans6.png")}
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            style={{ width: "100%", height: "auto" }}
            src={require("../images/trans8.png")}
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            style={{ width: "100%", height: "auto" }}
            src={require("../images/trans9.png")}
          />
        </SwiperSlide>
      </Swiper>
    </>
  );
}
