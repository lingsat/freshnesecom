import React, { FC } from "react";
import ReactPaginate from "react-paginate";
import arrow from "@/assets/images/arrow_right.svg";
import "./ListPagination.scss";

interface ListPaginationProps {
  productsCount: number;
}

const ListPagination: FC<ListPaginationProps> = ({ productsCount }) => {
  return (
    <div className="pagination">
      <div className="pagination__controls">
        <p>Page:</p>
        <ReactPaginate
          breakLabel="..."
          // onPageChange={handlePageChange}
          pageRangeDisplayed={3}
          pageCount={4}
          initialPage={1}
          nextLabel={null}
          previousLabel={null}
          containerClassName="pagination__list"
          pageLinkClassName="pagination__link"
          activeLinkClassName="pagination__link--active"
        />
      </div>
      <button type="button" className="pagination__btn">
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
