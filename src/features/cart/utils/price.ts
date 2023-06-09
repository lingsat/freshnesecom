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
  isPromoApplied: boolean
): [string, string] => {
  const priceNum = parseFloat(price);
  const taxTotalPrice = (priceNum * TAX_VALUE) / 100;
  const promoPriceDiscount = isPromoApplied
    ? (priceNum * PROMO_CODE_DISCOUNT) / 100
    : 0;
  const totalPrice = priceNum + taxTotalPrice - promoPriceDiscount;

  return [totalPrice.toFixed(2), promoPriceDiscount.toFixed(2)];
};
