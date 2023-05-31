import { IProduct } from "@Products/types/product";

export interface ICartItem {
  productId: string;
  amount: number;
  category: string;
}

export interface ICartItemWithProduct extends ICartItem {
  product: IProduct;
}
