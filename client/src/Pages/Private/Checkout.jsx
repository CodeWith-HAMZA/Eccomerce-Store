import { serverTimestamp } from "firebase/firestore";
import React, { useContext } from "react";
import { Form, Navigate, useNavigate } from "react-router-dom";
import { showToast } from "../../constants/toastNotification";
import { Dialog, Transition } from "@headlessui/react";
import Context from "../../Context/Context";
import {
  addSingleDocument,
  getSingleDocumentById,
} from "../../firebase/firebaseMethods";
import Modal from "../../Modal";
import { calculateTotalAmountOfProducts } from "../../Utilities/CalculateSubtotal";

const Checkout = () => {
  const {
    IsCartOpened,
    setIsCartOpened,
    User,
    Cart,
    setProgress,
    isOpen,
    setIsOpen,
  } = useContext(Context);
  const [CheckOutForm, setCheckOutForm] = React.useState({});
  const nav = useNavigate();

  React.useEffect(() => {
    setIsCartOpened(false);
    scrollTo(0, 0);
    if (!User) {
    }
  }, []);

  const instantiateOrder = async (order) => {
    try{

      setProgress(10);
      
      // * Posting Order Into The DB(FireStore)
      const docId = await addSingleDocument(order, "orders");
      setProgress(100);
      
      nav(`/orders/${docId}`, {
        state: { order },
      });
      
      showToast(
        "success",
        "Initiated Your Order Successfully, Have Some Patience!"
        );
        
      }catch(err){
    
      }
      };
      const handleSubmit = async (e) => {
        e.preventDefault();
        
    
    setIsOpen(true);
    console.log(CheckOutForm, "ccc");
  };

  const handleChange = (e) => {
    setCheckOutForm({
      ...CheckOutForm,
      [e.target.name]: e.target.value,
    });
  }; 
  return (
    <section className="text-gray-600 body-font relative h-screen pt-14">
      <Modal
        title={"Confirm Order?"}
        paragraph="Please review your order details carefully before confirming."
      >
        {" "}
        <div className="mt-4">
          <button
            type="button"
            className="inline-flex justify-center rounded-md border border-transparent bg-gray-100 px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2"
            onClick={() => {
              setProgress(0)
              setIsOpen(false);
            }}
          >
            Cancel
          </button>
          <button
            type="button"
            className="inline-flex justify-center rounded-md border border-transparent bg-gray-100 px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2"
            onClick={() => {
              setIsOpen(false);
              const order = {
                ...CheckOutForm,
                orderItems: Cart,
                status: ["Placed"],
                netAmount: calculateTotalAmountOfProducts(Cart),
              };
              instantiateOrder(order);
              console.log("Order Posted")
            }}
          >
            Confirm
          </button>
        </div>
      </Modal>

      <div>
        <h1 class="sr-only">Checkout</h1>

        <div class="mx-auto grid max-w-screen-2xl grid-cols-1 md:grid-cols-2">
          <div class="bg-gray-50 py-6 md:py-24">
            <div class="mx-auto max-w-lg space-y-4 px-4 lg:px-8">
              <div class="flex items-center gap-4">
                <span class="h-4 w-4 rounded-full bg-yellow-700"></span>
                <h2 class="font-medium text-gray-900">Order Items</h2>
              </div>

              <div>
                <p class="text-2xl font-medium tracking-tight text-gray-900">
                  Net Amount:{" "}
                  <span>{calculateTotalAmountOfProducts(Cart)} Rs</span>
                </p>

                <p class="mt-1 text-sm text-gray-600">For the purchase of</p>
              </div>

              <div>
                <div class="flow-root">
                  <ul class="-my-4 divide-y divide-gray-100 ">
                    {Cart &&
                      Cart.map(
                        ({
                          title,
                          price,
                          image,
                          category,
                          quantity,
                          size,
                          color,
                        }) => (
                          <li class="flex items-center gap-4 py-4 shadow-sm">
                            <img
                              src={image}
                              alt=""
                              class="h-16 w-16 rounded object-cover"
                            />

                            <div>
                              <h3 class="text-sm text-gray-900">{title}</h3>

                              <dl class="mt-0.5 space-y-px text-[10px] text-gray-600">
                                <div>
                                  <dt class="inline">Quantity:</dt>
                                  <dd class="inline">{quantity}</dd>
                                </div>
                                <div>
                                  <dt class="inline">Size:</dt>
                                  <dd class="inline">{size}</dd>
                                  {", "}
                                  <dt class="inline">Color:</dt>
                                  <dd class="inline">{color}</dd>
                                </div>
                                <div>
                                  <dt class="inline">Price:</dt>
                                  <dd class="inline">{price} Rs</dd>
                                </div>
                              </dl>
                            </div>
                          </li>
                        )
                      )}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div class="bg-white py-12 md:py-24">
            <div class="mx-auto max-w-lg px-4 lg:px-8">
              <form onSubmit={handleSubmit} class="grid grid-cols-6 gap-4">
                <div class="col-span-3">
                  <label
                    for="FirstName"
                    class="block text-xs font-medium text-gray-700"
                  >
                    First Name
                  </label>

                  <input
                    onChange={handleChange}
                    value={CheckOutForm.firstName}
                    name={"firstName"}
                    type="text"
                    id="FirstName"
                    class="p-2 mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
                  />
                </div>

                <div class="col-span-3">
                  <label
                    for="LastName"
                    class="block text-xs font-medium text-gray-700"
                  >
                    Last Name
                  </label>

                  <input
                    onChange={handleChange}
                    value={CheckOutForm.lastName}
                    name={"lastName"}
                    type="text"
                    id="LastName"
                    class="p-2 mt-1 t-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
                  />
                </div>

                <div class="col-span-6">
                  <label
                    for="Email"
                    class="block text-xs font-medium text-gray-700"
                  >
                    Email
                  </label>

                  <input
                    onChange={handleChange}
                    value={CheckOutForm.email}
                    name={"email"}
                    type="email"
                    id="Email"
                    class="p-2 mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
                  />
                </div>
                <div class="col-span-6">
                  <label
                    for="address"
                    class="block text-xs font-medium text-gray-700"
                  >
                    Address* :
                  </label>

                  <textarea
                    rows={5}
                    name="address"
                    id="address"
                    value={CheckOutForm.description}
                    onChange={handleChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Address (In Detail)"
                  />
                </div>

                <div class="col-span-6">
                  <label
                    for="Phone"
                    class="block text-xs font-medium text-gray-700"
                  >
                    Phone
                  </label>

                  <input
                    onChange={handleChange}
                    type="tel"
                    value={CheckOutForm.phone}
                    name={"phone"}
                    id="Phone"
                    class="p-2 mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
                  />
                </div>

                <div class="col-span-3">
                  <label
                    for="postalCode"
                    class="block text-xs font-medium text-gray-700"
                  >
                    Postal Code
                  </label>

                  <input
                    value={CheckOutForm.postalCode}
                    onChange={handleChange}
                    type="text"
                    id="postalCode"
                    class="p-2 mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
                    name="postalCode"
                  />
                </div>

                <div class="col-span-3">
                  <label
                    for="Location"
                    class="block text-xs font-medium text-gray-700"
                  >
                    Location (City In Pakistan)
                  </label>

                  <input
                    value={CheckOutForm.location}
                    name={"location"}
                    onChange={handleChange}
                    type="text"
                    id="Location"
                    class="p-2 mt-1 t-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
                  />
                </div>

                {/* <fieldset class="col-span-6">
                  <legend class="block text-sm font-medium text-gray-700">
                    Card Details
                  </legend>

                  <div class="mt-1 -space-y-px rounded-md bg-white shadow-sm">
                    <div>
                      <label for="CardNumber" class="sr-only">
                        {" "}
                        Card Number{" "}
                      </label>

                      <input
                        type="text"
                        id="CardNumber"
                        placeholder="Card Number"
                        class="relative mt-1 w-full rounded-t-md border-gray-200 focus:z-10 sm:text-sm"
                      />
                    </div>

                    <div class="flex">
                      <div class="flex-1">
                        <label for="CardExpiry" class="sr-only">
                          {" "}
                          Card Expiry{" "}
                        </label>

                        <input
                          type="text"
                          id="CardExpiry"
                          placeholder="Expiry Date"
                          class="relative w-full rounded-es-md border-gray-200 focus:z-10 sm:text-sm"
                        />
                      </div>

                      <div class="-ms-px flex-1">
                        <label for="CardCVC" class="sr-only">
                          {" "}
                          Card CVC{" "}
                        </label>

                        <input
                          type="text"
                          id="CardCVC"
                          placeholder="CVC"
                          class="relative w-full rounded-ee-md border-gray-200 focus:z-10 sm:text-sm"
                        />
                      </div>
                    </div>
                  </div>
                </fieldset> */}

                {/* <fieldset class="col-span-6">
                  <legend class="block text-sm font-medium text-gray-700">
                    Billing Address
                  </legend>

                  <div class="mt-1 -space-y-px rounded-md bg-white shadow-sm">
                    <div>
                      <label for="Country" class="sr-only">
                        Country
                      </label>

                      <select
                        id="Country"
                        class="relative w-full rounded-t-md border-gray-200 focus:z-10 sm:text-sm"
                      >
                        <option>England</option>
                        <option>Wales</option>
                        <option>Scotland</option>
                        <option>France</option>
                        <option>Belgium</option>
                        <option>Japan</option>
                      </select>
                    </div>

                    <div>
                      <label class="sr-only" for="PostalCode">
                        {" "}
                        ZIP/Post Code{" "}
                      </label>

                      <input
                        type="text"
                        id="PostalCode"
                        placeholder="ZIP/Post Code"
                        class="relative w-full rounded-b-md border-gray-200 focus:z-10 sm:text-sm"
                      />
                    </div>
                  </div>
                </fieldset> */}

                <div class="col-span-6">
                  <button
                    type="submit"
                    class="block w-full rounded-md  bg-yellow-600 p-2.5 text-sm text-white transition hover:shadow-lg"
                    // onClick={() => initiateOrderPosting()}
                  >
                    Make Order{" "}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Checkout;
