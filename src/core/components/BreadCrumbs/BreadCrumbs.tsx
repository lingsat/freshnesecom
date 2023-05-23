import React, { FC } from "react";
import { useSelector } from "react-redux";
import { Link, matchPath, useLocation } from "react-router-dom";

import { RootState } from "@Store/store";
import { IProductsState, selectProducts } from "@Products/productsSlice";
import { generateBreadcrumbs } from "@/utils/breadcrumbs";
import { getSingleProduct } from "@/utils/products";
import { ERoutes } from "@/types/routes";

import "./BreadCrumbs.scss";

const BreadCrumbs: FC = () => {
  const { pathname } = useLocation();
  const match = matchPath({ path: ERoutes.PRODUCT_ITEM }, pathname);

  const { products } = useSelector<RootState, IProductsState>(selectProducts);

  const product = getSingleProduct(products, match?.params.id);
  const links = generateBreadcrumbs(pathname, product?.title);

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
