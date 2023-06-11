import axios from "axios";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import GoogleSigninButton from "../Components/GoogleSigninButton";
import { showToast } from "../constants/toastNotification";
import Context from "../Context/Context";
import { auth } from "../firebase/firebase";
import {
  addSingleDocument,
  getMultipleDocs,
} from "../firebase/firebaseMethods";

const Login = ({}) => {
  const nav = useNavigate();
  const email = useRef(),
    password = useRef();
  const { User } = useContext(Context);

  // * If User Has Token Then Don't Give Access To This Route For The User
  useEffect(() => {
    if (User) {
      nav("/"); // * Throwing The User To '/' Each-Time Whenever He Tries To Go '/login'
    }
  });

  const Submit = async (e) => {
    e.preventDefault();

    try {
      localStorage.setItem("token", data.token);
    } catch ({ response: { data } }) {}
  };

  const signInHandler = async () => {
    const provider = new GoogleAuthProvider();

    try {
      const { user } = await signInWithPopup(auth, provider);

      const { uid, photoURL, displayName, email, emailVerified, accessToken } =
        user;

      const docs = await getMultipleDocs("users");
      for (const doc of docs) {
        if (doc.uid === uid && doc.email === email) {
          showToast("success", "Successfully SignedIn");
          nav("/");
          return;
        }
      }
      console.log("agaya neechy");

      await addSingleDocument(
        {
          uid,
          name: displayName,
          email,
          password: "",
          // photoURL: photoURL,
          admin: false,
        },
        "users"
      );
    } catch (err) {
      console.log("Error While Signin", err);
      showToast("error", "Error Occured While Signin");
    }
    // showToast("success", "Successfully Signined");
    // nav("/");
  };

  React.useEffect(() => {
    scrollTo(0, 0);
  }, []);
  return (
    <>
      <div className="h-[0rem] ">alert area </div>
      <div className="flex min-h-screen items-center justify-center py-4 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div>
            {/* <img
              className="mx-auto h-12 w-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=red&shade=600"
              alt="Your Company"
            /> */}
            <h2
              onClick={() => {
                console.log(User);
              }}
              className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900"
            >
              Sign in to your account
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Or{" "}
              <Link to={"/register"}>
                <a className="font-medium text-yellow-600 hover:text-yellow-500">
                  Sign Up
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

              <div className="text-sm">
                <Link to={"/recoverpassword"}>
                  <a className="font-medium text-yellow-600 hover:text-yellow-500">
                    Forgot your password?
                  </a>
                </Link>
              </div>
            </div>

            <div>
              <button
                onClick={Submit}
                type="submit"
                className="group relative flex w-full justify-center rounded-md border border-transparent bg-yellow-600 py-2 px-4 text-sm font-medium text-white hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2"
              >
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 "></span>
                Sign in
              </button>
            </div>
            {/* <div className="flex justify-center items-center">
              <span>Or</span>
            </div> */}
            <div onClick={() => signInHandler()}>
              <GoogleSigninButton />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
