import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { AppDispatch, RootState } from "@Store/store";
import { fetchProducts } from "@Products/productsSlice";
import { IAuthState, selectAuth } from "@Auth/authSlice";
import { MESSAGES_TIMER } from "@/constants";
import { ERoutes } from "@/types/routes";
import Header from "@CoreComponents/Header/Header";
import BreadCrumbs from "@CoreComponents/BreadCrumbs/BreadCrumbs";
import Footer from "@CoreComponents/Footer/Footer";
import Home from "@Pages/Home/Home";
import ProductsList from "@Pages/ProductsList/ProductsList";
import ProductItem from "@Pages/ProductItem/ProductItem";
import Cart from "@Pages/Cart/Cart";
import Wishlist from "@Pages/Wishlist/Wishlist";
import Profile from "@Pages/Profile/Profile";
import NotFound from "@Pages/NotFound/NotFound";
import Auth from "@Auth/components/Auth/Auth";

import "./App.scss";

const App = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { pathname } = useLocation();
  const { showAuth } = useSelector<RootState, IAuthState>(selectAuth);

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
          <Route path={ERoutes.WISHLIST} element={<Wishlist />} />
          <Route path={ERoutes.PROFILE} element={<Profile />} />
          <Route path={ERoutes.NOT_FOUND} element={<NotFound />} />
        </Routes>
      </main>
      {pathname !== `/${ERoutes.CART}` && <Footer />}
      {showAuth && <Auth />}
      <ToastContainer position="bottom-center" autoClose={MESSAGES_TIMER} />
    </div>
  );
};

export default App;
