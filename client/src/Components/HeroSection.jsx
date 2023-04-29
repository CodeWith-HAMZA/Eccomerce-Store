import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Autoplay, Navigation, EffectFade } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination"; 
const HeroSection = () => {
  const images = [
    "https://www.netsolutions.com/insights/wp-content/uploads/2021/01/Types-of-eCommerce-Business-Models.jpg",
    "https://media.istockphoto.com/id/1340117122/photo/cube-with-shopping-trolley-symbol-on-the-laptop-keyboard.jpg?b=1&s=170667a&w=0&k=20&c=PU8iTTvTj6TV6_Quy9Z7KQJoOgY-rp_rqI9FbFNFYEw=",
  ];
  const [Images, setImages] = useState(images);
  return (
    <section className="text-gray-600 body-font">
      <div className="justify-center container mx-auto flex px-5 py-[8rem] md:flex-row flex-col  ">
        <div className="  lg:pr-24 md:pr-[1rem] flex flex-col  md:text-left mb-16 md:mb-0 items-center text-center">
          <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
            Before they sold out
            <br className="hidden lg:inline-block" />
            readymade gluten
          </h1>
          <p className="mb-8 leading-relaxed w-[20rem]">
            Copper mug try-hard pitchfork pour-over freegan heirloom neutra air
            plant cold-pressed tacos poke beard tote bag. Heirloom echo park
            mlkshk tote bag selvage hot chicken authentic tumeric truffaut
            hexagon try-hard chambray.
          </p>
          <div className="flex justify-center">
            <Link
              to={"/products/hoodies"}
              className="inline-flex text-white bg-yellow-500 border-0 py-2 px-4 lg:px-6 focus:outline-none hover:bg-yellow-600 rounded text-lg"
            >
              <span>Shop</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.75c0 .415.336.75.75.75z"
                />
              </svg>
            </Link>
            <button className="ml-4 inline-flex text-gray-700 bg-gray-100 border-0 py-2 px-6 focus:outline-none hover:bg-gray-200 rounded text-lg">
              <span>Explore More</span> &nbsp; &nbsp;
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418"
                />
              </svg>
            </button>
          </div>
        </div>
        <div className="lg:max-w-lg lg:w-full md:w-[24rem]  w-[95%]   ">
          <Swiper
            navigation={true}
            modules={[Navigation, Autoplay, EffectFade]}
            loop
            effect={"fade"}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
            }}
            style={{ height: "17rem" }} 
            className="mySwiper"
          >
            <SwiperSlide>
              <img
                className="object-cover object-center rounded  "
                alt="hero"
                src={Images[0]}
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                className="object-cover object-center rounded  "
                alt="hero"
                src={Images[0]}
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                className="object-cover object-center rounded  "
                alt="hero"
                src={Images[1]}
              />
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
