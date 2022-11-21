// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Autoplay,
  Pagination,
  Navigation,
  EffectCards,
  EffectCube,
  EffectCoverflow,
  EffectCreative,
  EffectFlip,
} from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-cube";
import "swiper/css/effect-flip";

export default function HomeCarousel() {
  return (
    <>
      <Swiper
        modules={[Autoplay, EffectFlip]}
        autoplay={{ delay: 3000 }}
        speed={1500}
        effect={"flip"}
        loop={true}
        className="mySwiper d-md-none"
      >
        <SwiperSlide>
          <div className="image text-center p-2 w-100">
            <img
              style={{ width: "auto", height: "400px", borderRadius: "10px" }}
              src={require("../images/img1.jpg")}
            />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="image text-center p-2 w-100">
            <img
              style={{ width: "auto", height: "400px", borderRadius: "10px" }}
              src={require("../images/img2.jpg")}
            />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="image text-center p-2 w-100">
            <img
              style={{ width: "auto", height: "400px", borderRadius: "10px" }}
              src={require("../images/img3.jpg")}
            />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="image text-center p-2 w-100">
            <img
              style={{ width: "auto", height: "400px", borderRadius: "10px" }}
              src={require("../images/img8.jpg")}
            />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="image text-center p-2 w-100">
            <img
              style={{ width: "auto", height: "400px", borderRadius: "10px" }}
              src={require("../images/img5.jpg")}
            />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="image text-center p-2 w-100">
            <img
              style={{ width: "auto", height: "400px", borderRadius: "10px" }}
              src={require("../images/img6.jpg")}
            />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="image text-center p-2 w-100">
            <img
              style={{ width: "auto", height: "400px", borderRadius: "10px" }}
              src={require("../images/img9.jpg")}
            />
          </div>
        </SwiperSlide>
      </Swiper>
    </>
  );
}
