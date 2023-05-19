import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";

import { AppDispatch } from "@Store/store";
import { fetchProducts } from "@Products/productsSlice";
import Header from "@CoreComponents/Header/Header";
import Footer from "@CoreComponents/Footer/Footer";
import Home from "@ProductsPages/Home/Home";
import ProductsList from "@ProductsPages/ProductsList/ProductsList";
import ProductItem from "@ProductsPages/ProductItem/ProductItem";
import Cart from "@ProductsPages/Cart/Cart";
import NotFound from "@ProductsPages/NotFound/NotFound";

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
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductsList />} />
          <Route path="/products/:id" element={<ProductItem />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;
