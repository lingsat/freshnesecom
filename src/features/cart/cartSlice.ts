import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
  SerializedError,
} from "@reduxjs/toolkit";
import axios from "axios";

import { RootState } from "@Store/store";
import { ICartData, ICartItem } from "@Cart/types/cart";
import { IProduct } from "@Products/types/product";
import {
  addProdToCart,
  getCartAfterRemove,
  getUpdatedCart,
} from "@/utils/cart";

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
    addToCart(state, action: PayloadAction<ICartData>) {
      state.cart = addProdToCart(state.cart, action.payload);
    },
    changeCartItem(
      state,
      action: PayloadAction<{ newCartData: ICartData; oldCategory: string }>
    ) {
      const { newCartData, oldCategory } = action.payload;
      state.cart = getUpdatedCart(state.cart, newCartData, oldCategory);
    },
    removeSingleCartItem(
      state,
      action: PayloadAction<{ productId: string; category: string }>
    ) {
      const { productId, category } = action.payload;

      const [updatedCart, removeCartProduct] = getCartAfterRemove(
        state.cart,
        productId,
        category
      );

      state.cart = updatedCart;
      if (removeCartProduct) {
        state.cartProducts = state.cartProducts.filter(
          (product) => product.id !== productId
        );
      }
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

export const { addToCart, removeSingleCartItem, changeCartItem, clearCart } =
  cartSlice.actions;

export const selectCart = (state: RootState) => state.cart;

export default cartSlice.reducer;
