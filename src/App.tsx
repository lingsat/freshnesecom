import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";

import { AppDispatch } from "@Store/store";
import { fetchProducts } from "@Products/productsSlice";
import { ERoutes } from "@/types/routes";
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
          <Route path={ERoutes.HOME} element={<Home />} />
          <Route path={ERoutes.PRODUCTS_LIST} element={<ProductsList />} />
          <Route path={ERoutes.PRODUCT_ITEM} element={<ProductItem />} />
          <Route path={ERoutes.CART} element={<Cart />} />
          <Route path={ERoutes.NOT_FOUND} element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;
