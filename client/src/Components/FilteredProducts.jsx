import React from "react";
import ProductCard from "./ProductCard/ProductCard";

const FilteredProducts = ({products, productType}) => {
  return (
    <section className="text-gray-600 body-font relative z-[1]">
      <div className="container px-5 py-32 mx-auto">
        <h1 className="font-bold text-gray-700 text-4xl mb-8">{productType}</h1>
        <hr />
        <div className="">
          <div className="flex flex-wrap">
            {products.map((product, ind) => {
              console.log(product?.imageLinks, "PRODUCTS");
              return (
                <ProductCard
                  name={product?.name}
                  category={product?.category}
                  imageLinks={product?.imageLinks}
                  productId={product?.id}
                  description={product?.description}
                  price={product?.price}
                  stock={product?.stock}
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FilteredProducts;
