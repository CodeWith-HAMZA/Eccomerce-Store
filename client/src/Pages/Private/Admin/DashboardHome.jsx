import React, { useEffect, useMemo, useState } from "react";
import { Link, json, useNavigate } from "react-router-dom";
import { getMultipleDocs } from "../../../firebase/firebaseMethods";

const DashboardHome = () => {
  const [Products, setProducts] = useState([]);
  const [Orders, setOrders] = useState([]);
  const nav = useNavigate();

  useEffect(() => {
    getMultipleDocs("products")
      .then((products) => {
        setProducts(products);
        console.log(products);
      })
      .catch((err) => console.log("Can't Fetch ALl products", err));
  }, []);
  const orders = useMemo(
    () =>
      getMultipleDocs("orders")
        .then((orders) => {
          setOrders(orders);
          return orders;
        })
        .catch((err) => err),
    []
  );

  const navigateToOrderDetails = (order) => {
    nav(`/admin/orders/${order.id}`, {
      state: {
        ...{ order },
      },
    });
  };
  return (
    <React.Fragment>
      <main class="container mx-auto px-4 py-8">
        <h1 class="text-4xl font-bold mb-4">
          Welcome To Your Shop's Admin Panel
        </h1>
        <p class="text-lg text-gray-700 mb-8">
          Take control of your online shop with the admin panel and unlock
          limitless possibilities
        </p>

        <h2 class="text-2xl font-bold mb-2">Recent Orders</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Orders &&
            Orders?.map((order) => (
              <div class="bg-white shadow-lg rounded-lg overflow-hidden">
                <div class="p-4">
                  <h3 class="text-md text-gray-600 font-semibold mb-2">
                    Order #{order?.id}
                  </h3>
                  <span class="text-gray-700 px-3 py-1.5 rounded-lg bg-gray-200">
                    {order?.status.at(-1).state}
                  </span>
                  <span class="text-gray-700 px-3 py-1.5 rounded-lg bg-gray-200">
                    {order?.timestamp.seconds * 1000}
                  </span>
                </div>
                <div class="bg-gray-100 py-3 px-4 text-right">
                  <button
                    onClick={() => navigateToOrderDetails(order)}
                    class="inline-block bg-gray-800 text-white py-2 px-4 rounded hover:bg-gray-900"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
        </div>

        <h2 class="text-2xl font-bold my-8">Products List</h2>
        <table class="table-auto w-full mb-8">
          <thead>
            <tr>
              <th class="px-2 py-2 text-left">S/no</th>
              <th class="px-4 py-2 text-left">Id</th>
              <th class="px-4 py-2 text-left">Product Name</th>
              <th class="px-4 py-2 text-left">Price</th>
              <th class="px-4 py-2 text-left">Currently In Stock</th>
            </tr>
          </thead>
          <tbody>
            {Products &&
              Products?.map((product, idx) => {
                return (
                  <tr>
                    <td class="border px-2 py-2">{idx + 1}</td>
                    <td class="border px-4 py-2">{product?.id}</td>
                    <td class="border px-4 py-2">{product?.name}</td>
                    <td class="border px-4 py-2">Rs: {product?.price}</td>
                    <td class="border px-4 py-2">({product?.stock})</td>
                  </tr>
                );
              })}
          </tbody>
        </table>

        <div class="text-right">
          <Link
            to="/admin/products/new"
            class="inline-block bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"
          >
            Add Product
          </Link>
        </div>
      </main>

      {/* <footer class="bg-gray-800 text-white py-4">
        <div class="container mx-auto px-4 flex justify-between items-center">
          <div class="text-sm">
            &copy; 2023 Admin Panel. All rights reserved.
          </div>
          <div class="text-sm">
            <a href="#" class="hover:text-gray-400">
              Privacy Policy
            </a>
            <span class="mx-2">|</span>
            <a href="#" class="hover:text-gray-400">
              Terms of Service
            </a>
          </div>
        </div>
      </footer> */}
    </React.Fragment>
  );
};

export default DashboardHome;
