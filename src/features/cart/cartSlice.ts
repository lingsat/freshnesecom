import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "@Store/store";
import { ICartItem } from "@Cart/types/cart";

export interface ICartState {
  cart: ICartItem[];
}

const initialState: ICartState = {
  cart: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<ICartItem>) {
      state.cart.push(action.payload);
    },
    clearCart(state) {
      state.cart = [];
    },
  },
});

export const { addToCart, clearCart } = cartSlice.actions;

export const selectCart = (state: RootState) => state.cart;

export default cartSlice.reducer;
