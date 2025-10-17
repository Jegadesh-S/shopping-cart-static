import { createSlice } from "@reduxjs/toolkit";
import { ADD_ITEM_TO_CART } from "../utils/constants";

const initialState = {
  cartItems: [],
  allProductSelectedStatus: true,
};

const option = {
  name: "cart",
  initialState,
  reducers: {
    updateItemToCart: (state, action) => {
      const { thisItem, operation } = action.payload;
      let cartItemIndex = state.cartItems.findIndex(
        (item) => item.id == thisItem.id
      );
      if (cartItemIndex == -1) {
        state.cartItems = [
          ...state.cartItems,
          { ...thisItem, productCount: 1, isSelectedForCart: true },
        ];
      } else {
        let { productCount } = state.cartItems[cartItemIndex];
        productCount =
          operation == ADD_ITEM_TO_CART ? productCount + 1 : productCount - 1;

        state.cartItems[cartItemIndex].productCount = productCount;
      }
    },
    removeItemFromCart: (state, action) => {
      const id = action.payload;
      state.cartItems = state.cartItems.filter((cartItem) => cartItem.id != id);
    },

    updateAllProductsSelectedStatusFromCart: (state, action) => {
      state.cartItems = state.cartItems.map((cartItem) => {
        return {
          ...cartItem,
          isSelectedForCart: action.payload,
        };
      });
      state.allProductSelectedStatus = action.payload;
    },

    updateSelectedProductStatusToCart: (state, action) => {
      const { id, isChecked } = action.payload;
      let cartItemIndex = state.cartItems.findIndex((item) => item.id == id);
      state.cartItems[cartItemIndex].isSelectedForCart = isChecked;

      // chcek if any product is not selected
      if (state.cartItems.find((product) => !product.isSelectedForCart))
        state.allProductSelectedStatus = false;
      else state.allProductSelectedStatus = true;
    },
  },
};

const cartSlice = createSlice(option);

export const {
  updateItemToCart,
  removeItemFromCart,
  updateAllProductsSelectedStatusFromCart,
  updateSelectedProductStatusToCart,
} = cartSlice.actions;

export default cartSlice.reducer;
