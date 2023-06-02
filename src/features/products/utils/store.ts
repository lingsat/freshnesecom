import { IProduct } from "@Products/types/product";

export const getMinMaxPrice = (
  productsArr: IProduct[]
): { min: number; max: number } => {
  if (!productsArr.length) {
    return { min: 0, max: 0 };
  }
  return productsArr.reduce(
    (acc, product) => {
      const { mainPrice } = product;
      return {
        min: Math.min(acc.min, Math.floor(mainPrice)),
        max: Math.max(acc.max, Math.ceil(mainPrice)),
      };
    },
    {
      min: productsArr[0].mainPrice,
      max: productsArr[0].mainPrice,
    }
  );
};
