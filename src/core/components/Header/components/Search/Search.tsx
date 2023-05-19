import React, { ChangeEvent, FC, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { AppDispatch, RootState } from "@Store/store";
import {
  changeSearch,
  clearSearch,
  IProductsState,
} from "@Products/productsSlice";
import { ERoutes } from "@/types/routes";
import Selector from "../Selector/Selector";

import searchIcon from "@Images/search.svg";
import closeIcon from "@Images/close.svg";
import "./Search.scss";

const Search: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const { filter } = useSelector<RootState, IProductsState>(
    (state) => state.products
  );

  const [localSearchValue, setLocalSearchValue] = useState<string>(
    filter.searchValue
  );

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setLocalSearchValue(event.target.value);
  };

  const startSearching = () => {
    if (pathname !== ERoutes.PRODUCTS_LIST) {
      navigate(ERoutes.PRODUCTS_LIST);
    }
    dispatch(changeSearch(localSearchValue));
  };

  const clearSearchValue = () => {
    dispatch(clearSearch());
  };

  useEffect(() => {
    const debounceTimer = setTimeout(startSearching, 500);
    return () => clearTimeout(debounceTimer);
  }, [localSearchValue]);

  useEffect(() => {
    setLocalSearchValue(filter.searchValue);
  }, [filter.searchValue]);

  return (
    <div className="search">
      <Selector />
      <form>
        <label className="search__label">
          <input
            className="search__input"
            type="text"
            placeholder="Search Products ..."
            value={localSearchValue}
            onChange={handleSearchChange}
          />
          {localSearchValue ? (
            <button
              className="search__clear"
              type="button"
              onClick={clearSearchValue}>
              <img src={closeIcon} alt="Close" />
            </button>
          ) : (
            <img className="search__icon" src={searchIcon} alt="Search" />
          )}
        </label>
      </form>
    </div>
  );
};

export default Search;
