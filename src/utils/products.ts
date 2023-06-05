import { IFilter } from "@Products/productsSlice";
import { IProduct, ICategory, ESort } from "@Products/types/product";
import { ICartItem } from "@Cart/types/cart";

const getSortedProducts = (
  productsArr: IProduct[],
  sortRule: string
): IProduct[] => {
  switch (sortRule) {
    case ESort.PRICE_LOW:
      return productsArr.sort(
        (a, b) => a.price[a.mainCountCategory] - b.price[b.mainCountCategory]
      );
    case ESort.PRICE_HIGH:
      return productsArr.sort(
        (a, b) => b.price[b.mainCountCategory] - a.price[a.mainCountCategory]
      );
    case ESort.RATING_LOW:
      return productsArr.sort((a, b) => a.stars - b.stars);
    case ESort.RATING_HIGH:
      return productsArr.sort((a, b) => b.stars - a.stars);
    case ESort.TITLE_ASC:
      return productsArr.sort((a, b) => a.title.localeCompare(b.title));
    case ESort.TITLE_DESC:
      return productsArr.sort((a, b) => b.title.localeCompare(a.title));
    default:
      return productsArr;
  }
};

export const getFilteredProducts = (
  productsArr: IProduct[],
  filter: IFilter,
  sortRule: string
): IProduct[] => {
  const { searchValue, category, brands, stars, price } = filter;
  const formatedSearchValue = searchValue.toLowerCase().trim();

  const filteredArr = productsArr.filter((product) => {
    const isInCategory = !category || product.category === category;
    const isInBrands = !brands.length || brands.includes(product.brand);
    const isInStars = !stars.length || stars.includes(product.stars);
    const isInPrice =
      !price.length ||
      (product.price[product.mainCountCategory] >= price[0] &&
        product.price[product.mainCountCategory] <= price[1]);
    const isInTitle = product.title.toLowerCase().includes(formatedSearchValue);
    return isInCategory && isInBrands && isInStars && isInPrice && isInTitle;
  });

  return getSortedProducts(filteredArr, sortRule);
};

export const getProductsByCategory = (
  products: IProduct[],
  singleProduct: IProduct | null
): IProduct[] => {
  if (singleProduct) {
    return products.filter(
      (product) =>
        product.category === singleProduct.category &&
        product.id !== singleProduct.id
    );
  } else {
    return [];
  }
};

export const getWishlistProducts = (
  products: IProduct[],
  wishlist: string[]
): IProduct[] => {
  return products.filter((product) => wishlist.includes(product.id));
};

export const getStarsArrFromNumber = (num: number): boolean[] => {
  const arr: boolean[] = Array(5).fill(false);
  return arr.map((_, index) => index < num);
};

export const getCategoriesObj = (productsArr: IProduct[]): ICategory => {
  return productsArr.reduce((acc: ICategory, product) => {
    const { category, brand } = product;

    if (!acc[category]) {
      acc[category] = {
        count: 0,
        brands: [],
      };
    }

    if (!acc[category].brands.includes(brand)) {
      acc[category].brands.push(brand);
    }

    acc[category].count++;

    return acc;
  }, {});
};

export const getTags = (productsArr: IProduct[]): string[] => {
  const allTagsArr = productsArr.reduce((acc: string[], product) => {
    return [...acc, ...product.tags];
  }, []);
  return Array.from(new Set(allTagsArr));
};

export const getValidNumber = (value: string, max: number, min = 0): number => {
  return Math.max(min, Math.min(max, Number(value)));
};

export const getCountCategories = (priceObj: {
  [key: string]: number;
}): string[] => {
  return Object.keys(priceObj);
};

export const getProductMaxCount = (
  product: IProduct,
  cart: ICartItem[],
  countCategory: string
): number => {
  const productInCart = cart.find(
    (cartItem) => cartItem.productId === product.id
  );

  if (productInCart) {
    const countInCart = productInCart.countArr.reduce((acc, countItem) => {
      return countItem.category === countCategory
        ? acc + countItem.amount
        : acc;
    }, 0);
    return product.stock[countCategory] - countInCart;
  } else {
    return product.stock[countCategory];
  }
};
