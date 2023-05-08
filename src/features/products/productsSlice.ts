import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "@/store/store";
import { IProduct } from "@/features/products/types/product.interface";

interface ProductsState {
  products: IProduct[];
}

const initialState: ProductsState = {
  products: [],
};

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
});

export const selectProducts = (state: RootState) => state.products.products;

export default productsSlice.reducer;
