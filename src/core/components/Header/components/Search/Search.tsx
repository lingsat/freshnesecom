import React, { ChangeEvent, FC } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/store/store";
import { changeSearch, clearSearch } from "@/features/products/productsSlice";
import Selector from "@/core/components/Header/components/Selector/Selector";
import searchIcon from "@/assets/images/search.svg";
import closeIcon from "@/assets/images/close.svg";
import { IProductsState } from "@/features/products/productsSlice";
import "./Search.scss";

const Search: FC = () => {
  const { searchValue } = useSelector<RootState, IProductsState>(
    (state) => state.products
  );
  const dispatch = useDispatch<AppDispatch>();

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(changeSearch(event.target.value));
  };

  const clearSearchValue = () => {
    dispatch(clearSearch());
  };

  return (
    <div className="search">
      <Selector />
      <form>
        <label className="search__label">
          <input
            className="search__input"
            type="text"
            placeholder="Search Products, categories ..."
            value={searchValue}
            onChange={handleSearchChange}
          />
          {searchValue ? (
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
