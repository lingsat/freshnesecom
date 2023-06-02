import {
  IPaginationData,
  IPaginationState,
  EPagination,
} from "@Products/types/pagination";
import { IProduct } from "@Products/types/product";

export const getPaginatedProducts = (
  productsArr: IProduct[],
  pagination: IPaginationState
): IProduct[] => {
  const { currentPage, productsPerPage } = pagination;

  const indexOfFirstProduct = (currentPage - 1) * EPagination.PRODUCTS_PER_PAGE;
  const indexOfLastProduct = indexOfFirstProduct + productsPerPage;

  return productsArr.slice(indexOfFirstProduct, indexOfLastProduct);
};

export const getPaginationData = (
  productsCount: number,
  pagination: IPaginationState
): IPaginationData => {
  const pageCount = Math.ceil(productsCount / EPagination.PRODUCTS_PER_PAGE);
  const activePagesArr = Array.from(
    { length: pagination.productsPerPage / EPagination.PRODUCTS_PER_PAGE },
    (_, index) => index + pagination.currentPage
  );
  const lastActivePage = activePagesArr[activePagesArr.length - 1];

  return { pageCount, activePagesArr, lastActivePage };
};

export const isPageInActiveRange = (
  activePagesArr: number[],
  page: number | null
): boolean => {
  return !page || activePagesArr.includes(page);
};