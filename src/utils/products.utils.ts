import {
  ICategoryWithBrands,
  ICategoryWithCount,
} from "@products/types/caregory.interface";
import { IProduct } from "@products/types/product.interface";

export const getFilteredProducts = (
  productsArr: IProduct[],
  category: string,
  searchValue: string
): IProduct[] => {
  const formatedSearchValue = searchValue.toLowerCase().trim();

  return productsArr.filter((product) => {
    const isInCategory = !category || product.category === category;
    const isInTitle = product.title.toLowerCase().includes(formatedSearchValue);
    return isInCategory && isInTitle;
  });
};

export const getStarsArrFromNumber = (num: number): boolean[] => {
  const arr: boolean[] = Array(5).fill(false);
  return arr.map((_, index) => index < num);
};

export const getCategories = (productsArr: IProduct[]): string[] => {
  return productsArr.reduce((acc: string[], product) => {
    if (!acc.includes(product.category)) {
      acc.push(product.category);
    }
    return acc;
  }, []);
};

export const getCategoriesWithCount = (
  productsArr: IProduct[]
): ICategoryWithCount[] => {
  const categories: ICategoryWithCount[] = productsArr.reduce(
    (acc: ICategoryWithCount[], product) => {
      const existingCategory = acc.find(
        (category) => category.title === product.category
      );
      if (existingCategory) {
        existingCategory.count++;
      } else {
        acc.push({ title: product.category, count: 1 });
      }
      return acc;
    },
    []
  );
  return categories;
};

export const getCategoriesWithBrands = (
  productsArr: IProduct[]
): ICategoryWithBrands => {
  const categories = productsArr.reduce((acc: ICategoryWithBrands, product) => {
    const existingCategory = product.category in acc;
    if (existingCategory) {
      if (!acc[product.category].includes(product.brand)) {
        acc[product.category].push(product.brand);
      }
    } else {
      acc[product.category] = [product.brand];
    }
    return acc;
  }, {});
  return categories;
};

export const getBrands = (productsArr: IProduct[]): string[] => {
  return productsArr.reduce((acc: string[], product) => {
    if (!acc.includes(product.brand)) {
      acc.push(product.brand);
    }
    return acc;
  }, []);
};

export const getMinMaxPrice = (
  productsArr: IProduct[]
): { min: number; max: number } => {
  if (!productsArr.length) {
    return { min: 0, max: 0 };
  }
  return productsArr.reduce(
    (acc, product) => {
      const { price } = product;
      return {
        min: Math.min(acc.min, Math.floor(price)),
        max: Math.max(acc.max, Math.ceil(price)),
      };
    },
    { min: productsArr[0].price, max: productsArr[0].price }
  );
};

export const getValidPrice = (value: string, max: number, min = 0) => {
  return Math.max(min, Math.min(max, Number(value)));
};
