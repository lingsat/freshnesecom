import React, { FC } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import {
  changeCurrentPage,
  increaseProductsPerPage,
} from "@products/productsSlice";
import GreenButton from "@/common/components/GreenButton/GreenButton";
import { EPagination } from "@products/types/pagination.enum";
import "./ListPagination.scss";

interface ListPaginationProps {
  productsCount: number;
  pagination: {
    currentPage: number;
    productsPerPage: number;
  };
  handlePageScroll: () => void;
}

const ListPagination: FC<ListPaginationProps> = ({
  productsCount,
  pagination,
  handlePageScroll,
}) => {
  const dispatch = useDispatch<AppDispatch>();

  const pageCount = Math.ceil(productsCount / EPagination.PRODUCTS_PER_PAGE);
  const pagesArr = Array.from({ length: pageCount }, (_, index) => index + 1);
  const activePagesArr = Array.from(
    { length: pagination.productsPerPage / EPagination.PRODUCTS_PER_PAGE },
    (_, index) => index + pagination.currentPage
  );
  console.log(pageCount);

  const handlePageChange = (newPageNumber: number) => () => {
    dispatch(changeCurrentPage(newPageNumber));
    handlePageScroll();
  };

  const handleIncreaseProdPerPage = () => {
    dispatch(increaseProductsPerPage());
  };

  return (
    <div className="pagination">
      <div className="pagination__controls">
        <p>Page:</p>
        <ul className="pagination__list">
          {pagesArr.map((page, index) => (
            <li
              key={`page-${page}-${index}`}
              className={`pagination__item ${
                activePagesArr.includes(page) ? "pagination__item--active" : ""
              }`}
              onClick={handlePageChange(page)}>
              {page}
            </li>
          ))}
        </ul>
      </div>
      <GreenButton
        text="Show more products"
        arrowDirection="bottom"
        onCLick={handleIncreaseProdPerPage}
        disabled={activePagesArr.includes(pageCount) || !pageCount}
      />
      <div className="pagination__stat">
        <p>{productsCount}</p>
        <span>Products</span>
      </div>
    </div>
  );
};

export default ListPagination;
