import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
  SerializedError,
} from "@reduxjs/toolkit";
import axios from "axios";

import { RootState } from "@Store/store";
import { ICartItem } from "@Cart/types/cart";
import { IProduct } from "@Products/types/product";

export interface ICartState {
  cart: ICartItem[];
  cartProducts: IProduct[];
  isCartLoading: boolean;
  cartError: SerializedError | null;
}

const initialState: ICartState = {
  cart: [],
  cartProducts: [],
  isCartLoading: false,
  cartError: null,
};

export const fetchCartProducts = createAsyncThunk(
  "cart/fetchCartProducts",
  async (cartItemArr: ICartItem[]) => {
    const responseArr = await axios.all(
      cartItemArr.map((cartItem) =>
        axios.get<IProduct>(
          `${process.env.REACT_APP_API_URL}/products/${cartItem.productId}`
        )
      )
    );

    return responseArr.map((response) => response.data);
  }
);

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
        return item.productId === prodId ? { ...item, amount, category } : item;
      });
    },
    removeSingleCartItem(state, action: PayloadAction<string>) {
      state.cart = state.cart.filter(
        (item) => item.productId !== action.payload
      );
      state.cartProducts = state.cartProducts.filter(
        (product) => product.id !== action.payload
      );
    },
    clearCart(state) {
      state.cart = [];
      state.cartProducts = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCartProducts.pending, (state) => {
      state.isCartLoading = true;
    });
    builder.addCase(fetchCartProducts.fulfilled, (state, action) => {
      state.isCartLoading = false;
      state.cartError = null;
      state.cartProducts = action.payload;
    });
    builder.addCase(fetchCartProducts.rejected, (state, action) => {
      state.isCartLoading = false;
      state.cartError = action.error;
    });
  },
});

export const { addToCart, removeSingleCartItem, setCartItemCount, clearCart } =
  cartSlice.actions;

export const selectCart = (state: RootState) => state.cart;

export default cartSlice.reducer;
