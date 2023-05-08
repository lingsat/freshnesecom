import React from "react";
import { Route, Routes } from "react-router-dom";
import ProductsListPage from "@/features/products/pages/productsListPage/ProductsListPage";
import ProductItemPage from "@/features/products/pages/productItemPage/ProductItemPage";
import CartPage from "@/features/products/pages/CartPage/CartPage";
import "./App.scss";

const App = () => {
  return (
    <div className="container">
      <header>Header</header>
      <main>
        <Routes>
          <Route path="/" element={<ProductsListPage />} />
          <Route path="/product/:id" element={<ProductItemPage />} />
          <Route path="/cart" element={<CartPage />} />
        </Routes>
      </main>
      <footer>Footer</footer>
    </div>
  );
};

export default App;
