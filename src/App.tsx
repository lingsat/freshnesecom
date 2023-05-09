import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./features/products/pages/HomePage/HomePage";
import ProductsListPage from "@/features/products/pages/ProductsListPage/ProductsListPage";
import ProductItemPage from "@/features/products/pages/ProductItemPage/ProductItemPage";
import CartPage from "@features/products/pages/CartPage/CartPage";
import NotFoundPage from "./features/products/pages/NotFoundPage/NotFoundPage";
import "./App.scss";

const App = () => {
  return (
    <div className="container">
      <header>Header</header>
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductsListPage />} />
          <Route path="/products/:id" element={<ProductItemPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <footer>Footer</footer>
    </div>
  );
};

export default App;
