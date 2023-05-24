import { IFilter } from "@Products/productsSlice";
import { IProduct, ICategory, ESort } from "@Products/types/product";
import { productCategories } from "@/mock/productCategories";

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

export const getBrands = (
  categoriesObj: ICategory,
  searchCategory: string
): string[] => {
  if (searchCategory) {
    return categoriesObj[searchCategory].brands;
  } else {
    const categories = Object.values(categoriesObj);
    const brands = categories.map((categoryObj) => categoryObj.brands).flat();
    return Array.from(new Set(brands));
  }
};

export const getTags = (productsArr: IProduct[]): string[] => {
  const allTagsArr = productsArr.reduce((acc: string[], product) => {
    return [...acc, ...product.tags];
  }, []);
  return Array.from(new Set(allTagsArr));
};

export const getMinMaxPrice = (
  productsArr: IProduct[]
): { min: number; max: number } => {
  if (!productsArr.length) {
    return { min: 0, max: 0 };
  }
  return productsArr.reduce(
    (acc, product) => {
      const { mainPrice } = product;
      return {
        min: Math.min(acc.min, Math.floor(mainPrice)),
        max: Math.max(acc.max, Math.ceil(mainPrice)),
      };
    },
    {
      min: productsArr[0].mainPrice,
      max: productsArr[0].mainPrice,
    }
  );
};

export const getValidPrice = (value: string, max: number, min = 0): number => {
  return Math.max(min, Math.min(max, Number(value)));
};

export const getOldPrice = (price: number, discount: number): string => {
  const priceDiscount = (price * discount) / 100;
  return (price + priceDiscount).toFixed(2);
};

export const getCountCategories = (priceObj: {
  [key: string]: number;
}): string[] => {
  return Object.keys(priceObj);
};

const getValidDataListValue = (
  product: IProduct,
  category: string,
  countCategory: string
): string => {
  let value;

  switch (category) {
    case "deliveryTime":
      value = `in ${product[category as keyof IProduct]} days`;
      break;
    case "stock":
      value = `${product.stock[countCategory]} ${countCategory}`;
      break;
    case "buyBy":
      value = getCountCategories(product.price).join(", ");
      break;
    default:
      value = product[category as keyof IProduct];
      break;
  }

  return typeof value === "string" ? value : value.toString();
};

export const getProductDataList = (
  product: IProduct,
  countCategory: string
): { category: string; value: string }[] => {
  const catArr = Object.keys(productCategories);
  return catArr.map((category) => {
    const value = getValidDataListValue(product, category, countCategory);
    return {
      category: productCategories[category as keyof typeof productCategories],
      value,
    };
  });
};

export const getSortedImages = (imagesArr: string[], index: number) => () => {
  if (!index) {
    return imagesArr;
  }

  const clickedImage = imagesArr[index];
  const firstImage = imagesArr[0];
  const updatedImagesArr = [
    clickedImage,
    ...imagesArr.slice(1, index),
    firstImage,
    ...imagesArr.slice(index + 1),
  ];

  return updatedImagesArr;
};
