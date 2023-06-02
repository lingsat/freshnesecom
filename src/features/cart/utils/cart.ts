import { City, ICity, ICountry } from "country-state-city";

import { ICartItem, ICartItemWithProduct } from "@Cart/types/cart";
import { IProduct } from "@Products/types/product";

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
