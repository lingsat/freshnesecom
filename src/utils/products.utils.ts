import { ICategory } from "@products/types/caregory.interface";
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

export const getBrands = (categoriesObj: ICategory): string[] => {
  const categories = Object.values(categoriesObj);
  const brands = categories.map((categoryObj) => categoryObj.brands).flat();
  return Array.from(new Set(brands));
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
