import React, { FC } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { IProductsState } from "../../productsSlice";
import {
  getBrands,
  getCategoriesWithCount,
  getFilteredProducts,
  getMaxPrice,
} from "@/utils/products.utils";
import ListNavigation from "@products/components/ListNavigation/ListNavigation";
import ListFilter from "@products/components/ListFilter/ListFilter";
import ProductsList from "@products/components/ProductsList/ProductsList";
import "./ProductsListPage.scss";

const ProductsListPage: FC = () => {
  const { products, searchValue, category } = useSelector<
    RootState,
    IProductsState
  >((state) => state.products);

  const filteredProducts = getFilteredProducts(products, category, searchValue);
  const categories = getCategoriesWithCount(products);
  const brands = getBrands(products);
  const maxPrice = getMaxPrice(products);

  return (
    <div className="products-list">
      <ListNavigation />
      <div className="products-list__header">
        <h2 className="products-list__title">{category || "All Products"}</h2>
        <div className="products-list__stat">
          <p>{filteredProducts.length}</p>
          <span>Products</span>
        </div>
      </div>
      <div className="products-list__main">
        <ListFilter
          categories={categories}
          brands={brands}
          maxPrice={maxPrice}
        />
        <ProductsList filteredProducts={filteredProducts} />
      </div>
    </div>
  );
};

export default ProductsListPage;
