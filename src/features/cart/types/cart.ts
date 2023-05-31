import { IProduct } from "@Products/types/product";

export interface ICartItem {
  product: IProduct;
  amount: number;
  category: string;
}
