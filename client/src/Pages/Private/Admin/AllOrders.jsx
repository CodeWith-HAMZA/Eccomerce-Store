import { collectionGroup } from "firebase/firestore";
import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { _Statuses } from "../../../constants/orderStatuses";
import { showToast } from "../../../constants/toastNotification";
import Context from "../../../Context/Context";
import {
  findByFieldAndUpdateDoc,
  findByIdAndUpdateDoc,
  getMultipleDocs,
} from "../../../firebase/firebaseMethods";
import { useQueries, useQuery } from "@tanstack/react-query";
import convertMiliSecondsToDate from "../../../Utilities/convertMiliSecondsToDate";
const AllOrders = () => {
  const { User, setProgress } = React.useContext(Context);
  // const [OrderStatuses, setOrderStatuses] = React.useState();
  const [Keyword, setKeyword] = React.useState(""); // * Take-Care Of Filteration (Searching by order-id)
  // const [Filter, setFilter] = React.useState(""); // * Take-Care Of Filteration (Ascending/Descending)
  const [FilterByDate, setFilterByDate] = React.useState("desc");
  const [FilterByPrice, setFilterByPrice] = React.useState("");
  let IsDisabledStatusOption = false;

  const [Orders, setOrders] = React.useState([]);
  const nav = useNavigate();
  const [IsDisableOptions, setIsDisableOptions] = React.useState(false);
  const [SelectedStatus, setSelectedStatus] = React.useState("");

  /**
   * This function navigates to the order details page with the order ID and state as parameters.
   */
  const navigateToOrderDetails = (order) => {
    nav(`/admin/orders/${order.id}`, {
      state: {
        ...{ order },
      },
    });
  };

  React.useEffect(() => {
    (async () => {
      setProgress(10);
      const allOrders = await getMultipleDocs("orders");
      setOrders([...allOrders]);
      setProgress(100);
      console.log(allOrders, "hu");
    })();
  }, [SelectedStatus]);

  Orders.sort(function (a, b) {
    // * Empty String Of {{Filter}}-State Means "descending-order" & By Default It's Descending
    if (FilterByDate === "asc") {
      // * Ascending Order
      return new Date(a.timestamp) - new Date(b.timestamp);
    } else if (FilterByPrice === "asc") {
      return new Date(a.netAmount) - new Date(b.netAmount);
    } else if (FilterByPrice === "desc") {
      return new Date(b.netAmount) - new Date(a.netAmount);
    } else if (FilterByDate === "desc") {
      // * Descending Order
      return new Date(b.timestamp) - new Date(a.timestamp);
    }
  });

  const handleOrderStatus = async (e, order, idx) => {
    console.log(e.target.value, "Chalgayas");
    const newOrderStatus = e.target.value;
    setSelectedStatus(newOrderStatus);
    const orders = Orders;
    setOrders(() => [...orders]);

    // * Updating the Current Order
    console.log(order?.id, "u");
    await findByIdAndUpdateDoc("orders", order?.id, {
      status: [
        ...Orders[idx]["status"],
        { state: newOrderStatus, atTime: Date.now() },
      ],
    });
    console.log("updated success");

    showToast(
      "success",
      `Updated The Order Status To "${changedOrderState}" Successfully`
    );
  };

  return (
    <section class=" overflow-x-auto pt-[10rem] min-h-screen">
      <div className="mx-auto max-w-[80rem] p-2 ">
        <div className="flex justify-between items-center mb-3">
          <h1 className="text-xl pl-[1rem] max-w-[80rem]">All Orders:-</h1>
          <input
            value={Keyword}
            onChange={(e) => setKeyword(e.target.value)}
            className="w-[14rem] px-2 mr-5 py-1 outline-none border-gray-300 rounded-sm border-[1px] focus:border-gray-400 transition-all"
            placeholder="Search By Order ID"
            type={"text"}
          />
        </div>
        {Orders.length === 0 ? (
          <OrdersNotFound />
        ) : (
          <table class="min-w-[100%] divide-y-2 divide-gray-200 text-sm ml-[1rem]">
            <thead>
              <tr>
                <th class="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900 ">
                  Order Id
                </th>
                <th class="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900 ">
                  Email
                </th>
                <th
                  onClick={() => {
                    setFilterByPrice("");
                    setFilterByDate(() =>
                      FilterByDate === "asc" ? "desc" : "asc"
                    );
                  }}
                  class="cursor-pointer whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900 flex items-center gap-1"
                >
                  <span>Order Date</span>

                  <svg
                    aria-hidden="true"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.5"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                  >
                    <path
                      d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>
                  </svg>
                </th>
                <th class="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Order Status
                </th>
                <th
                  onClick={() => {
                    setFilterByDate("");
                    setFilterByPrice(() =>
                      FilterByPrice === "asc" ? "desc" : "asc"
                    );
                  }}
                  class=" flex gap-1 cursor-pointer whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900"
                >
                  <span>Net Amount</span>

                  <svg
                    aria-hidden="true"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.5"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                  >
                    <path
                      d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>
                  </svg>
                </th>
                <th class="px-4 py-2"></th>
              </tr>
            </thead>

            <tbody class="divide-y divide-gray-200">
              {Orders.filter((order) =>
                order.id.toLowerCase().includes(Keyword.toLowerCase())
              ).map((order, idx) => {
                IsDisabledStatusOption = false;
                return (
                  <tr className="hover:bg-gray-200 transition-all">
                    <td class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                      #{order["id"]}
                    </td>
                    <td class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                      {order["email"]}
                    </td>
                    <td class="whitespace-nowrap px-4 py-2 text-gray-700">
                      {convertMiliSecondsToDate(
                        order["status"].at(-1)["atTime"]
                      )}
                    </td>
                    <td class="whitespace-nowrap px-4 py-2 text-gray-700 ">
                      {order?.status.at(-1)["state"] === "Failed" ? (
                        <>Failed</>
                      ) : order?.status.at(-1)["state"] === "Delivered" ? (
                        <>Delivered</>
                      ) : (
                        <select
                          onChange={(e) => {
                            handleOrderStatus(e, order, idx);
                            console.log(e.target.value + " Coders");
                          }}
                          value={
                            SelectedStatus.length === 0
                              ? order?.status.at(-1)["state"]
                              : SelectedStatus
                          }
                        >
                          {_Statuses.map((status) => {
                            return (
                              <option
                                disabled={order?.["status"]
                                  .map((_) => _["state"])
                                  .includes(status)}
                                value={status}
                              >
                                {status}
                              </option>
                            );
                          })}
                        </select>
                      )}
                    </td>

                    <td class="whitespace-nowrap px-4 py-2 text-gray-700">
                      Rs:{order["netAmount"].toLocaleString("en-US")}
                    </td>
                    <td class="whitespace-nowrap px-4 py-2">
                      <button
                        // to={{pathname:`/orders/${order.id}`}}
                        onClick={() => navigateToOrderDetails(order)}
                        className="inline-block rounded bg-yellow-600 px-4 py-2 text-xs font-medium text-white transition-all   hover:bg-yellow-700"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </section>
  );
};

function OrdersNotFound() {
  return (
    <div className="text-center text-gray-600 mb-8">
      No Orders To Be Placed.{" "}
      <Link
        to="/products/All Products"
        className="text-yellow-600 hover:underline"
      >
        Shop now
      </Link>
      .
    </div>
  );
}

export default AllOrders;
