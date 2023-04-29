import React from "react";
import { Link } from "react-router-dom";

const DashboardHome = () => {
  return (
    <React.Fragment>
      {/* <header class="bg-white shadow">
        <div class="container mx-auto px-4 py-2 flex justify-between items-center">
          <div class="text-lg font-semibold">
            <a href="#" class="text-gray-800">
              Admin Panel
            </a>
          </div>
          <nav class="text-gray-600">
            <ul class="flex">
              <li class="mr-6">
                <a href="#" class="hover:text-gray-800">
                  Dashboard
                </a>
              </li>
              <li class="mr-6">
                <a href="#" class="hover:text-gray-800">
                  Orders
                </a>
              </li>
              <li>
                <a href="#" class="hover:text-gray-800">
                  Products
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </header> */}

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
          <div class="bg-white shadow-lg rounded-lg overflow-hidden">
            <div class="p-4">
              <h3 class="text-xl font-semibold mb-2">Order #1234</h3>
              <p class="text-gray-700">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac
                nibh eget sapien malesuada bibendum. Nam euismod fermentum nunc,
                et interdum ligula dapibus et.
              </p>
            </div>
            <div class="bg-gray-100 py-3 px-4 text-right">
              <a
                href="#"
                class="inline-block bg-gray-800 text-white py-2 px-4 rounded hover:bg-gray-900"
              >
                View Details
              </a>
            </div>
          </div>
          <div class="bg-white shadow-lg rounded-lg overflow-hidden">
            <div class="p-4">
              <h3 class="text-xl font-semibold mb-2">Order #5678</h3>
              <p class="text-gray-700">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac
                nibh eget sapien malesuada bibendum. Nam euismod fermentum nunc,
                et interdum ligula dapibus et.
              </p>
            </div>
            <div class="bg-gray-100 py-3 px-4 text-right">
              <a
                href="#"
                class="inline-block bg-gray-800 text-white py-2 px-4 rounded hover:bg-gray-900"
              >
                View Details
              </a>
            </div>
          </div>
          <div class="bg-white shadow-lg rounded-lg overflow-hidden">
            <div class="p-4">
              <h3 class="text-xl font-semibold mb-2">Order #9012</h3>
              <p class="text-gray-700">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac
                nibh eget sapien malesuada bibendum. Nam euismod fermentum nunc,
                et interdum ligula dapibus et.
              </p>
            </div>
            <div class="bg-gray-100 py-3 px-4 text-right">
              <a
                href="#"
                class="inline-block bg-gray-800 text-white py-2 px-4 rounded hover:bg-gray-900"
              >
                View Details
              </a>
            </div>
          </div>
        </div>

        <h2 class="text-2xl font-bold my-8">Product List</h2>
        <table class="table-auto w-full mb-8">
          <thead>
            <tr>
              <th class="px-4 py-2 text-left">Product Name</th>
              <th class="px-4 py-2 text-left">Price</th>
              <th class="px-4 py-2 text-left">Stock</th>
              <th class="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="border px-4 py-2">Product A</td>
              <td class="border px-4 py-2">$19.99</td>
              <td class="border px-4 py-2">10</td>
              <td class="border px-4 py-2">
                <a
                  href="#"
                  class="inline-block bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"
                >
                  Edit
                </a>
                <a
                  href="#"
                  class="inline-block bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded ml-2"
                >
                  Delete
                </a>
              </td>
            </tr>
            <tr>
              <td class="border px-4 py-2">Product B</td>
              <td class="border px-4 py-2">$29.99</td>
              <td class="border px-4 py-2">5</td>
              <td class="border px-4 py-2">
                <a
                  href="#"
                  class="inline-block bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"
                >
                  Edit
                </a>
                <a
                  href="#"
                  class="inline-block bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded ml-2"
                >
                  Delete
                </a>
              </td>
            </tr>
            <tr>
              <td class="border px-4 py-2">Product C</td>
              <td class="border px-4 py-2">$39.99</td>
              <td class="border px-4 py-2">2</td>
              <td class="border px-4 py-2">
                <a
                  href="#"
                  class="inline-block bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"
                >
                  Edit
                </a>
                <a
                  href="#"
                  class="inline-block bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded ml-2"
                >
                  Delete
                </a>
              </td>
            </tr>
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
