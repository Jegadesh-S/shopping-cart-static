import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./productSlice";
import cartReducer from "./cartSlice";

const eeShoppingCartStore = configureStore({
  reducer: {
    products: productReducer,
    cart: cartReducer,
  },
});

export default eeShoppingCartStore;
