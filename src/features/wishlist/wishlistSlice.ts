import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
  SerializedError,
} from "@reduxjs/toolkit";
import axios from "axios";
import axiosRetry from "axios-retry";

import { RootState } from "@Store/store";
import { IProduct } from "@Products/types/product";
import {
  AXIOR_RETRY_COUNT,
  AXIOR_RETRY_DELAY,
  AXIOR_RETRY_ERROR,
} from "@/constants";
import { getToggledArray } from "@/utils/toggleArrItem";

axiosRetry(axios, {
  retries: AXIOR_RETRY_COUNT,
  retryDelay: (retryCount) => retryCount * AXIOR_RETRY_DELAY,
  retryCondition: (error) => {
    return error.response?.status === AXIOR_RETRY_ERROR;
  },
});

export interface IWishlistState {
  wishlist: string[];
  wishlistProducts: IProduct[];
  isWishlistLoading: boolean;
  wishlistError: SerializedError | null;
}

const initialState: IWishlistState = {
  wishlist: [],
  wishlistProducts: [],
  isWishlistLoading: false,
  wishlistError: null,
};

export const fetchWishlistProducts = createAsyncThunk(
  "wishlist/fetchWishlistProducts",
  async (idArr: string[]) => {
    const responseArr = await axios.all(
      idArr.map((id) =>
        axios.get<IProduct>(`${process.env.REACT_APP_API_URL}/products/${id}`)
      )
    );

    return responseArr.map((response) => response.data);
  }
);

export const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    toggleWishlistItem(state, action: PayloadAction<string>) {
      state.wishlist = getToggledArray(state.wishlist, action.payload);
      state.wishlistProducts = state.wishlistProducts.filter(
        (product) => product.id !== action.payload
      );
    },
    clearWishlist(state) {
      state.wishlist = [];
      state.wishlistProducts = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchWishlistProducts.pending, (state) => {
      state.isWishlistLoading = true;
    });
    builder.addCase(fetchWishlistProducts.fulfilled, (state, action) => {
      state.isWishlistLoading = false;
      state.wishlistError = null;
      state.wishlistProducts = action.payload;
    });
    builder.addCase(fetchWishlistProducts.rejected, (state, action) => {
      state.isWishlistLoading = false;
      state.wishlistError = action.error;
    });
  },
});

export const { toggleWishlistItem, clearWishlist } = wishlistSlice.actions;

export const selectWishlist = (state: RootState) => state.wishlist;

export default wishlistSlice.reducer;
