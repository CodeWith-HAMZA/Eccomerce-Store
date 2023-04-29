import React from "react";
import { Link } from "react-router-dom";
import ProductCard from "../Components/ProductCard/ProductCard";
import Context from "../Context/Context";

const Productss = ({ products, productType }) => {
  const { Categories, setCategories } = React.useContext(Context);
  const [IsFiltersShown, setIsFiltersShown] = React.useState(false);
  return (
    <section class="bg-white dark:bg-gray-50 pt-32 px-12">
      <button
        onClick={() => setIsFiltersShown(!IsFiltersShown)}
        className="h-10 px-5 text-indigo-100 transition-colors duration-150 bg-yellow-700 rounded-lg hover:bg-yellow-800  text-lg"
      >
        {IsFiltersShown ? "Show" : "Hide"} Filters
      </button>
      <div class="container mx-auto mt-10">
        <div class="lg:flex lg:-mx-2">
          <div
            class={`space-y-3  lg:px-2 lg:space-y-4 w-[6rem] ${
              IsFiltersShown && "hidden"
            }`}
          >
            {Categories?.map(({ name, url }) => (
              <Link
                to={url}
                class="block font-medium text-gray-600 hover:underline focus:underline focus:text-yellow-600"
              >
                {name}
              </Link>
            ))}
          </div>

          <div class="mt-6 lg:mt-0 lg:px-2 lg:w-4/5 ">
            <div class="flex items-center justify-between text-sm tracking-widest uppercase ">
              <p class="text-gray-500 ">{products.length} Items</p>
              <div class="flex items-center">
                <p class="text-gray-500 ">Sort By:{" "}</p>
                <select class="font-medium text-gray-700 bg-transparent dark:text-gray-500 focus:outline-none">
                  <option value="#">Recommended</option>
                  <option value="#">Size</option>
                  <option value="#">Price</option>
                </select>
              </div>
            </div>
            <div
              class="grid grid-cols-1 lg:w-[52rem] xl:w-[70rem] gap-32 md:gap-0 mt-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 
                   "
            >
              {products.map((product) => (
                <ProductCard
                  name={product?.name}
                  category={product?.category}
                  imageLinks={product?.imageLinks}
                  productId={product?.id}
                  description={product?.description}
                  price={product?.price}
                  stock={product?.stock}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Productss;
