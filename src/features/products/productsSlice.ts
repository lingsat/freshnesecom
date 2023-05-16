import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "@/store/store";
import { IProduct } from "@products/types/product.interface";
import { getMinMaxPrice } from "@/utils/products.utils";
import { getToggledArray } from "@/utils/toggleArrItem";

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
    changeSingleBrand(
      state,
      action: PayloadAction<{ brand: string; category: string }>
    ) {
      const { brand, category } = action.payload;
      state.filter.category = category;
      state.filter.stars = [];
      state.filter.price = [state.minMaxPrice.min, state.minMaxPrice.max];
      state.filter.brands = [brand];
    },
    toggleBrands(state, action: PayloadAction<string>) {
      state.filter.brands = getToggledArray(
        state.filter.brands,
        action.payload
      );
    },
    toggleStars(state, action: PayloadAction<number>) {
      state.filter.stars = getToggledArray(state.filter.stars, action.payload);
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
        price: [state.minMaxPrice.min, state.minMaxPrice.max],
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
} = productsSlice.actions;

export const selectProducts = (state: RootState) => state.products.products;

export default productsSlice.reducer;
