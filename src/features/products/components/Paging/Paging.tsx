import React, { ChangeEvent, FC } from "react";
import { useDispatch } from "react-redux";
import { Pagination, PaginationItem } from "@mui/material";

import { AppDispatch } from "@Store/store";
import {
  changeCurrentPage,
  increaseProductsPerPage,
} from "@Products/productsSlice";
import {
  getPaginationData,
  isPageInActiveRange,
} from "@Products/utils/pagination";
import { IPaginationState } from "@Products/types/pagination";
import { EBtnArrowDir } from "@/common/types/button";
import Button from "@CommonComponents/Button/Button";

import "./Paging.scss";

interface PagingProps {
  productsCount: number;
  pagination: IPaginationState;
  handlePageScroll: () => void;
}

const Paging: FC<PagingProps> = ({
  productsCount,
  pagination,
  handlePageScroll,
}) => {
  const dispatch = useDispatch<AppDispatch>();

  const { pageCount, activePagesArr, lastActivePage } = getPaginationData(
    productsCount,
    pagination
  );
  const isShowMoreDisabled = activePagesArr.includes(pageCount) || !pageCount;

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
        arrowDirection={EBtnArrowDir.BOTTOM}
        onCLick={handleIncreaseProdPerPage}
        disabled={isShowMoreDisabled}
      />
      <div className="pagination__stat">
        <p>{productsCount}</p>
        <span>Products</span>
      </div>
    </div>
  );
};

export default Paging;
