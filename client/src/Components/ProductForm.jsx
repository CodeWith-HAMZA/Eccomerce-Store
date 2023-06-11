import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import React, { useContext, useRef, useState } from "react";
import { shawlCategories } from "../../../constants/shawlCategories";
import { showToast } from "../../../constants/toastNotification";
import { storage } from "../../../firebase/firebase";
import {
  addSingleDocument,
  findByIdAndUpdateDoc,
  getMultipleDocs,
  uploadFileToCloud,
} from "../../../firebase/firebaseMethods";
import Context from "../../../Context/Context";

const CreateProduct = () => {
  const { progress, setProgress } = useContext(Context);
  const [productImages, setProductImages] = useState([]);
  const [ProductForm, setProductForm] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    stock: "",
  });
  const shawlCategorySelect = useRef(null);
  const handleChange = (e) => {
    setProductForm({
      ...ProductForm,
      [e.target.name]: e.target.value,
    });
  };

  React.useEffect(() => {
    setProductForm({ category: shawlCategorySelect?.current?.value });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProgress(10);

    const formData = new FormData(e.target);
    console.log(formData);
    const { name, description, price, stock } = ProductForm;
    if (!name || !description || !price || !stock) {
      showToast("error", "Kindly Fill All These Required Fields!");
      return;
    }

    if (isNaN(ProductForm.price) || isNaN(ProductForm.stock)) {
      showToast("error", "Following Fields Are Required A Pure Number");
      return;
    }
    const docId = await addSingleDocument(ProductForm, "products");
    console.log(docId);

    let imageLinks = [];
    productImages.forEach(async (productImage, idx) => {
      const storageRef = ref(storage, `${docId}/${docId}-(${idx}).jpg`);

      const uploadTask = uploadBytesResumable(storageRef, productImage);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
        },
        (error) => {
          // Handle unsuccessful uploads
          console.log(error, "COULDNT UPLOAD");
        },
        async () => {
          const DownloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          console.log(DownloadURL);
          imageLinks.push(DownloadURL); // * Array Of All The Uploaded-Image Links

          // console.log(imageLinks, "andar")
          if (productImages.length - 1 === idx) {
            console.log(idx, "Submited DOC");
            await findByIdAndUpdateDoc("products", docId, {
              ...ProductForm,
              imageLinks,
            });
          }
        }
      );
    });

    console.log({ ...ProductForm, imageLinks: imageLinks && imageLinks });
    // const allProducts = await getMultipleDocs("products");

    console.log(imageLinks, "bahir");

    showToast("success", "Product Created Successfully");
    setProgress(100);
    setProductImages([]);
    setProductForm({
      name: "",
      description: "",
      price: "",
      category: "",
      stock: "",
    });
  };
  const handleImageUpload = (e) => {
    const uploadedProductImages = Array.from(e.target.files).filter((file) => {
      if (file.size > 35000) {
        showToast("error", "Image Size Must Be Under 35 KB (Killo bytes)");
        return false;
      }
      return true;
    });

    setProductImages([...productImages, ...uploadedProductImages]);
  };

  const handleRemoveImage = (index) => {
    const updatedImages = [...productImages];
    updatedImages.splice(index, 1);
    setProductImages(updatedImages);
    console.log(URL.createObjectURL(updatedImages[0]));
  };

  return (
    <section className=" py-32 px-4">
      <form onSubmit={handleSubmit} className="max-w-3xl mx-auto ">
        <h1 className="text-3xl mb-3  ">Create Your Product: </h1>
        <div className="mb-4">
          <label
            htmlFor="product-name"
            className="block text-gray-700 font-bold mb-2"
          >
            Product Name* :
          </label>
          <input
            type="text"
            id="product-name"
            name="name"
            value={ProductForm.name}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter product name"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="product-description"
            className="block text-gray-700 font-bold mb-2"
          >
            Product Description* :
          </label>
          <textarea
            rows={5}
            name="description"
            id="product-description"
            value={ProductForm.description}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter product description"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="product-price"
            className="block text-gray-700 font-bold mb-2"
          >
            Product Price In Rupees (Rs)* :
          </label>
          <input
            name="price"
            type="text"
            id="product-price"
            value={ProductForm.price}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter product price"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="product-stock"
            className="block text-gray-700 font-bold mb-2"
          >
            Initial Stock:
          </label>
          <input
            name="stock"
            type="text"
            id="product-stock"
            value={ProductForm.stock}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter product Stock"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="product-category"
            className="block text-gray-700 font-bold mb-2"
          >
            Select Category* :
          </label>
          <select
            ref={shawlCategorySelect}
            id="product-category"
            name="category"
            onChange={handleChange}
          >
            {shawlCategories.map((category) => (
              <option value={category}>{category}</option>
            ))}
          </select>
        </div>

        <div className="mb-4 ">
          <label
            htmlFor="product-images"
            title="First Image Is Used As The Main (Marketing Banner Image) "
            className="block text-gray-700 font-bold mb-2"
          >
            Product Images* (Eeach Image Must Be Under 35 KB):
          </label>
          <input
            type="file"
            id="product-images"
            onChange={handleImageUpload}
            className="hidden"
            multiple
          />
          <div className="flex justify-center mt-12">
            <label
              htmlFor="product-images"
              className="flex items-center px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded cursor-pointer focus:outline-none focus:shadow-outline"
            >
              {productImages.length > 0 ? (
                <span>{`${productImages.length} images selected`}</span>
              ) : (
                <span>Select Images</span>
              )}
            </label>
          </div>
          <div className="mt-4 flex flex-wrap">
            {productImages.map((image, index) => (
              <div key={index} className="w-1/4 px-2 mb-4 ">
                <img
                  // * Creating Image-Path(URL) of the current Image
                  src={URL.createObjectURL(image)}
                  alt={`Product Image ${index + 1}`}
                  className="w-full h-auto rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveImage(index)}
                  className="mt-2 px-2 py-1 bg-red-500 hover:bg-red-700 text-white font-bold rounded cursor-pointer focus:outline-none focus:shadow-outline"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>
        <button
          type="submit"
          className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Create Product
        </button>
      </form>
    </section>
  );
};

export default CreateProduct;
