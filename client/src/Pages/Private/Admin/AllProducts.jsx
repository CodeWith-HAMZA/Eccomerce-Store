import React, { useContext, useEffect, useState } from "react";
import { getMultipleDocs } from "../../../firebase/firebaseMethods";
import { Link } from "react-router-dom";
import { deleteDoc, doc } from "firebase/firestore";
import { db, storage } from "../../../firebase/firebase";
import { showToast } from "../../../constants/toastNotification";
import Context from "../../../Context/Context";
import Modal from "../../../Modal";
import { deleteObject, ref } from "firebase/storage";

const AllProducts = () => {
  const [Products, setProducts] = useState([]);
  const [SelectedProduct, setSelectedProduct] = useState({});
  const { setIsOpen } = useContext(Context);
  useEffect(() => {
    getMultipleDocs("products")
      .then((products) => {
        setProducts(products);
        console.log(products);
      })
      .catch((err) => console.log("Can't Fetch ALl products", err));
    console.log(Products);
  }, []);
  async function handleProductDeletion(product) {
    try {
      const docRef = doc(db, "products", product?.id);
      console.log(product, "PRODUCT");
      await deleteImages(product);
      await deleteDoc(docRef);
      setIsOpen(true);
      showToast("success", `Successfully Deleted The Product #${product?.id}`);
    } catch (error) {
      console.log("Error Occured ", error);
    }
  }
  async function deleteImages(product) {
    product?.imageLinks.forEach(async (imageLink, idx) => {
      const imageRef = ref(storage, `${product?.id}/${product?.id}-${idx}`);
      deleteObject(imageRef)
        .then(() => {
          console.log("Success");
          // File deleted successfully
        })
        .catch((error) => {
          // Uh-oh, an error occurred!
        });
      console.log("Successfully Deleted Image");
    });
  }
  async function openModal(product) {
    setIsOpen(true);
    setSelectedProduct(product);
  }
  return Products.length ? (
    <section className="h-screen max-w-[80rem] m-auto pt-28 px-4">
      <Modal
        title={"Are You Sure?"}
        paragraph={"Confirm to delete this product"}
      >
        <div className="mt-4 ">
          <button
            type="button"
            className="inline-flex justify-center rounded-md border border-transparent bg-gray-100 px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2 mr-2"
            onClick={() => {
              setIsOpen(false);
            }}
          >
            Cancel
          </button>
          <button
            onClick={() => {
              handleProductDeletion(SelectedProduct);
              setIsOpen(false);
            }}
            type="button"
            className="transition-all inline-flex justify-center rounded-md border bg-red-600  border-transparent px-4 py-2 text-sm font-medium text-gray-100 hover:bg-red-700 hover:shadow-md active:outline focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
          >
            Confirm
          </button>
        </div>
      </Modal>
      <h1 className="font-normal text-3xl py-5">All Products</h1>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {Products &&
          Products.map((product) => (
            <>
              <div class="bg-white shadow-lg rounded-lg overflow-hidden">
                <img
                  class="w-full h-48 object-cover"
                  src={product?.imageLinks?.[0]}
                  alt="Product Image"
                />

                <div class="p-4">
                  <h2 class="font-bold text-xl mb-2 break-words">
                    {product.name}
                  </h2>
                  <span className="text-xs text-gray-500">#{product.id}</span>
                  <p className="mb-3">
                    Category: <span>{product.category}</span>
                  </p>
                  <p class="text-gray-700 leading-tight mb-2">
                    In Stock: {product.stock}
                  </p>
                  <p class="text-gray-700 leading-tight mb-2">
                    Rs: {product.price}
                  </p>
                  <p class="text-gray-600">{product.description}</p>
                </div>
                <div class="flex items-center justify-start gap-1 px-4 py-2 ">
                  <Link
                    to={`/admin/products/${product.id}`}
                    class="text-xs font-bold px-4 py-2 rounded-full   hover:bg-gray-300  bg-gray-200 "
                  >
                    EDIT
                  </Link>

                  <button
                    onClick={() => openModal(product)}
                    className={
                      "bg-red-700 text-xs text-gray-200 font-bold py-2 px-4 rounded-full hover:bg-red-900"
                    }
                  >
                    Delete
                  </button>
                  <button
                    className={`text-xs rounded-full px-2 py-2 font-bold  ${
                      true
                        ? "bg-gray-700 text-gray-200"
                        : "bg-gray-200 text-gray-700"
                    }`}
                  >
                    Featured
                  </button>
                </div>
              </div>
            </>
          ))}
      </div>
    </section>
  ) : (
    <ProductsNotFound />
  );
};

function ProductsNotFound() {
  return (
    <div class="flex flex-col items-center justify-center h-screen">
      <h2 class="text-3xl font-semibold mb-4">Products Not Found</h2>
      <p class="text-gray-600 mb-8">
        Sorry, we couldn't find any products, create one!
      </p>
      <div className="flex gap-3">
        <Link
          to={"/admin/dashboard"}
          class="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded focus:outline-none"
        >
          Go Back
        </Link>
        <Link
          to={"/admin/products/new"}
          class="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded focus:outline-none"
        >
          Create Product
        </Link>
      </div>
    </div>
  );
}

export default AllProducts;
