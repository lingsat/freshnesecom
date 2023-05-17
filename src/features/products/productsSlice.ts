import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "@/store/store";
import { IProduct } from "@products/types/product.interface";
import { getMinMaxPrice } from "@/utils/products.utils";
import { getToggledArray } from "@/utils/toggleArrItem";
import { ESort } from "./types/sort.enum";
import { EPagination } from "./types/pagination.enum";

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
  minMaxPrice: {
    min: number;
    max: number;
  };
  filter: IFilter;
  sortRule: ESort;
  currentPage: number;
}

const initialState: IProductsState = {
  products: [],
  loading: false,
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
  sortRule: ESort.CLEAR,
  currentPage: EPagination.INITIAL__PAGE,
};

export const fetchProducts = createAsyncThunk("products/fetchProducts", () => {
  return axios
    .get<IProduct[]>(`${process.env.REACT_APP_API_URL}/products`)
    .then((response) => response.data);
});

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    changeSearch(state, action: PayloadAction<string>) {
      state.filter.searchValue = action.payload;
      state.currentPage = EPagination.INITIAL__PAGE;
    },
    clearSearch(state) {
      state.filter.searchValue = "";
      state.currentPage = EPagination.INITIAL__PAGE;
    },
    changeCategory(state, action: PayloadAction<string>) {
      state.filter.category = action.payload;
      state.filter.brands = [];
      state.currentPage = EPagination.INITIAL__PAGE;
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
      state.currentPage = EPagination.INITIAL__PAGE;
    },
    toggleBrands(state, action: PayloadAction<string>) {
      state.filter.brands = getToggledArray(
        state.filter.brands,
        action.payload
      );
      state.currentPage = EPagination.INITIAL__PAGE;
    },
    toggleStars(state, action: PayloadAction<number>) {
      state.filter.stars = getToggledArray(state.filter.stars, action.payload);
      state.currentPage = EPagination.INITIAL__PAGE;
    },
    changePrice(state, action: PayloadAction<number[]>) {
      state.filter.price = action.payload;
      state.currentPage = EPagination.INITIAL__PAGE;
    },
    clearAllFilters(state) {
      state.filter = {
        searchValue: "",
        category: "",
        brands: [],
        stars: [],
        price: [state.minMaxPrice.min, state.minMaxPrice.max],
      };
      state.currentPage = EPagination.INITIAL__PAGE;
    },
    changeSortRule(state, action: PayloadAction<ESort>) {
      state.sortRule = action.payload;
    },
    changeCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
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
  },
});

export const {
  changeSearch,
  clearSearch,
  changeCategory,
  changeSingleBrand,
  toggleBrands,
  toggleStars,
  changePrice,
  clearAllFilters,
  changeSortRule,
  changeCurrentPage,
} = productsSlice.actions;

export const selectProducts = (state: RootState) => state.products.products;

export default productsSlice.reducer;
