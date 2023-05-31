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
      state.cart = [action.payload, ...state.cart];
    },
    setCartItemCount(
      state,
      action: PayloadAction<{
        prodId: string;
        amount: number;
        category: string;
      }>
    ) {
      state.cart = state.cart.map((item) => {
        const { prodId, amount, category } = action.payload;
        return item.product.id === prodId
          ? { ...item, amount, category }
          : item;
      });
    },
    removeSingleCartItem(state, action: PayloadAction<string>) {
      state.cart = state.cart.filter(
        (item) => item.product.id !== action.payload
      );
    },
    clearCart(state) {
      state.cart = [];
    },
  },
});

export const { addToCart, removeSingleCartItem, setCartItemCount, clearCart } =
  cartSlice.actions;

export const selectCart = (state: RootState) => state.cart;

export default cartSlice.reducer;
