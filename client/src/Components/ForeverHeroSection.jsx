import React from "react";
import Typewriter from "typewriter-effect";
const ForeverHeroSection = () => {
  const bannerImages = [
    "https://images.unsplash.com/photo-1661956602944-249bcd04b63f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxzZWFyY2h8MXx8ZSUyMGNvbW1lcmNlfGVufDB8fDB8fA%3D%3D&w=1000&q=80",
    "https://images.unsplash.com/photo-1604014237800-1c9102c219da?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
  ];
  return (
    <React.Fragment>
      <section class={`relative bg-[url(${bannerImages[1]})] bg-cover bg-center bg-no-repeat`}>
        <div class="absolute inset-0    sm:bg-transparent  bg-gradient-to-tr   from-black/95  to-white/25 "></div>

        <div class="relative mx-auto max-w-screen-xl px-4 py-32 sm:px-6 lg:flex lg:h-screen lg:items-center lg:px-8">
          <div class="max-w-xl text-center sm:text-left">
            <h1 class="text-3xl font-extrabold sm:text-5xl">
              <span className="text-white">Let us find your</span>
              <strong class="block font-extrabold text-yellow-600">
                <Typewriter
                  options={{
                    strings: [
                      "Shop Now, Save More!",
                      "Discover, Shop, Save!",
                      "Sale, Shop, Save!",
                      "Buy, Save, Smile!",
                      "Deals, Discounts, Delight.",
                    ],
                    autoStart: true,
                    loop: true,
                  }}
                /> 
                
              </strong>
            </h1>

            <p class="mt-4 max-w-lg sm:text-xl sm:leading-relaxed text-white">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nesciunt
              illo tenetur fuga ducimus numquam ea!
            </p>

            <div class="mt-8 flex flex-wrap gap-4 text-center">
              <a
                href="#"
                class="block w-full rounded bg-yellow-600 px-12 py-3 text-sm font-medium text-white shadow hover:bg-yellow-500 hover:shadow-md transition-all focus:outline-none focus:ring active:bg-yellow-500 sm:w-auto"
              >
                Get Started
              </a>

              <a
                href="#"
                class="block w-full rounded bg-white px-12 py-3 text-sm font-medium text-rose-600 shadow hover:text-rose-700 focus:outline-none focus:ring active:text-rose-500 sm:w-auto"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>
      </section> 
    </React.Fragment>
  );
};

export default ForeverHeroSection;
