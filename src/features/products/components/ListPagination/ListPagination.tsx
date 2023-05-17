import React, { FC } from "react";
import ReactPaginate from "react-paginate";
import arrow from "@/assets/images/arrow_right.svg";
import { EPagination } from "@products/types/pagination.enum";
import "./ListPagination.scss";

interface ListPaginationProps {
  productsCount: number;
  handlePageChange: ({ selected }: { selected: number }) => void;
  setProductsPerPage: React.Dispatch<React.SetStateAction<number>>;
}

const ListPagination: FC<ListPaginationProps> = ({
  productsCount,
  handlePageChange,
  setProductsPerPage,
}) => {
  const pageCount = Math.ceil(productsCount / EPagination.PRODUCTS_PER_PAGE);

  const increaseProdPerPage = () => {
    setProductsPerPage((prev) => prev + EPagination.PRODUCTS_PER_PAGE);
  };

  return (
    <div className="pagination">
      <div className="pagination__controls">
        <p>Page:</p>
        <ReactPaginate
          breakLabel="..."
          onPageChange={handlePageChange}
          pageRangeDisplayed={EPagination.PAGES__PANGE}
          pageCount={pageCount}
          nextLabel={null}
          previousLabel={null}
          containerClassName="pagination__list"
          pageLinkClassName="pagination__link"
          activeLinkClassName="pagination__link--active"
        />
      </div>
      <button
        type="button"
        className="pagination__btn"
        disabled={pageCount <= 1}
        onClick={increaseProdPerPage}>
        Show more products
        <img src={arrow} alt="ArrowDown" />
      </button>
      <div className="pagination__stat">
        <p>{productsCount}</p>
        <span>Products</span>
      </div>
    </div>
  );
};

export default ListPagination;
