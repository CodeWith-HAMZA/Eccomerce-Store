import React, { useEffect, useState } from "react";
import { getMultipleDocs } from "../../../firebase/firebaseMethods";

const AllProducts = () => {
  const [Products, setProducts] = useState([]);
  useEffect(() => {
    getMultipleDocs("products")
      .then((products) => {
        setProducts(products);
        console.log(products)
      })
      .catch((err) => console.log("Can't Fetch ALl products", err));
  }, []);

  return (
    <section className="h-screen max-w-[80rem] m-auto pt-28 px-4">
      <h1 className="font-normal text-3xl py-5">All Products</h1>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {Products && Products.map((product) => (
          <>
            <div class="bg-white shadow-lg rounded-lg overflow-hidden">
              <img
                class="w-full h-48 object-cover"
                src={product?.imageLinks?.[0]}
                alt="Product Image"
              />

              <div class="p-4">
                <h2 class="font-bold text-xl mb-2">{product.name}</h2>
                <p className="mb-3">Category: <span>{product.category}</span></p>
                <p class="text-gray-700 leading-tight mb-2">Rs: {product.price}</p>
                <p class="text-gray-600">{product.description}
                </p>
              </div>
              <div class="flex items-center justify-between px-4 py-2 ">
                <a
                  href="#"
                  class=" font-bold px-3 rounded-full py-1.5 hover:bg-gray-200 "
                >
                  Edit
                </a>
                <button class="bg-white text-gray-900 font-bold py-2 px-4 rounded-full hover:bg-gray-200">
                  Delete
                </button>
              </div>
            </div>
          </>
        ))}
      </div>
    </section>
  );
};

export default AllProducts;
