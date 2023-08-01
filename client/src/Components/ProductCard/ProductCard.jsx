import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Context from "../../Context/Context";
import "./index.css";
const ProductCard = ({
  name,
  category,
  price,
  description,
  imageLinks,
  forFeature,
  productId,
  stock,
}) => {
  const { AddToCart, setColors, Colors, Sizes, setSizes } = useContext(Context);
  const nav = useNavigate();
  useEffect(() => {
    console.log(imageLinks, "ProductCard");
  }, []);
  // const [Size, setSize] = useState("LG");
  // const [Color, setColor] = useState("Red");
  // ?name=${name}&price=${price}&category=${category}&productId=${productId}&image=${imageLinks?.[0]}&description=${description}&stock=${stock}
  const gotoProductDetails = () => {
    console.log(imageLinks, "Proudct Details  ");
    nav(`/products/${category}/${productId}`, {
      state: {
        name,
        price,
        category,
        productId,
        imageLinks,
        stock,
        description,
      },
    });
  };
  return (
    <React.Fragment>
       <div class="group relative cursor-pointer" onClick={gotoProductDetails} >
        <div class="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
          <img src={imageLinks?.[0]}  alt="Front of men&#039;s Basic Tee in black." class="h-full w-full object-cover object-center lg:h-full lg:w-full" />
        </div>
        <div class="mt-4 flex justify-between">
          <div>
            <h3 class="text-sm text-gray-700">
              <a href="#">
                {/* <span   class="absolute inset-0">eueu</span> */}
                {name && name.slice(0, 26)}
          {name && name.length > 26 && "..."}
              </a>
            </h3>
            <p class="mt-1 text-sm text-gray-500">Black</p>
          </div>
          <div className=" flex justify-end gap-2">

          <p class="text-sm font-medium text-gray-500"> Stock ({stock})</p>
          <p class="text-sm font-medium text-gray-900">${price}</p>
          </div>
        </div>
      </div>
 
    </React.Fragment>
  );
}; 


export default ProductCard;
