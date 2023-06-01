import { IProduct } from "@Products/types/product";

export const getDeliveryDay = (cartProducts: IProduct[]): string => {
  let maxDay = 0;
  cartProducts.forEach((product) => {
    if (product.deliveryTime > maxDay) {
      maxDay = product.deliveryTime;
    }
  });

  const currentDate = new Date();
  const targetDate = new Date(
    currentDate.getTime() + maxDay * 24 * 60 * 60 * 1000
  );

  return targetDate.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
};
