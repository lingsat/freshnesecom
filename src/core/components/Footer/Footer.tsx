import React, { FC } from "react";
import { useSelector } from "react-redux";

import { RootState } from "@Store/store";
import { IProductsState, selectProducts } from "@Products/productsSlice";
import { getTags } from "@/utils/products";
import Tag from "@CommonComponents/Tag/Tag";
import LinksBlock from "./components/LinksBlock/LinksBlock";
import { footerLinks } from "@/mock/footerLinks";

import "./Footer.scss";

const linksBlockArr = Object.keys(footerLinks);

const Footer: FC = () => {
  const { products } = useSelector<RootState, IProductsState>(selectProducts);

  const tags = getTags(products);

  return (
    <footer className="footer">
      <ul className="footer__links">
        {linksBlockArr.map((block, index) => (
          <LinksBlock
            key={`block-${block}-${index}`}
            title={block}
            links={footerLinks[block as keyof typeof footerLinks]}
          />
        ))}
      </ul>
      <div className="footer__tags">
        <h3 className="footer__title">Product tags</h3>
        <ul className="tags__block">
          {tags.map((tag, index) => (
            <Tag key={`tag-${tag}-${index}`} title={tag} />
          ))}
        </ul>
      </div>
      <p className="footer__text">Copyright &copy; 2020 petrbilek.com</p>
    </footer>
  );
};

export default Footer;
