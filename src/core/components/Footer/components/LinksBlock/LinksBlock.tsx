import React, { FC } from "react";
import LinkItem from "@/common/components/LInkItem/LinkItem";
import "./LinksBlock.scss";

interface LinksBlockProps {
  title: string;
  links: string[];
}

const LinksBlock: FC<LinksBlockProps> = ({ title, links }) => {
  return (
    <li>
      <ul className="footer__block">
        <li>
          <h3 className="footer__title">{title}</h3>
        </li>
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
