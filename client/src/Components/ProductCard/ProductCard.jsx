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
      <div
        class="el-wrapper w-[17rem] lg:w-[16.6rem]"
      >
        <button
          onClick={gotoProductDetails}
          className="block relative  rounded overflow-hidden cursor-pointer "
        >
          <div class="box-up">
            <img class="img" src={imageLinks?.[0]} alt="" />
            <div class="img-info  ">
              <div class="info-inner top-14">
                <span class="p-name text-inherit">
                  {name && name.slice(0, 26)}
                  {name && name.length > 26 && "..."}
                </span>
                <span class="p-company text-black"> {category}</span>
                <span className="p-2 text-sm">
                  {description && description.slice(0, 56)}...
                </span>
              </div>
              <div class="a-size">
                <span className="text-gray-600"> Available Sizes : </span>
                <span class="size flex gap-2 justify-center">
                  {Sizes.map((size, idx) => (
                    <span
                      style={{ background: "#80808052" }}
                      className={`shadow-xl border-2  ${
                        idx === 0 ? "border-gray-500" : ""
                      } rounded-md px-2.5 py-1`}
                    >
                      {size}
                    </span>
                  ))}
                </span>
              </div>
              <div class="a-size top-[50%]  ">
                <span className="text-gray-600"> Available Colors : </span>
                <span class="size flex gap-2 justify-center">
                  {Colors.map((color, idx) => (
                    <span
                      style={{ background: "#80808052" }}
                      className={`shadow-xl border-2  ${
                        idx === 0 ? "border-gray-500" : ""
                      } rounded-md px-2.5 py-1`}
                    >
                      {color}
                    </span>
                  ))}
                </span>
              </div>
            </div>
          </div>
        </button>
        <div class="box-down">
          <div class="h-bg">
            <div class="h-bg-inner"></div>
          </div>

          {/*  Adding To Cart With Out Opening It On Another Page (Routing) */}
          <button
            class="cart hover:shadow-lg"
            onClick={() => {
              AddToCart(
                name,
                description,
                imageLinks[0],
                category,
                price,
                productId,
                stock,
                Sizes[0],
                Colors[0],
                1
              );
            }}
          >
            <span class="price">Rs {price}</span>
            <span class="add-to-cart">
              <span class="txt ">Add To Cart ({stock})</span>
            </span>
          </button>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ProductCard;
