import { City, ICity, ICountry } from "country-state-city";

import {
  ICartData,
  ICartItem,
  ICartItemWithProduct,
  ICount,
} from "@Cart/types/cart";
import { IProduct } from "@Products/types/product";
import { PROMO_CODE_DISCOUNT, TAX_VALUE } from "@/constants";

export const getCitiesByCountry = (
  countryCode: string,
  cityValue: string
): ICity[] => {
  const validCityValue = cityValue.trim().toLowerCase();

  if (!countryCode) {
    return [];
  } else {
    const citiesAll = City.getCitiesOfCountry(countryCode);
    return citiesAll
      ? citiesAll.filter((city) =>
          city.name.toLowerCase().includes(validCityValue)
        )
      : [];
  }
};

export const getFilteredCountries = (
  allCountries: ICountry[],
  countryValue: string
): ICountry[] => {
  const validCountryValue = countryValue.trim().toLowerCase();

  if (allCountries) {
    return allCountries.filter((country) =>
      country.name.toLowerCase().includes(validCountryValue)
    );
  } else {
    return [];
  }
};

const getCountArray = (countArr: ICount[], newCount: ICount) => {
  const updatedCountArr = countArr.map((item) => {
    return item.category === newCount.category
      ? { ...item, amount: item.amount + newCount.amount }
      : item;
  });

  if (!updatedCountArr.some((item) => item.category === newCount.category)) {
    updatedCountArr.unshift(newCount);
  }

  return updatedCountArr;
};

export const addProdToCart = (cart: ICartItem[], newCartData: ICartData) => {
  const { productId, count } = newCartData;

  const itemInArr = cart.find(
    (item) => item.productId === newCartData.productId
  );

  if (itemInArr) {
    const newCountArr = getCountArray(itemInArr.countArr, count);
    const newItem: ICartItem = { ...itemInArr, countArr: newCountArr };
    return cart.map((item) => {
      return item.productId === itemInArr.productId ? newItem : item;
    });
  } else {
    const newItem: ICartItem = {
      productId,
      countArr: [{ amount: count.amount, category: count.category }],
    };
    return [newItem, ...cart];
  }
};

export const getUpdatedCart = (
  cart: ICartItem[],
  newCartData: ICartData,
  oldCategory: string
) => {
  const { productId, count } = newCartData;
  return cart.map((item) => {
    if (item.productId === productId) {
      const updatedCountArr = item.countArr.map((countItem) => {
        return countItem.category === oldCategory ? count : countItem;
      });
      return { ...item, countArr: updatedCountArr };
    } else {
      return item;
    }
  });
};

export const getCartAfterRemove = (
  cart: ICartItem[],
  id: string,
  category: string
): [ICartItem[], boolean] => {
  let isCartProductsNeedClear = false;

  const updatedCart = cart.filter((cartItem) => {
    const { productId, countArr } = cartItem;

    if (productId !== id) {
      return true;
    }

    if (countArr.length === 1) {
      isCartProductsNeedClear = true;
      return false;
    }

    cartItem.countArr = countArr.filter((count) => count.category !== category);
    return true;
  });

  return [updatedCart, isCartProductsNeedClear];
};

export const getCartItemWithProduct = (
  cartItems: ICartItem[],
  products: IProduct[]
): ICartItemWithProduct[] => {
  return cartItems.flatMap((cartItem) => {
    const { productId, countArr } = cartItem;
    const product = products.find((product) => product.id === productId);

    if (product) {
      return countArr.map((count) => ({
        product,
        count,
      }));
    }

    return [];
  });
};

export const getInvalidCategories = (
  cart: ICartItem[],
  itemWithProduct: ICartItemWithProduct
) => {
  const allCategories = Object.keys(itemWithProduct.product.price);
  let currentItemCategories: string[] = [];

  const cartItem = cart.find(
    (item) => item.productId === itemWithProduct.product.id
  );

  if (cartItem) {
    currentItemCategories = cartItem.countArr.map((item) => item.category);
    return allCategories.filter(
      (value) =>
        currentItemCategories.includes(value) &&
        value !== itemWithProduct.count.category
    );
  } else {
    return [];
  }
};

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
  const taxTotalPrice = (+price * TAX_VALUE) / 100;
  const promoPriceDiscount = (+price * PROMO_CODE_DISCOUNT) / 100;
  let totalPrice = 0;
  if (isPromoAplied) {
    totalPrice = +price - promoPriceDiscount + taxTotalPrice;
  } else {
    totalPrice = +price + taxTotalPrice;
  }

  return [totalPrice.toFixed(2), promoPriceDiscount.toFixed(2)];
};
