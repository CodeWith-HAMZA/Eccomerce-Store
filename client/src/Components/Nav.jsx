import { async } from "@firebase/util";
import { getMultiFactorResolver, signOut } from "firebase/auth";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { decreaseQty, increaseQty, removeItemFromCart } from "../App/cartSlice";
import Context from "../Context/Context";
import { auth } from "../firebase/firebase";
import { getMultipleDocs } from "../firebase/firebaseMethods";
import { calculateTotalAmountOfProducts } from "../Utilities/CalculateSubtotal";
import AccountDropdown from "./AccountDropdown";
import Dropdown from "./Dropdown";
import Dropdown2 from "./Dropdown2";
const Nav = () => {
  const [IsMenuOpened, setIsMenuOpened] = React.useState(false);
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const {
    IsCartOpened,
    setIsCartOpened,
    Cart,
    setCart,
    setInLC,
    User,
    setUser,
    setProducts,
    Products,
    Categories,
    setCategories,
  } = React.useContext(Context);

  const [SubTotal, setSubTotal] = React.useState();
  const nav = useNavigate();

  const CloseCart = () => {
    setIsCartOpened(false);
  };
  const OpenCart = () => {
    setIsCartOpened(true);
  };
  React.useEffect(() => {
    const subTotal = calculateTotalAmountOfProducts(Cart);
    console.log(subTotal, cart);
    setSubTotal(subTotal);
  }, [IsCartOpened, Cart]);

  React.useEffect(() => {
    (async () => {
      const products = await getMultipleDocs("products");
      setCategories(
        [...new Set(products?.map((product) => product.category))].map(
          (category) => {
            return {
              name: category,
              url: `/products/${category}`,
            };
          }
        )
      );
    })();
  }, []);

  const RemoveCartItem = (index, productId) => {
    const newCart = Cart.filter((_) => _.productId !== productId);
    setCart(newCart);
    setInLC("myCart", newCart);
  };

  const qtyIncreament = (productId, stock) => {
    const cart = Cart;
    // dispatch(increaseQty({productId, stock})) // * Handling Redux

    for (let i = 0; i < cart.length; i++) {
      if (cart[i]["productId"] === productId) {
        if (cart[i]["quantity"] < stock) cart[i]["quantity"]++;
      }
    }
    setCart([...cart]);
    setInLC("myCart", [...cart]);
  };
  const qtyDecreament = (productId, stock) => {
    const cart = Cart;
    // dispatch(decreaseQty({productId, stock})) // * Handling Redux
    for (let i = 0; i < cart.length; i++) {
      if (cart[i]["productId"] === productId) {
        if (cart[i]["quantity"] > 1) cart[i]["quantity"]--;
      }
    }
    setCart([...cart]);
    setInLC("myCart", [...cart]);
  };

  // * Open Responsive Menu
  const OpenMenu = () => {
    setIsMenuOpened(true);
  };

  // * Sign Out The User or End The User-Session
  const SignOutHandler = () => {
    signOut(auth);
    setUser(null);
  };

  return (
    <>
      <header
        className={`${
          location.pathname.includes("/admin") ? "hidden" : ""
        } fixed w-[100%] z-10   bg-white shadow-md text-gray-600 body-font `}
      >
        <div className="container  mx-auto flex flex-wrap p-5 md:px-0 items-center justify-between ">
          <Link
            to={"/"}
            className=" flex font-medium items-center text-gray-900 mb-4 md:mb-0 cursor-pointer relative z-30"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="w-10 h-10 text-white p-2 bg-yellow-500 rounded-full"
              viewBox="0 0 24 24"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
            </svg>
            <span className="ml-3 text-xl font-extralight">Shop Name</span>
          </Link>

          {/* Toggle Menu  */}
          <div
            onClick={() => setIsMenuOpened(!IsMenuOpened)}
            className="md:hidden cursor-pointer bg-gray-50"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </div>

          {/* Navigation  */}
          <nav
            id={IsMenuOpened ? "ResponsiveNav" : ""}
            className=" transition-all gap-3  hidden md:ml-auto md:flex flex-wrap items-center text-base justify-center "
          >
            <Link to={"/"} className="mr-5 hover:text-gray-900">
              Home
            </Link>
            <Dropdown2
              dropdownName={"Shop"}
              logo={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-3.5 h-3.5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                  />
                </svg>
              }
              list={[
                { name: "All Products", url: "/products/All Products" },
                ...(Categories && Categories),
              ]}
            />

            <NavLink to={"/"} className="mr-5 hover:text-gray-900">
              About
            </NavLink>
            <NavLink to={"/contact"} className="mr-5 hover:text-gray-900">
              Contact Us
            </NavLink>

            <div className="flex flex-col md:flex-row items-center gap-2 ">
              {User ? (
                <div className="bg-gray-100 hover:bg-gray-100 rounded-full pr-1.5 pl-0.5   pb-1   ">
                  <Dropdown2
                    forAccount={true}
                    SignOutHandler={SignOutHandler}
                    logo={
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    }
                    list={[
                      { name: "Your Profile", url: "/profile" },
                      { name: "Your Orders", url: "/orders" },
                      { name: "Logout", url: "/" },
                    ]}
                  />
                </div>
              ) : (
                <NavLink
                  to={"/login"}
                  className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0 "
                >
                  Login{" "}
                </NavLink>
              )}
              <button
                onClick={OpenCart}
                className={`${
                  location.pathname.includes("/checkout") ? "hidden" : ""
                } inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0`}
              >
                {" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                  />
                </svg>
              </button>
            </div>
          </nav>
        </div>
      </header>
      <section id="Cart" className={`${IsCartOpened ? "block" : "hidden"} `}>
        <div
          className="relative z-10"
          aria-labelledby="slide-over-title"
          role="dialog"
          aria-modal="true"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div
                className={`transition-all ${
                  IsCartOpened ? "translate-x-0" : "translate-x-[28rem]"
                } pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10`}
              >
                <div className="pointer-events-auto w-screen max-w-md">
                  <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                    <div className="flex-1 overflow-y-auto py-6 px-4 sm:px-6">
                      <div className="flex items-start justify-between">
                        <h2
                          className="text-lg font-medium text-gray-900"
                          id="slide-over-title"
                        >
                          Shopping cart
                        </h2>
                        <div
                          onClick={CloseCart}
                          className="ml-3 flex h-7 items-center"
                        >
                          <button
                            type="button"
                            className="-m-2 p-2 text-gray-400 hover:text-gray-500"
                          >
                            <span className="sr-only">Close panel</span>
                            <svg
                              className="h-6 w-6"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              stroke="currentColor"
                              aria-hidden="true"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6 18L18 6M6 6l12 12"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>

                      <div className="mt-8">
                        <div className="flow-root">
                          <ul
                            role="list"
                            className="-my-6 divide-y divide-gray-200"
                          >
                            {Cart.length !== 0 ? (
                              Cart.map((cartItem, index) => (
                                <li className="flex py-6">
                                  <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                    <img
                                      src={cartItem.image}
                                      alt="Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt."
                                      className="h-full w-full object-cover object-center"
                                    />
                                  </div>

                                  <div className="ml-4 flex flex-1 flex-col">
                                    <div>
                                      <div className="flex justify-between text-base font-medium text-gray-900">
                                        <h3>
                                          <span>{cartItem.name}</span>
                                        </h3>
                                        <p className="ml-4">
                                          Rs: {cartItem.price}
                                        </p>
                                      </div>
                                      <p className="mt-1 text-sm text-gray-500">
                                        {cartItem.category}
                                      </p>
                                    </div>
                                    <div className="flex flex-1 items-end justify-between text-sm">
                                      Quantity:
                                      <p className="text-gray-500">
                                        <button
                                          onClick={() =>
                                            qtyIncreament(
                                              cartItem.productId,
                                              cartItem.stock
                                            )
                                          }
                                          className=" bg-gray-100 rounded-md px-3 py-1 mx-2 hover:bg-slate-200"
                                        >
                                          +
                                        </button>
                                        {cartItem.quantity}
                                        <button
                                          onClick={() =>
                                            qtyDecreament(cartItem.productId)
                                          }
                                          className=" bg-gray-100 rounded-md px-3 py-1 mx-2 hover:bg-slate-200"
                                        >
                                          -
                                        </button>
                                      </p>
                                      <div className="flex">
                                        <button
                                          onClick={() =>
                                            RemoveCartItem(
                                              index,
                                              cartItem.productId
                                            )
                                          }
                                          type="button"
                                          className="font-medium text-yellow-600 hover:text-indigo-500"
                                        >
                                          Remove
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </li>
                              ))
                            ) : (
                              <li>Bucket Is Empty!</li>
                            )}
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <p>Subtotal</p>
                        <p>Rs: {SubTotal}</p>
                      </div>
                      <p className="mt-0.5 text-sm text-gray-500">
                        Shipping and taxes calculated at checkout.
                      </p>
                      <div className="mt-6">
                        <button
                          disabled={Cart.length === 0}
                          className="block w-full rounded-md border border-transparent bg-yellow-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-yellow-700"
                          onClick={() => nav("/checkout")}
                        >
                          Checkout
                        </button>
                      </div>
                      <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                        <p>
                          or
                          <button
                            type="button"
                            onClick={CloseCart}
                            className="font-medium text-yellow-600 hover:text-yellow-500"
                          >
                            Continue Shopping
                            <span aria-hidden="true"> &rarr;</span>
                          </button>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Nav;
