import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink, useParams } from "react-router-dom";
import ProductCard from "../Components/ProductCard/ProductCard";
import axios from "axios";
import Loader from "../Components/Loader";
import Context from "../Context/Context";
import { collectionGroup } from "firebase/firestore";
import { getMultipleDocs } from "../firebase/firebaseMethods";
import FilteredProducts from "../Components/FilteredProducts";

import ProductsGrid from "./ProductsGrid";
const Products = () => {
  let { productType } = useParams();

  const { progress, setProgress, Products, setProducts } = useContext(Context);
  useEffect(() => {
    (async () => {
      setProgress(10);
      let products = await getMultipleDocs("products");

      products =
        productType === "All Products"
          ? products
          : products.filter(
              (product) =>
                product.category.toLowerCase() === productType.toLowerCase()
            );
      setProducts(products);

      setProgress(100);
    })();
  }, [productType]);

  return Products.length ? (
    <ProductsGrid products={Products} productType={productType}></ProductsGrid>
  ) : (
    <ProductsNotAvailable></ProductsNotAvailable>
  );
};
function ProductsNotAvailable() {
  return (
    <div class="flex flex-col items-center justify-center h-screen">
      <h2 class="text-3xl font-semibold mb-4">Products Not Available</h2>
      <p class="text-gray-600 mb-8">
        We're sorry, but there are no products available at the moment.
      </p>
      <Link to="/" class="text-yellow-500 hover:underline">
        Go back to homepage
      </Link>
    </div>
  );
}

export default Products;

//  old product card
// {/* <div
// class="el-wrapper w-[17rem] lg:w-[16.6rem]"
// >
// <button
//   onClick={gotoProductDetails}
//   className="block relative  rounded overflow-hidden cursor-pointer "
// >
//   <div class="box-up">
//     <img class="img" src={imageLinks?.[0]} alt="" />
//     <div class="img-info  ">
//       <div class="info-inner top-14">
//         <span class="p-name text-inherit">
//           {name && name.slice(0, 26)}
//           {name && name.length > 26 && "..."}
//         </span>
//         <span class="p-company text-black"> {category}</span>
//         <span className="p-2 text-sm">
//           {description && description.slice(0, 56)}...
//         </span>
//       </div>
//       <div class="a-size">
//         <span className="text-gray-600"> Available Sizes : </span>
//         <span class="size flex gap-2 justify-center">
//           {Sizes.map((size, idx) => (
//             <span
//               style={{ background: "#80808052" }}
//               className={`shadow-xl border-2  ${
//                 idx === 0 ? "border-gray-500" : ""
//               } rounded-md px-2.5 py-1`}
//             >
//               {size}
//             </span>
//           ))}
//         </span>
//       </div>
//       <div class="a-size top-[50%]  ">
//         <span className="text-gray-600"> Available Colors : </span>
//         <span class="size flex gap-2 justify-center">
//           {Colors.map((color, idx) => (
//             <span
//               style={{ background: "#80808052" }}
//               className={`shadow-xl border-2  ${
//                 idx === 0 ? "border-gray-500" : ""
//               } rounded-md px-2.5 py-1`}
//             >
//               {color}
//             </span>
//           ))}
//         </span>
//       </div>
//     </div>
//   </div>
// </button>
// <div class="box-down">
//   <div class="h-bg">
//     <div class="h-bg-inner"></div>
//   </div>

//   {/*  Adding To Cart With Out Opening It On Another Page (Routing) */}
//   <button
//     class="cart hover:shadow-lg"
//     onClick={() => {
//       AddToCart(
//         name,
//         description,
//         imageLinks[0],
//         category,
//         price,
//         productId,
//         stock,
//         Sizes[0],
//         Colors[0],
//         1
//       );
//     }}
//   >
//     <span class="price">Rs {price}</span>
//     <span class="add-to-cart">
//       <span class="txt ">Add To Cart ({stock})</span>
//     </span>
//   </button>
// </div>
// </div> */}
