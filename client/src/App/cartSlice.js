import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [], 
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    initCart: (state, action) => {
      console.log(state.cart ,action.payload, 'wah reh bete')
      state.cart = action.payload;
    },
    addItemToCart: (state, action) => {
      let alreadyExists = false;

      for (const cartItem of state.cart) {
        if (cartItem["productId"] === action.payload["productId"]) {
          alreadyExists = true;

          if (cartItem["quantity"] < 8) {
            cartItem["quantity"]++;
          }
        }
      }

      // * If Item Is Unique In The Cart, Append It To The Cart
      if (!alreadyExists) {
        state.cart = [...state.cart, action.payload];
      }

       
      localStorage.setItem('myCart', JSON.stringify(state.cart));

      console.log(state?.cart, 'this is cart')
      
        
    },

    increaseQty: (state, action) => {
      state.cart.forEach(cartItem => {

        if (
          cartItem["productId"] === action.payload["productId"] &&
          cartItem["quantity"] < action.payload["stock"]
        ) {
          cartItem["quantity"]++;
        }
      })
      // for (const cartItem of state.cart) {
      //   if (
      //     cartItem["productId"] === action.payload["productId"] &&
      //     cartItem["quantity"] < action.payload["stock"]
      //   ) {
      //     cartItem["quantity"]++;
      //   }
      // }
      localStorage.setItem('myCart', JSON.stringify(state.cart));
    },


    decreaseQty: (state, action) => {
      state.cart.forEach((cartItem, index) => {
        if (
          cartItem["productId"] === action.payload["productId"] &&
          cartItem["quantity"] > 1
        ) {
          cartItem["quantity"]--;
        }
      })
      // for (const cartItem of state.cart) {
      //   if (
      //     cartItem["productId"] === action.payload["productId"] &&
      //     cartItem["quantity"] > 1
      //   ) {
      //     cartItem["quantity"]--;
      //   }
      // }
      localStorage.setItem('myCart', JSON.stringify(state.cart));
    },
    removeItemFromCart: (state, action) => {
      for (const cartItem of state.cart) {
        if (cartItem["productId"] === action.payload["productId"]) {
          state.cart = state.cart.filter(
            (cartItem) => cartItem["productId"] !== action.payload["productId"]
          );
        }
      }
      localStorage.setItem('myCart', JSON.stringify(state.cart));
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  initCart,
  addItemToCart,
  decreaseQty,
  increaseQty,
  removeItemFromCart,
} = cartSlice.actions;

export default cartSlice.reducer;
