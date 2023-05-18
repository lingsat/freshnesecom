import {
  IPaginationData,
  IPaginationState,
  EPagination,
} from "@products/types/pagination";

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

export const isPageInActivePange = (
  activePagesArr: number[],
  page: number | null
): boolean => {
  return !page || activePagesArr.includes(page);
};
