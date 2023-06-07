import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
  SerializedError,
} from "@reduxjs/toolkit";
import axios from "axios";
import axiosRetry from "axios-retry";

import { RootState } from "@Store/store";
import { ICartData, ICartItem } from "@Cart/types/cart";
import { IProduct } from "@Products/types/product";
import {
  addProdToCart,
  getUpdatedCart,
  getCartAfterRemove,
  getMergedCart,
} from "@Cart/utils/store";
import {
  AXIOR_RETRY_COUNT,
  AXIOR_RETRY_DELAY,
  AXIOR_RETRY_ERROR,
} from "@/constants";

axiosRetry(axios, {
  retries: AXIOR_RETRY_COUNT,
  retryDelay: (retryCount) => retryCount * AXIOR_RETRY_DELAY,
  retryCondition: (error) => {
    return error.response?.status === AXIOR_RETRY_ERROR;
  },
});

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
    addToCart(
      state,
      action: PayloadAction<{ cartData: ICartData; userId: string | null }>
    ) {
      const { cartData, userId } = action.payload;
      state.cart = addProdToCart(state.cart, cartData, userId);
    },
    changeCartItemCount(
      state,
      action: PayloadAction<{
        newCartData: ICartData;
        oldCategory: string;
        userId: string | null;
      }>
    ) {
      const { newCartData, oldCategory, userId } = action.payload;
      state.cart = getUpdatedCart(state.cart, newCartData, oldCategory, userId);
    },
    mergeCartItemCategories(
      state,
      action: PayloadAction<{
        newCartData: ICartData;
        oldCategory: string;
        userId: string | null;
      }>
    ) {
      const { newCartData, oldCategory, userId } = action.payload;
      state.cart = getMergedCart(state.cart, newCartData, oldCategory, userId);
    },
    removeSingleCartItem(
      state,
      action: PayloadAction<{
        productId: string;
        category: string;
        userId: string | null;
      }>
    ) {
      const { productId, category, userId } = action.payload;
      state.cart = getCartAfterRemove(state.cart, productId, category, userId);
    },
    clearCart(state, action: PayloadAction<string | null>) {
      state.cart = state.cart.filter((item) => item.userId !== action.payload);
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

export const {
  addToCart,
  removeSingleCartItem,
  changeCartItemCount,
  mergeCartItemCategories,
  clearCart,
} = cartSlice.actions;

export const selectCart = (state: RootState) => state.cart;

export default cartSlice.reducer;
