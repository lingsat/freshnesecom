export interface IPaginationState {
  currentPage: number;
  productsPerPage: number;
}

export interface IPaginationData {
  pageCount: number;
  activePagesArr: number[];
  lastActivePage: number;
}

export enum EPagination {
  INITIAL__PAGE = 1,
  PAGES__PANGE = 3,
  PRODUCTS_PER_PAGE = 5,
}
