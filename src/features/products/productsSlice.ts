import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "@/store/store";
import { IProduct } from "@products/types/product.interface";

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
  filter: IFilter;
}

const initialState: IProductsState = {
  products: [],
  loading: false,
  filter: {
    searchValue: "",
    category: "",
    brands: [],
    stars: [],
    price: [],
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
    changeSingleBrand(state, action: PayloadAction<string>) {
      state.filter.category = "";
      state.filter.stars = [];
      state.filter.brands = [action.payload];
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
    toggleStars(state, action: PayloadAction<number>) {
      if (state.filter.stars.includes(action.payload)) {
        const filteredStars = state.filter.stars.filter(
          (star) => star !== action.payload
        );
        state.filter.stars = filteredStars;
      } else {
        state.filter.stars.push(action.payload);
      }
    },
    changePrice(state, action: PayloadAction<number[]>) {
      state.filter.price = action.payload;
    },
    clearAllFilters(state) {
      state.filter = {
        searchValue: "",
        category: "",
        brands: [],
        stars: [],
        price: [],
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
  changeSingleBrand,
  toggleBrands,
  toggleStars,
  changePrice,
  clearAllFilters,
} = productsSlice.actions;

export const selectProducts = (state: RootState) => state.products.products;

export default productsSlice.reducer;
