import { useState } from "react";
import { showToast } from "../constants/toastNotification";
import { getLocalStorage, setLocalStorage } from "../Utilities/LocalStorage";
import Context from "./Context";

const State = ({ children }) => {
  const [Cart, setCart] = useState([]);
  const [progress, setProgress] = useState(0);
  const [Products, setProducts] = useState([]);
  const [Sizes, setSizes] = useState(["SM", "MD", "LG", "XL", "XLL"]);
  const [Colors, setColors] = useState(["Red", "Yellow", "Green", "Brown"]);

  const [IsCartOpened, setIsCartOpened] = useState(false);
  const [SelectedColor, setSelectedColor] = useState("");
  const [SelectedSize, setSelectedSize] = useState("");
  const [User, setUser] = useState(null);
  const [Categories, setCategories] = useState([]);
  let [isOpen, setIsOpen] = useState(false);
  const [ProfileData, setProfileData] = useState({});

  // * Update Or Set LC (Local-Storage)
  function setInLC(LCname, data) {
    localStorage.setItem(LCname, JSON.stringify(data));
    return data;
  }
  function getFromLC(LCname) {
    const data = JSON.parse(localStorage.getItem(LCname));
    return data;
  }

  const AddToCart = (
    name,
    description,
    image,
    category,
    price,
    productId,
    stock,
    size,
    color,
    quantity
  ) => {
    const cart = getLocalStorage("myCart"); // * Get Cart From LC
    const cartItem = {
      name,
      description,
      image,
      category,
      price,
      productId,
      stock,
      size,
      color,
      quantity,
    };
    // dispatch(addItemToCart(cartItem)); // * Handling Redux

    // * If Cart Doesn't Exist In LC, Create a New-Cart With One Single cartItem(Product )
    if (cart) {
      let isCartItemAlreadyExists = false;
      cart.forEach((_) => {
        // * If The cartItem Already Exist In Our Cart Or Not?
        if (_["productId"] === cartItem["productId"]) {
          isCartItemAlreadyExists = true;

          // * Increase Its Quantity Only If Its {{Quantity}} Is Lesser Than The {{Stock}}
          if (_["quantity"] < cartItem["stock"])
            _["quantity"]++; // * Increase Its Quantity By 1
          else showToast("error", "Out Of Stock Now!");
          setCart([...cart]); // *  Updating Cart-State
          setLocalStorage("myCart", [...cart]); // * Updating In LC
        }
      });
      if (!isCartItemAlreadyExists) {
        showToast("success", "Successfully Item Added To Cart");

        // * Append A Single Cart-Item In The Cart
        setCart([...cart, cartItem]); // * Updating Cart-State
        setLocalStorage("myCart", [...cart, cartItem]); // * Updating In LC
      }
      console.log("Unique Item Founde and cart wasn't Empty");
    } else {
      // * If Cart Is Empty, Add The Single cartItem(Product)
      setCart([cartItem]); // * Updating In Cart-State
      setLocalStorage("myCart", [cartItem]); // * Updating In LC
      console.log("Cart was Empty");
    }
  };
  return (
    <Context.Provider
      value={{
        Cart,
        setCart,
        progress,
        setProgress,
        Products,
        setProducts,
        IsCartOpened,
        setIsCartOpened,
        SelectedColor,
        setSelectedColor,
        SelectedSize,
        setSelectedSize,
        setInLC,
        getFromLC,
        User,
        setUser,
        AddToCart,
        Sizes,
        setSizes,
        Colors,
        setColors,
        Categories,
        setCategories,
        isOpen,
        setIsOpen,
        ProfileData,
        setProfileData,
      }}
    >
      {{ ...children }}
    </Context.Provider>
  );
};

export default State;
