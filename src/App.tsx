import React from "react";
import { Route, Routes } from "react-router-dom";
import ProductsList from "@/features/products/pages/productsList/ProductsList";
import ProductItem from "@/features/products/pages/productItem/ProductItem";
import "./App.scss";

const App = () => {
  return (
    <div className="container">
      <header>Header</header>
      <main>
        <Routes>
          <Route path="/" element={<ProductsList />} />
          <Route path="/:id" element={<ProductItem />} />
        </Routes>
      </main>
      <footer>Footer</footer>
    </div>
  );
};

export default App;
