import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "@/store/store";
import { IProduct } from "@products/types/product.interface";

export interface IFilter {
  searchValue: string;
  category: string;
  brands: string[];
}

export interface IProductsState {
  products: IProduct[];
  loading: boolean;
  filter: IFilter;
}

const initialState: IProductsState = {
  products: [],
  loading: false,
  filter: {
    searchValue: "",
    category: "",
    brands: [],
  },
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
    },
    clearSearch(state) {
      state.filter.searchValue = "";
    },
    changeCategory(state, action: PayloadAction<string>) {
      state.filter.category = action.payload;
      state.filter.brands = [];
    },
    toggleCategory(state, action: PayloadAction<string>) {
      if (state.filter.category) {
        state.filter.category = "";
      } else {
        state.filter.category = action.payload;
      }
      state.filter.brands = [];
    },
    toggleBrands(state, action: PayloadAction<string>) {
      if (state.filter.brands.includes(action.payload)) {
        const filteredBrands = state.filter.brands.filter(
          (brand) => brand !== action.payload
        );
        state.filter.brands = filteredBrands;
      } else {
        state.filter.brands.push(action.payload);
      }
    },
    clearAllFilters(state) {
      state.filter = {
        searchValue: "",
        category: "",
        brands: [],
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.products = action.payload;
    });
  },
});

export const {
  changeSearch,
  clearSearch,
  changeCategory,
  toggleCategory,
  toggleBrands,
  clearAllFilters,
} = productsSlice.actions;

export const selectProducts = (state: RootState) => state.products.products;

export default productsSlice.reducer;
