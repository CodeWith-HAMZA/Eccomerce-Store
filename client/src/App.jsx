import "./App.css";
import React, { useContext, useEffect, useState } from "react";
import { Link, Navigate, Route, Routes, useNavigate } from "react-router-dom";
import FeatureProducts from "./Components/FeatureProducts";
import Nav from "./Components/Nav";
import Contactus from "./Pages/Contactus";
import Home from "./Pages/Home";
import ProductDetails from "./Pages/ProductDetails";
import Products from "./Pages/Products";
import LoadingBar from "react-top-loading-bar";
import Context from "./Context/Context";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import ForgetPassword from "./Pages/ForgetPassword";
import Checkout from "./Pages/Private/Checkout";
import BottomNav from "./Components/BottomNav";
import Dropdown from "./Components/Dropdown";
import AdminPanel from "./Pages/Private/AdminPanel";
import Notfound from "./Pages/Error/Notfound";
import { useSelector, useDispatch } from "react-redux";
import { initCart } from "./App/cartSlice";
import Footer from "./Components/Footer";
import UserOrders from "./Pages/Private/UserOrders";

import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { auth, db } from "./firebase/firebase";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocFromCache,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { addSingleDocument, getMultipleDocs } from "./firebase/firebaseMethods";
import UserProfile from "./Pages/Private/UserProfile";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { showToast } from "./constants/toastNotification";
import Typewriter from "typewriter-effect";
import ProductCard from "./Components/ProductCard/ProductCard";
import CreateProduct from "./Pages/Private/Admin/CreateProduct";
import AllProducts from "./Pages/Private/Admin/AllProducts";
import AdminSideNav from "./Pages/Private/Admin/AdminSideNav";
import DashboardHome from "./Pages/Private/Admin/DashboardHome";
import AllOrders from "./Pages/Private/Admin/AllOrders";
import Modal from "./Modal";
import Productss from "./Pages/Productss";
import About from "./Pages/About";
import OrderDetails from "./Pages/Private/OrderDetails";
import Forbidden from "./Pages/Error/Forbidden";
import ReactQuery from "./ReactQuery";
import { getLocalStorage } from "./Utilities/LocalStorage";
function App() {
  const { progress, setProgress, setCart, setUser, User } = useContext(Context);

  // const cart = useSelector((state) => state.cart);
  // const dispatch = useDispatch();

  useEffect(() => {
    // * Firstly, Initializing The {{Cart-State}} From {{Local-Storage}}
    // dispatch(initCart(getFromLC('myCart') || []))

    setCart(getLocalStorage("myCart") || []);

    const unSubscribe = onAuthStateChanged(auth, (userData) => {
      // * Setting state with user's  Account Related-Data
      // console.log(userData);
      setUser(userData);
    });

    return () => {
      unSubscribe();
    };
  }, []);

  const ProtectedRoute = (ProtectedComponent) => {
    if (User) {
      return ProtectedComponent;
    }

    return <Navigate to={"/login"} />;
  };
  const AdminProtectedRoute = (AdminProtectedComponent) => {
    if (true) {
      return AdminProtectedComponent;
    }

    return <Navigate to={"admin/login"} />;
  };

  return (
    <>
      <LoadingBar
        color="#f11946"
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
      {/* <ToastContainer
        position="top"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      /> */}
      <Nav />
      <Routes>
        <Route key={"kueee,y1"} path="/about" element={<About />} />
        <Route key={"kuee,y1"} path="/p" element={<Productss />} />
        <Route key={"kue,y1"} path="/try" element={<Modal />} />
        <Route key={"ke,y1"} path="/pc" element={<ProductCard />} />
        <Route key={"key1"} path="/" element={<Home />} />
        <Route
          key={"key2"}
          path="/products/:productType/"
          element={<Products />}
        />
        <Route
          key={"key3"}
          path="/products/:productType/:productId"
          element={<ProductDetails />}
        />
        <Route key={"key4"} path="/contact" element={<Contactus />} />
        <Route key={"key9"} path="/login" element={<Login />} />
        <Route key={"key10"} path="/register" element={<Register />} />
        <Route
          key={"key6"}
          path="/recoverpassword"
          element={<ForgetPassword />}
        />
        <Route
          key={"key7"}
          path="/checkout"
          element={ProtectedRoute(<Checkout />)}
        />
        <Route
          key={"key8"}
          path="/admin"
          element={
            <>
              <AdminPanel />
            </>
          }
        />
        <Route key={"key9"} path="/notfound" element={<Notfound />} />
        <Route key={"key9"} path="/forbidden" element={<Forbidden />} />
        <Route key={"key9"} path="*" element={<Navigate to={"/notFound"} />} />

        <Route
          key={"key2e"}
          path="/orders"
          element={ProtectedRoute(<UserOrders />)}
        />
        <Route
          key={"key2e"}
          path="/profile"
          element={ProtectedRoute(<UserProfile />)}
        />

        <Route
          key={"ord"}
          path="/orders/:orderId"
          element={ProtectedRoute(<OrderDetails />)}
        />
        <Route
          key={"keey2e"}
          path="/admin/products/new"
          element={AdminProtectedRoute(<CreateProduct />)}
        />
        <Route
          key={"keey2e"}
          path="/admin/dashboard"
          element={AdminProtectedRoute(<DashboardHome />)}
        />
        <Route
          key={"keey2e"}
          path="/admin/products"
          element={AdminProtectedRoute(<AllProducts />)}
        />
        <Route
          key={"keey2e"}
          path="/admin/orders"
          element={AdminProtectedRoute(<AllOrders />)}
        />
        <Route
          key={"ord"}
          path="/admin/orders/:orderId"
          element={AdminProtectedRoute(<OrderDetails />)}
        />
        <Route key={"u"} path="/query" element={<ReactQuery />} />
      </Routes>
      <BottomNav />
      <AdminSideNav />
      <Footer />
    </>
  );
}

export default App;
