import { ESort } from "@products/types/sort.enum";
import { IFilter } from "@products/productsSlice";
import { ICategory } from "@products/types/caregory.interface";
import { IProduct } from "@products/types/product.interface";
import { EPagination } from "@/features/products/types/pagination.enum";

const getSortedProducts = (
  productsArr: IProduct[],
  sortRule: ESort
): IProduct[] => {
  switch (sortRule) {
    case ESort.PRICE_LOW:
      return productsArr.sort((a, b) => a.price - b.price);
    case ESort.PRICE_HIGH:
      return productsArr.sort((a, b) => b.price - a.price);
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
  sortRule: ESort
): IProduct[] => {
  const { searchValue, category, brands, stars, price } = filter;
  const formatedSearchValue = searchValue.toLowerCase().trim();

  const filteredArr = productsArr.filter((product) => {
    const isInCategory = !category || product.category === category;
    const isInBrands = !brands.length || brands.includes(product.brand);
    const isInStars = !stars.length || stars.includes(product.stars);
    const isInPrice =
      !price.length || (product.price >= price[0] && product.price <= price[1]);
    const isInTitle = product.title.toLowerCase().includes(formatedSearchValue);
    return isInCategory && isInBrands && isInStars && isInPrice && isInTitle;
  });

  return getSortedProducts(filteredArr, sortRule);
};

export const getPaginatedProducts = (
  productsArr: IProduct[],
  currentPage: number,
  productsPerPage: number
) => {
  const indexOffirstProduct =
    currentPage * EPagination.PRODUCTS_PER_PAGE - EPagination.PRODUCTS_PER_PAGE;
  const indexOfLastProduct = indexOffirstProduct + productsPerPage;

  return productsArr.slice(indexOffirstProduct, indexOfLastProduct);
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

export const getValidPrice = (value: string, max: number, min = 0): number => {
  return Math.max(min, Math.min(max, Number(value)));
};