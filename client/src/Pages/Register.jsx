import axios from "axios";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Context from "../Context/Context";

const Register = () => {
  const email = useRef(),
    username = useRef(),
    password = useRef();
  const {} = useContext(Context);

  // * If User Has Token Then Don't Give Access To This Route For The User
  useEffect(() => {
    // if (User.token) {
    //   router.push("/"); // * Throwing The User To '/' Each-Time Whenever He Tries To Go '/login'
    // }
  });

  const Submit = async (e) => {
    e.preventDefault();

    try {
      console.log(username.current, email.current, password.current);
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
  React.useEffect(() => {
    scrollTo(0, 0);
  }, []);
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
              Register your account
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
                  User Name
                </label>
                <input
                  ref={username}
                  id="username"
                  name="username"
                  type="text"
                  //   autoComplete="email"
                  required
                  className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-yellow-500 focus:outline-none focus:ring-yellow-500 sm:text-sm"
                  placeholder="User Name"
                />
              </div>
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
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  ref={password}
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-yellow-500 focus:outline-none focus:ring-yellow-500 sm:text-sm"
                  placeholder="Password"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-yellow-600 focus:ring-yellow-500"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-900"
                >
                  Remember me
                </label>
              </div>
            </div>

            <div>
              <button
                onClick={Submit}
                type="submit"
                className="group relative flex w-full justify-center rounded-md border border-transparent bg-yellow-600 py-2 px-4 text-sm font-medium text-white hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2"
              >
                <span className="absolute inset-y-0 left-0 flex items-center pl-3"></span>
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
