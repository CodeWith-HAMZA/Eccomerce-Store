import React from "react";
import { Link } from "react-router-dom";
import ProductCard from "../Components/ProductCard/ProductCard";
import Context from "../Context/Context";

const ProductsGrid = ({ products, productType }) => {
  const { Categories, setCategories } = React.useContext(Context);
  const [IsFiltersShown, setIsFiltersShown] = React.useState(false);
  return (
    <section class="bg-white dark:bg-gray-50 pt-32 px-12 min-h-[100vh]">
      <button
        onClick={() => setIsFiltersShown(!IsFiltersShown)}
        className="rounded-lg hover:bg-gray-300 transition-all px-3 py-2 bg-gray-200"
      >
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
</svg>

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
              <p class="text-gray-500 ">Items: {products.length}  </p>
              <div class="flex items-center">
                <p class="text-gray-500 ">Sort By:{" "}</p>
                <select class="font-medium text-gray-700 bg-transparent dark:text-gray-500 focus:outline-none">
                  <option value="#">Recommended</option>
                  <option value="#">Size</option>
                  <option value="#">Price</option>
                </select>
              </div>
            </div>
            <div class="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4    xl:gap-x-8">

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

export default ProductsGrid;
