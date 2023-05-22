import React, { ChangeEvent, FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import { AppDispatch, RootState } from "@Store/store";
import {
  changeSearch,
  IProductsState,
  selectProducts,
} from "@Products/productsSlice";
import { debounceDelay } from "@/constants";
import { ERoutes } from "@/types/routes";

import closeIcon from "@Images/close.svg";
import searchIcon from "@Images/search.svg";

import Selector from "../Selector/Selector";
import "./Search.scss";

const Search: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { filter } = useSelector<RootState, IProductsState>(selectProducts);

  const [isMount, setIsMount] = useState<boolean>(false);
  const [localSearchValue, setLocalSearchValue] = useState<string>(
    filter.searchValue
  );

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setLocalSearchValue(event.target.value);
  };

  const startSearching = () => {
    if (pathname !== ERoutes.PRODUCTS_LIST && localSearchValue) {
      navigate(ERoutes.PRODUCTS_LIST);
    }
    dispatch(changeSearch(localSearchValue));
  };

  const clearSearchValue = () => {
    setLocalSearchValue("");
  };

  useEffect(() => {
    if (isMount) {
      const debounceTimer = setTimeout(startSearching, debounceDelay);
      return () => clearTimeout(debounceTimer);
    } else {
      setIsMount(true);
    }
  }, [localSearchValue]);

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
