import React, { FC } from "react";

import LinkItem from "@CommonComponents/LInkItem/LinkItem";

import "./LinksBlock.scss";

interface LinksBlockProps {
  title: string;
  links: string[];
}

const LinksBlock: FC<LinksBlockProps> = ({ title, links }) => {
  return (
    <li>
      <h3 className="footer__title">{title}</h3>
      <ul className="footer__block">
        {links.map((link, index) => (
          <li key={`link-${link}-${index}`}>
            <LinkItem title={link} />
          </li>
        ))}
      </ul>
    </li>
  );
};

export default LinksBlock;
