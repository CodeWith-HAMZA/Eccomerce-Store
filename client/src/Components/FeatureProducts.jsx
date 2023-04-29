import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Autoplay } from "swiper";
import ProductCard from "./ProductCard";

export default function FeatureProducts({ Products }) {
  const [Res, setRes] = useState(3);

  return (
    <div className="relative flex justify-center flex-col items-center p-[4rem] z-[1] ">
      <h2 className="text-4xl font-normal w-[20rem]">Feature Products</h2>
      <Swiper
        onResize={(e) => {
          console.log(e.width < 890 && e.width > 515);
          if (e.width < 1200 && e.width > 990) {
            setRes(() => 4);
          } else if (e.width <= 990 && e.width > 685) {
            setRes(() => 3);
          } else if (e.width <= 685 && e.width > 450) {
            setRes(() => 2);
          } else if (e.width <= 450) {
            setRes(() => 1);
          } else if (e.width > 890) {
            setRes(() => 5);
          }
        }}
        loop
        style={{ height: "38rem", maxWidth: "93rem", zIndex: -1 }}
        slidesPerView={Res}
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        // effect={"fade"}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        modules={[Autoplay]}
        className="mySwiper  p-[1rem]  "
      >
        {Products &&
          Products.map((product, ind) => (
            <SwiperSlide style={{background: "#f7f7f7"}}>
              <ProductCard
                forFeature={true}
                productId={"auuaou"}
                price={"2"}
                category={product.category}
                description=""
                title={product.title}
                image={product.image}
                key={"feature" + ind}
              />
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
}
