import React, { FC } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";

import { RootState } from "@Store/store";
import { IProductsState, selectProducts } from "@Products/productsSlice";
import { generateBreadcrumbs } from "@/utils/breadcrumbs";

import "./BreadCrumbs.scss";

const BreadCrumbs: FC = () => {
  const { pathname } = useLocation();
  const { singleProduct, isSingleLoading } = useSelector<
    RootState,
    IProductsState
  >(selectProducts);

  const links = generateBreadcrumbs(pathname, singleProduct?.title);

  if (isSingleLoading) {
    return <p className="list-nav__loading">Loading ...</p>;
  }

  return (
    <ul className="list-nav">
      {links.map((link, index) => (
        <li key={`breadcrumb-${link.text}-${index}`} className="list-nav__item">
          <Link className="list-nav__link" to={link.path}>
            {link.text}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default BreadCrumbs;
