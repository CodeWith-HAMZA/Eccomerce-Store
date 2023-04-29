import { collectionGroup } from "firebase/firestore";
import React, { useState } from "react";
import { _Statuses } from "../constants/orderStatuses";

const MinusMark = () => {
  return (
    <svg
      class="h-4 w-4 "
      fill="none"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path d="M20 12H4" stroke-width="3"></path>
    </svg>
  );
};

const CheckMark = () => {
  return (
    <svg
      class="h-4 w-4 "
      fill="none"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path d="M5 13l4 4L19 7"></path>
    </svg>
  );
};
const CrossMark = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      class="w-6 h-6"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  );
};

const Order = ({ order, orderId }) => {
  const [OrderStatus, setOrderStatus] = useState("Placed");

  let stepCompleted = true,
    pulseOnStatus = false;
  // function parsePastForm(givenStatus) {
  //   return givenStatus.includes("ing")
  //     ? givenStatus.slice(0, givenStatus.length - 3) + "ed"
  //     : givenStatus;
  // }
  const isStepCompleted = (status, order) => {
    if (order?.status.includes("Failed") && status === "Failed") {
      return "red";
    }
    if (order?.status.includes(status)) {
      return "green";
    }
    return "gray";
  };

  const pulseOnAfterCurrentStatus = (status, order) => {
    if (status === "Failed") {
      return false;
    }
    if (order?.status.includes(status)) {
      return false;
    }
    return true;
  };
  // write custom react hook to fetch data
  return (
    <React.Fragment>
      <section className="pt-16">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div class="bg-white shadow overflow-hidden sm:rounded-lg">
            <div class="px-4 py-5 sm:px-6">
              <h3 class="text-lg leading-6 font-medium text-gray-900">
                Order #{orderId}
              </h3>
              <p class="mt-1 max-w-2xl text-sm text-gray-500">
                Placed on {new Date(Date(order?.timestamp)).toDateString()}
              </p>
            </div>
            <div class="border-t border-gray-200">
              <dl>
                <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt class="text-sm font-medium text-gray-500">Order Total</dt>
                  <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    Rs: {order.netAmount}
                  </dd>
                </div>
                <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt class="text-sm font-medium text-gray-500">Email</dt>
                  <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {order.email}
                  </dd>
                </div>
                <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt class="text-sm font-medium text-gray-500">
                    Payment Method
                  </dt>
                  <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {order.paymentMethod}
                  </dd>
                </div>
                <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt class="text-sm font-medium text-gray-500">
                    Order Status
                  </dt>
                  <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    <span
                      class={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-${
                        order?.status[order?.status.length - 1] === "Failed"
                          ? "red"
                          : "green"
                      }-100 text-${
                        order?.status[order?.status.length - 1] === "Failed"
                          ? "red"
                          : "green"
                      }-800`}
                    >
                      {order?.status[order?.status.length - 1]}
                    </span>
                  </dd>
                </div>
                <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt class="text-sm font-medium text-gray-500">
                    Tracking Number
                  </dt>
                  <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {order.id}
                  </dd>
                </div>
              </dl>
              <div class="p-4 border-t border-gray-200">
                <h3 class="text-lg leading-6 font-medium text-gray-900">
                  Tracking Order
                </h3>
                <div class="mt-4 space-y-4">
                  {_Statuses.map((status, idx) => {
                    return (
                      <div class="flex space-x-2">
                        <div
                          class={`flex-none w-6 h-6 rounded-full bg-${isStepCompleted(
                            status,
                            order
                          )}-500 ${
                            pulseOnAfterCurrentStatus(status, order)
                              ? "animate-pulse"
                              : ""
                          } flex items-center justify-center text-white`}
                        >
                          {isStepCompleted(status, order) === "green" ? (
                            <CheckMark />
                          ) : isStepCompleted(status, order) === "gray" ? (
                            <MinusMark />
                          ) : (
                            <CrossMark />
                          )}
                        </div>
                        <div class="flex-grow border-l-2 border-gray-200 pl-4          ">
                          <p class="text-sm text-gray-500">Order {status}</p>
                          <p class="text-sm font-medium text-gray-900 px-3 py-3">
                            April 20, 2023
                            {Date(Date.now().toString())}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
          <div class="bg-gray-100 py-6">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div class="bg-white shadow overflow-hidden sm:rounded-lg">
                <div class="px-4 py-5 sm:px-6">
                  <h3 class="text-lg leading-6 font-medium text-gray-900">
                    Order Summary
                  </h3>
                  <p class="mt-1 max-w-2xl text-sm text-gray-500">
                    Order #{orderId}
                  </p>
                </div>
                <div class="border-t border-gray-200 px-4 py-5 sm:px-6">
                  <dl class="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                    <div class="sm:col-span-1">
                      <dt class="text-sm font-medium text-gray-500">
                        Order total
                      </dt>
                      <dd class="mt-1 text-sm text-gray-900">
                        Rs: {order.netAmount}
                      </dd>
                    </div>
                    <div class="sm:col-span-1">
                      <dt class="text-sm font-medium text-gray-500">
                        Payment method
                      </dt>
                      <dd class="mt-1 text-sm text-gray-900">
                        {order.paymentMethod}
                      </dd>
                    </div>
                    <div class="sm:col-span-1">
                      <dt class="text-sm font-medium text-gray-500">
                        Shipping address
                      </dt>
                      <dd class="mt-1 text-sm text-gray-900">
                        {order.address}
                      </dd>
                    </div>
                    <div class="sm:col-span-1">
                      <dt class="text-sm font-medium text-gray-500">
                        Shipping method
                      </dt>
                      <dd class="mt-1 text-sm text-gray-900">Standard</dd>
                    </div>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>{" "}
    </React.Fragment>
  );
};

Order.defaultProps = {
  order: {
    id: `#${"3437487348"}`,
    netAmount: "12",
    paymentMethod: "COD",
    email: "jdoe@example.com",
    phone: "555-555-343",
    address: "Jane Doe 1234 Elm Street Anytown, USA 12345",
    status: "Pending", // Pending, Processing", "Shipped", "Delivered", "Cancelled
    orderItems: [
      {
        productId: 1,
        name: "Product 1",
        price: "23",
        quantity: 2,
      },
      {
        productId: 1,
        name: "Product 1",
        price: "23",
        quantity: 2,
      },
    ], // *products
    placedOrderDate: Date(Date.now().toString()),
  },
};

export default Order;
