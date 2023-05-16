import React, { FC } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { IProductsState } from "@products/productsSlice";
import { getFilteredProducts } from "@/utils/products.utils";
import ListNavigation from "@products/components/ListNavigation/ListNavigation";
import ListFilter from "@products/components/ListFilter/ListFilter";
import ProductsList from "@products/components/ProductsList/ProductsList";
import LoadinSpinner from "@/common/components/LoadingSpinner/LoadingSpinner";
import "./ProductsListPage.scss";
import ListSort from "../../components/ListSort/ListSort";

const ProductsListPage: FC = () => {
  const { products, loading, filter } = useSelector<RootState, IProductsState>(
    (state) => state.products
  );

  const filteredProducts = getFilteredProducts(products, filter);

  return (
    <div className="products-list">
      <ListNavigation />
      <div className="products-list__header">
        <h2 className="products-list__title">
          {filter.category || "All Products"}
        </h2>
        <div className="products-list__stat">
          <p>{filteredProducts.length}</p>
          <span>Products</span>
        </div>
      </div>
      <ListSort />
      {loading ? (
        <LoadinSpinner />
      ) : (
        <div className="products-list__main">
          <ListFilter />
          <ProductsList filteredProducts={filteredProducts} />
        </div>
      )}
    </div>
  );
};

export default ProductsListPage;
