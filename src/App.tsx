import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "./store/store";
import { fetchProducts } from "./features/products/productsSlice";
import Header from "@/core/components/Header/Header";
import Footer from "@/core/components/Footer/Footer";
import HomePage from "@products/pages/HomePage/HomePage";
import ProductsListPage from "@products/pages/ProductsListPage/ProductsListPage";
import ProductItemPage from "@products/pages/ProductItemPage/ProductItemPage";
import CartPage from "@products/pages/CartPage/CartPage";
import NotFoundPage from "@products/pages/NotFoundPage/NotFoundPage";
import "./App.scss";

const App = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  return (
    <div className="container">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductsListPage />} />
          <Route path="/products/:id" element={<ProductItemPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;
