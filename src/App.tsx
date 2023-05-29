import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";

import { AppDispatch } from "@Store/store";
import { fetchProducts } from "@Products/productsSlice";
import { ERoutes } from "@/types/routes";
import Header from "@CoreComponents/Header/Header";
import BreadCrumbs from "@CoreComponents/BreadCrumbs/BreadCrumbs";
import Footer from "@CoreComponents/Footer/Footer";
import Home from "@Pages/Home/Home";
import ProductsList from "@Pages/ProductsList/ProductsList";
import ProductItem from "@Pages/ProductItem/ProductItem";
import Cart from "@Pages/Cart/Cart";
import NotFound from "@Pages/NotFound/NotFound";

import "./App.scss";

const App = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  return (
    <div className="container">
      <Header />
      <BreadCrumbs />
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
