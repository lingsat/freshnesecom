import { ICartItem } from "@Cart/types/cart";

export const getDeliveryDay = (cartProducts: ICartItem[]): string => {
  let maxDay = 0;
  cartProducts.forEach((item) => {
    if (item.product.deliveryTime > maxDay) {
      maxDay = item.product.deliveryTime;
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
