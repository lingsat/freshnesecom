import React, { ChangeEvent, FC, useState } from "react";
import Selector from "@/core/components/Header/components/Selector/Selector";
import searchIcon from "@/assets/images/search.svg";
import closeIcon from "@/assets/images/close.svg";
import "./Search.scss";

const Search: FC = () => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [searchCategory, setSearchCategory] =
    useState<string>("All categories");

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const clearSearch = () => {
    setSearchValue("");
  };

  return (
    <div className="search">
      <Selector title={searchCategory} setSearchCategory={setSearchCategory} />
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
              onClick={clearSearch}>
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
