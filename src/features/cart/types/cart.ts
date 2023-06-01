import { IProduct } from "@Products/types/product";

export interface ICount {
  amount: number;
  category: string;
}

export interface ICartItem {
  productId: string;
  countArr: ICount[];
}

export interface ICartData {
  productId: string;
  count: ICount;
}

export interface ICartItemWithProduct {
  product: IProduct;
  count: ICount;
}
