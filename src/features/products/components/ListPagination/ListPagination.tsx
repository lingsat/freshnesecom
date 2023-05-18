import React, { ChangeEvent, FC } from "react";
import { Pagination, PaginationItem } from "@mui/material";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import {
  changeCurrentPage,
  increaseProductsPerPage,
} from "@products/productsSlice";
import { getPaginationData, isPageInActiveRange } from "@/utils/pagination";
import Button from "@/common/components/Button/Button";
import { IPaginationState } from "@products/types/pagination";
import "./ListPagination.scss";

interface ListPaginationProps {
  productsCount: number;
  pagination: IPaginationState;
  handlePageScroll: () => void;
}

const ListPagination: FC<ListPaginationProps> = ({
  productsCount,
  pagination,
  handlePageScroll,
}) => {
  const dispatch = useDispatch<AppDispatch>();

  const { pageCount, activePagesArr, lastActivePage } = getPaginationData(
    productsCount,
    pagination
  );

  const handlePageChange = (_: ChangeEvent<unknown>, page: number) => {
    dispatch(changeCurrentPage(page));
    handlePageScroll();
  };

  const handleIncreaseProdPerPage = () => {
    dispatch(increaseProductsPerPage());
  };

  return (
    <div className="pagination">
      <div className="pagination__controls">
        <p>Page:</p>
        <Pagination
          classes={{ ul: "pagination__list" }}
          count={pageCount}
          hideNextButton
          hidePrevButton
          page={lastActivePage}
          onChange={handlePageChange}
          renderItem={(item) => (
            <PaginationItem
              {...item}
              classes={{
                root: `${
                  isPageInActiveRange(activePagesArr, item.page) ? "active" : ""
                }`,
                selected: "pagination__item--selected",
              }}
            />
          )}
        />
      </div>
      <Button
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
