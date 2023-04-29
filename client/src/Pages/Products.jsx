import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink, useParams } from "react-router-dom";
import ProductCard from "../Components/ProductCard/ProductCard";
import axios from "axios";
import Loader from "../Components/Loader";
import Context from "../Context/Context";
import { collectionGroup } from "firebase/firestore";
import { getMultipleDocs } from "../firebase/firebaseMethods";
import FilteredProducts from "../Components/FilteredProducts";
import Productss from "./Productss";
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
  React.useEffect(() => {
    scrollTo(0, 0);
  }, []);
  return (
    <>
      {/* <FilteredProducts products={Products} productType={productType} /> */}
      <Productss products = {Products} productType={productType} />
    </>
  );
};

export default Products;

 
