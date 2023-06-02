import { productCategories } from "@/mock/productCategories";
import { getCountCategories } from "@/utils/products";
import { ICategory, IProduct } from "@Products/types/product";

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

export const getOldPrice = (price: number, discount: number): string => {
  const priceDiscount = (price * discount) / 100;
  return (price + priceDiscount).toFixed(2);
};

const getValidDataListValue = (
  product: IProduct,
  category: string,
  countCategory: string
): string => {
  let value;

  switch (category) {
    case "deliveryTime":
      value = `in ${product[category]} days`;
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
