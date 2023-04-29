import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { json, useLocation, useSearchParams } from "react-router-dom";
import { addItemToCart } from "../App/cartSlice";
import Context from "../Context/Context";

const ProductDetails = () => {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const [Params, setParams] = useState(null);

  const {
    SelectedColor,
    setSelectedColor,
    SelectedSize,
    setSelectedSize,
    setCart,
    Cart,
    Colors,
    Sizes,
    setInLC,
    getFromLC,
    setIsCartOpened,
    AddToCart,
  } = React.useContext(Context);
  const cart = useSelector((state) => state.cart);
  const [ProductDetails, setProductDetails] = useState({});
  const dispatch = useDispatch();
  const [SelectedImage, setSelectedImage] = useState({
    id: 0,
    url: location?.state?.imageLinks[0],
  });
  useEffect(() => {
    setProductDetails(location?.state);
    setParams(searchParams);
    scrollTo(0, 0);
  }, []);

  console.log(searchParams);
  if (!Params) {
    console.log(searchParams.get("name"));
    return <h1>Loading...</h1>;
  }

  return (
    <>
      <section class="text-gray-600 body-font overflow-hidden">
        <div class="container px-5 py-24 mx-auto">
          <div class="lg:w-4/5 mx-auto flex flex-wrap">
            <div className="lg:w-1/2 w-full lg:h-auto h-full">
              <img
                alt="ecommerce"
                class="h-[80%] w-full object-cover object-center rounded"
                src={SelectedImage.url}
              />
              <div className="m-2 flex flex-wrap gap-2.5">
                {ProductDetails?.imageLinks.map((url, id) => (
                  <img
                    onClick={() => setSelectedImage({ id, url })}
                    class={`h-[4rem] w-[4rem] cursor-pointer ${
                      id === SelectedImage.id ? "border-2 border-gray-500" : ""
                    }     `}
                    src={url}
                    alt="Description of image"
                  />
                ))}
              </div>
            </div>
            <div class="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
              <h2 class="text-sm title-font text-gray-500 tracking-widest">
                category: ({ProductDetails?.category})
              </h2>

              <h1 class="text-gray-900 text-3xl title-font font-medium mb-1">
                {ProductDetails?.name}
              </h1>
              <div class="flex mb-4">
                <span class="flex items-center">
                  <svg
                    fill="currentColor"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    class="w-4 h-4 text-red-500"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <svg
                    fill="currentColor"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    class="w-4 h-4 text-red-500"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <svg
                    fill="currentColor"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    class="w-4 h-4 text-red-500"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <svg
                    fill="currentColor"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    class="w-4 h-4 text-red-500"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <svg
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    class="w-4 h-4 text-red-500"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <span class="text-gray-600 ml-3">4 Reviews</span>
                </span>
                <span class="flex ml-3 pl-3 py-2 border-l-2 border-gray-200 space-x-2s">
                  <a class="text-gray-500">
                    <svg
                      fill="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      class="w-5 h-5"
                      viewBox="0 0 24 24"
                    >
                      <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                    </svg>
                  </a>
                  <a class="text-gray-500">
                    <svg
                      fill="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      class="w-5 h-5"
                      viewBox="0 0 24 24"
                    >
                      <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                    </svg>
                  </a>
                  <a class="text-gray-500">
                    <svg
                      fill="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      class="w-5 h-5"
                      viewBox="0 0 24 24"
                    >
                      <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                    </svg>
                  </a>
                </span>
              </div>
              {
                <h2>
                  {" "}
                  Stock: (
                  {ProductDetails?.stock > 2
                    ? ProductDetails?.stock
                    : "Currently Out Of Stock"}
                  )
                </h2>
              }
              <p class="leading-relaxed">{ProductDetails?.description}</p>
              <div class="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
                {/* <div class="flex">
                <span class="mr-3">Color</span>
                <button class="border-2 border-gray-200 rounded-full w-6 h-6 focus:outline-none"></button>
                <button class="border-2 border-gray-200 ml-1 bg-gray-700 rounded-full w-6 h-6 focus:outline-none"></button>
                <button class="border-2 border-gray-200 ml-1 bg-red-500 rounded-full w-6 h-6 focus:outline-none"></button>
              </div> */}
                <div class="flex ml-6 items-center">
                  <span class="mr-3">Size:</span>
                  <div class="relative">
                    <select
                      onChange={(e) => setSelectedSize(e.target.value)}
                      class="rounded border appearance-none border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-red-200 focus:border-red-500 text-base pl-3 pr-10"
                    >
                      {Sizes.map((size) => (
                        <option>{size}</option>
                      ))}
                    </select>
                    <span class="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                      <svg
                        fill="none"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        class="w-4 h-4"
                        viewBox="0 0 24 24"
                      >
                        <path d="M6 9l6 6 6-6"></path>
                      </svg>
                    </span>
                  </div>
                </div>
                <div class="flex ml-6 items-center">
                  <span class="mr-3">Color:</span>
                  <div class="relative">
                    <select
                      onChange={(e) => setSelectedColor(e.target.value)}
                      class="rounded border appearance-none border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-red-200 focus:border-red-500 text-base pl-3 pr-10"
                    >
                      {Colors.map((color) => (
                        <option>{color}</option>
                      ))}
                    </select>
                    <span class="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                      <svg
                        fill="none"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        class="w-4 h-4"
                        viewBox="0 0 24 24"
                      >
                        <path d="M6 9l6 6 6-6"></path>
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
              <div class="flex">
                <span class="title-font font-medium text-2xl text-gray-900">
                  Rs: {ProductDetails?.price}
                </span>
                {ProductDetails?.stock > 0 && (
                  <button
                    onClick={() => {
                      AddToCart(
                        ProductDetails?.name,
                        ProductDetails?.description,
                        ProductDetails?.imageLinks[0],
                        ProductDetails?.category,
                        ProductDetails?.price,
                        ProductDetails?.productId,
                        ProductDetails?.stock,
                        SelectedSize,
                        SelectedColor,
                        1
                      );
                      setIsCartOpened(true);
                    }}
                    class={`flex ml-auto  text-white pt-3 transition-all   focus:outline-2  bg-red-500 border-0 py-2 px-4 focus:outline-none hover:bg-red-600 rounded `}
                  >
                    Add To Cart
                  </button>
                )}
                {/* <button class="flex ml-auto text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded">
                  Buy
                </button> */}
                <button class="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
                  <svg
                    fill="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    class="w-5 h-5"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductDetails;
