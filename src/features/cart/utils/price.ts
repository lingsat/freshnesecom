import { TAX_VALUE, PROMO_CODE_DISCOUNT } from "@/constants";
import { ICartItemWithProduct } from "@Cart/types/cart";

export const getSubtotalPrice = (
  cartWithProducts: ICartItemWithProduct[]
): string => {
  const subtotal = cartWithProducts.reduce((acc: number, itemWIthProduct) => {
    const { product, count } = itemWIthProduct;
    const price = product.price[count.category];
    const itemTotal = price * count.amount;
    return acc + itemTotal;
  }, 0);

  return subtotal.toFixed(2);
};

export const getTotalPrice = (
  price: string,
  isPromoAplied: boolean
): [string, string] => {
  const priceNum = +price;
  const taxTotalPrice = (priceNum * TAX_VALUE) / 100;
  const promoPriceDiscount = (priceNum * PROMO_CODE_DISCOUNT) / 100;
  let totalPrice = 0;
  if (isPromoAplied) {
    totalPrice = priceNum - promoPriceDiscount + taxTotalPrice;
  } else {
    totalPrice = priceNum + taxTotalPrice;
  }

  return [totalPrice.toFixed(2), promoPriceDiscount.toFixed(2)];
};
