import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
  SerializedError,
} from "@reduxjs/toolkit";
import axios from "axios";

import { RootState } from "@Store/store";
import { getMinMaxPrice } from "@Products/utils/store";
import { getToggledArray } from "@/utils/toggleArrItem";
import { IProduct } from "@Products/types/product";
import { IPaginationState, EPagination } from "@Products/types/pagination";

export interface IFilter {
  searchValue: string;
  category: string;
  brands: string[];
  stars: number[];
  price: number[];
}

export interface IProductsState {
  products: IProduct[];
  loading: boolean;
  singleProduct: IProduct | null;
  isSingleLoading: boolean;
  singleError: SerializedError | null;
  minMaxPrice: {
    min: number;
    max: number;
  };
  filter: IFilter;
  sortRule: string;
  pagination: IPaginationState;
  wishlist: string[];
}

const initialPagination = {
  currentPage: EPagination.INITIAL__PAGE,
  productsPerPage: EPagination.PRODUCTS_PER_PAGE,
};

const initialState: IProductsState = {
  products: [],
  loading: false,
  singleProduct: null,
  isSingleLoading: false,
  singleError: null,
  minMaxPrice: {
    min: 0,
    max: 0,
  },
  filter: {
    searchValue: "",
    category: "",
    brands: [],
    stars: [],
    price: [],
  },
  sortRule: "",
  pagination: initialPagination,
  wishlist: [],
};

export const fetchProducts = createAsyncThunk("products/fetchProducts", () => {
  return axios
    .get<IProduct[]>(`${process.env.REACT_APP_API_URL}/products`)
    .then((response) => response.data);
});

export const fetchSingleProduct = createAsyncThunk(
  "products/fetchSingleProduct",
  (productId: string) => {
    return axios
      .get<IProduct>(`${process.env.REACT_APP_API_URL}/products/${productId}`)
      .then((response) => response.data);
  }
);

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    changeSearch(state, action: PayloadAction<string>) {
      state.filter.searchValue = action.payload;
      state.pagination = initialPagination;
    },
    changeCategory(state, action: PayloadAction<string>) {
      state.filter.category = action.payload;
      state.filter.brands = [];
      state.pagination = initialPagination;
    },
    changeSingleBrand(
      state,
      action: PayloadAction<{ brand: string; category: string }>
    ) {
      const { brand, category } = action.payload;
      state.filter.category = category;
      state.filter.stars = [];
      state.filter.price = [state.minMaxPrice.min, state.minMaxPrice.max];
      state.filter.brands = [brand];
      state.pagination = initialPagination;
    },
    toggleBrands(state, action: PayloadAction<string>) {
      state.filter.brands = getToggledArray(
        state.filter.brands,
        action.payload
      );
      state.pagination = initialPagination;
    },
    toggleStars(state, action: PayloadAction<number>) {
      state.filter.stars = getToggledArray(state.filter.stars, action.payload);
      state.pagination = initialPagination;
    },
    changePrice(state, action: PayloadAction<number[]>) {
      state.filter.price = action.payload;
      state.pagination = initialPagination;
    },
    clearAllFilters(state) {
      state.filter = {
        searchValue: "",
        category: "",
        brands: [],
        stars: [],
        price: [state.minMaxPrice.min, state.minMaxPrice.max],
      };
      state.pagination = initialPagination;
    },
    changeSortRule(state, action: PayloadAction<string>) {
      state.sortRule = action.payload;
      state.pagination = initialPagination;
    },
    changeCurrentPage(state, action: PayloadAction<number>) {
      state.pagination = {
        currentPage: action.payload,
        productsPerPage: EPagination.PRODUCTS_PER_PAGE,
      };
    },
    increaseProductsPerPage(state) {
      state.pagination.productsPerPage += EPagination.PRODUCTS_PER_PAGE;
    },
    toggleWishlistItem(state, action: PayloadAction<string>) {
      state.wishlist = getToggledArray(state.wishlist, action.payload);
    },
    clearWishlist(state) {
      state.wishlist = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.products = action.payload;
      state.minMaxPrice = getMinMaxPrice(action.payload);
      state.filter.price = [state.minMaxPrice.min, state.minMaxPrice.max];
    });
    builder.addCase(fetchSingleProduct.pending, (state) => {
      state.isSingleLoading = true;
    });
    builder.addCase(fetchSingleProduct.fulfilled, (state, action) => {
      state.isSingleLoading = false;
      state.singleError = null;
      state.singleProduct = action.payload;
    });
    builder.addCase(fetchSingleProduct.rejected, (state, action) => {
      state.isSingleLoading = false;
      state.singleError = action.error;
    });
  },
});

export const {
  changeSearch,
  changeCategory,
  changeSingleBrand,
  toggleBrands,
  toggleStars,
  changePrice,
  clearAllFilters,
  changeSortRule,
  changeCurrentPage,
  increaseProductsPerPage,
  toggleWishlistItem,
  clearWishlist,
} = productsSlice.actions;

export const selectProducts = (state: RootState) => state.products;

export default productsSlice.reducer;
