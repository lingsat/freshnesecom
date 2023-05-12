import { ICategoryWithCount } from "@/features/products/types/caregory.interface";
import { IProduct } from "@/features/products/types/product.interface";

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

export const getStarsArrFromNumber = (num: number) => {
  const arr = Array(5).fill(false);
  return arr.map((_, index) => index < num);
};

export const getCategories = (productsArr: IProduct[]) => {
  return productsArr.reduce((acc: string[], product) => {
    if (!acc.includes(product.category)) {
      acc.push(product.category);
    }
    return acc;
  }, []);
};

export const getCategoriesWithCount = (productsArr: IProduct[]) => {
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

export const getBrands = (productsArr: IProduct[]) => {
  return productsArr.reduce((acc: string[], product) => {
    if (!acc.includes(product.brand)) {
      acc.push(product.brand);
    }
    return acc;
  }, []);
};
