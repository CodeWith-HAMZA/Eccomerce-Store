import axios from "axios";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Context from "../Context/Context";

const ForgetPassword = () => {
  const email = useRef();
  const {} = useContext(Context);

  // * If User Has Token Then Don't Give Access To This Route For The User
  useEffect(() => {
    // if (User.token) {
    //   router.push("/"); // * Throwing The User To '/' Each-Time Whenever He Tries To Go '/login'
    // }
  });
  React.useEffect(() => {
    scrollTo(0,0);
  }, [ ]);

  const Submit = async (e) => {
    e.preventDefault();

    try {
      console.log(email.current);
      //   // * Axios-POST-Request -login-api
      //   const { data } = await axios.post(`${process.env.NEXT_PUBLIC_HOST}/api/login`, {
      //     email: email.current.value,
      //     password: password.current.value,
      //   });
    } catch ({ response: { data } }) {
      //   setServerResponse(data);  // * Holding The Response-Object From The "Server"
      //   showAlert("Error");
      //   console.log(data);
    }
  };

  return (
    <>
      <div className="h-[4rem] ">{/* alert area  */}</div>
      <div className="flex min-h-full items-center justify-center py-4 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div>
            {/* <img
              className="mx-auto h-12 w-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=red&shade=600"
              alt="Your Company"
            /> */}
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              Recover Your Password
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Or{" "}
              <Link to={"/login"}>
                <a className="font-medium text-yellow-600 hover:text-yellow-500">
                  Sign In
                </a>
              </Link>
            </p>
          </div>
          <form className="mt-8 space-y-6" action="#" method="POST">
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="-space-y-px rounded-md shadow-sm">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  ref={email}
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-yellow-500 focus:outline-none focus:ring-yellow-500 sm:text-sm"
                  placeholder="Email address"
                />
              </div>
            </div>

            <div>
              <button
                onClick={Submit}
                type="submit"
                className="group relative flex w-full justify-center rounded-md border border-transparent bg-yellow-600 py-2 px-4 text-sm font-medium text-white hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2"
              >
                <span className="absolute inset-y-0 left-0 flex items-center pl-3"></span>
                Reset Password Request
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ForgetPassword;
