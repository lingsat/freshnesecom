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
import { getToggledWishlist } from "@/utils/toggle";
import { IWishlistItem } from "@Wishlist/types/wishlist";

axiosRetry(axios, {
  retries: AXIOR_RETRY_COUNT,
  retryDelay: (retryCount) => retryCount * AXIOR_RETRY_DELAY,
  retryCondition: (error) => {
    return error.response?.status === AXIOR_RETRY_ERROR;
  },
});

export interface IWishlistState {
  wishlist: IWishlistItem[];
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
  async (wishlist: IWishlistItem[]) => {
    const responseArr = await axios.all(
      wishlist.map((item) =>
        axios.get<IProduct>(
          `${process.env.REACT_APP_API_URL}/products/${item.productId}`
        )
      )
    );

    return responseArr.map((response) => response.data);
  }
);

export const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    toggleWishlistItem(
      state,
      action: PayloadAction<{ userId: string | null; productId: string }>
    ) {
      const { userId, productId } = action.payload;
      state.wishlist = getToggledWishlist(state.wishlist, userId, productId);
      state.wishlistProducts = state.wishlistProducts.filter(
        (product) => product.id !== action.payload.productId
      );
    },
    clearWishlist(state, action: PayloadAction<string | null>) {
      state.wishlist = state.wishlist.filter(
        (item) => item.userId !== action.payload
      );
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
