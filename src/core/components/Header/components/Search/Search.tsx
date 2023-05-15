import React, { ChangeEvent, FC, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/store/store";
import {
  changeSearch,
  clearSearch,
  IProductsState,
} from "@products/productsSlice";
import Selector from "@/core/components/Header/components/Selector/Selector";
import searchIcon from "@/assets/images/search.svg";
import closeIcon from "@/assets/images/close.svg";
import "./Search.scss";

const Search: FC = () => {
  const { filter } = useSelector<RootState, IProductsState>(
    (state) => state.products
  );
  const dispatch = useDispatch<AppDispatch>();

  const [localSearchValue, setLocalSearchValue] = useState<string>(
    filter.searchValue
  );

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setLocalSearchValue(event.target.value);
  };

  const startSearching = () => {
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
            placeholder="Search Products, categories ..."
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
