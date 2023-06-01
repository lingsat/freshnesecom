import { City, ICity, ICountry } from "country-state-city";

import { ICartItem } from "@Cart/types/cart";
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

export const getSubtotalPrice = (
  cartProducts: IProduct[],
  cartData: ICartItem[]
): string => {
  const subtotal = cartProducts.reduce((acc: number, product) => {
    const currentData = cartData.find((item) => item.productId === product.id);
    if (currentData) {
      const price = product.price[currentData.category];
      const amount = currentData.amount;
      const itemTotal = price * amount;
      return acc + itemTotal;
    } else {
      return acc;
    }
  }, 0);

  return subtotal.toFixed(2);
};

export const getTotalPrice = (
  price: string,
  isPromoAplied: boolean
): string => {
  const taxTotalPrice = (+price * TAX_VALUE) / 100;
  if (isPromoAplied) {
    const discount = (+price * PROMO_CODE_DISCOUNT) / 100;
    return (+price - discount + taxTotalPrice).toFixed(2);
  } else {
    return (+price + taxTotalPrice).toFixed(2);
  }
};
