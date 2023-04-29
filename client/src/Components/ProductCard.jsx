import React from "react";
import { Link, NavLink } from "react-router-dom";

const ProductCard = ({
  forFeature,
  title,
  price,
  category,
  productId,
  image,
  description,
}) => {
  // console.log(description);
  return (
    <div
      className={`-400 xl:w-1/5 lg:w-1/4 md:w-1/3 sm:w-1/2  p-4 w-full shadow-md cursor-pointer hover:shadow-lg transition-all active:animate-pulse sm:h-[26rem] bg-white`}
      style={{
        width: forFeature ? "100%" : "",
        height: forFeature ? "30rem" : "",
        // flexBasis: !forFeature ? '14': ""
      }}
    >
      <Link
        to={`/products/${category}/${productId}?title=${title}&price=${price}&category=${category}&productId=${productId}&image=${image}&description=${description}&stock=8`}
        className="block relative h-48 rounded overflow-hidden sm:h-[16rem] "
        // style={{ height: forFeature ? "36rem" : "" }}
      >
        <img
          alt="ecommerce"
          className="object-cover object-center w-full lg:h-full sm:h-[100%] block m-auto"
          src={image}
          style={
            {
              // width: forFeature ? "80%" : "",
              // height: forFeature ? "192%" : "",
            }
          }
        />
      </Link>
      <div className="flex flex-col items-start mt-4">
        <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
          {category}
        </h3>
        <h2 className="text-gray-900 title-font text-lg font-medium">
          {title.slice(0, 30)}
        </h2>
        <span className="mt-1">
          Price: <span className="font-semibold">${price}</span>
        </span>
        <p className="mt-1 text-gray-400">
          <span class="size border-gray-300 border-2 p-1 m-1">SM</span>
          <span class="size border-gray-300 border-2 p-1 m-1">MD</span>
          <span class="size border-gray-300 border-2 p-1 m-1">L</span>
          <span class="size border-gray-300 border-2 p-1 m-1">XL</span>
          <span class="size border-gray-300 border-2 p-1 m-1">XXL</span>
        </p>
      </div>
       
    </div>
  );
};
ProductCard.defaultProps = { 
  title: "astohue",
  price: 2,
  category: "aoesuth",
  productId: "steaohu",
  image: ["aoseuth", "oasetuh"],
  description: "asoteuh",

  forFeature: false
};
export default ProductCard;
