import React, { FC } from "react";
import { Link } from "react-router-dom";
import "./LinkItem.scss";

interface LinkItemProps {
  title: string;
  hrefPath?: string;
}

const LinkItem: FC<LinkItemProps> = ({ title, hrefPath = "/" }) => {
  return (
    <Link to={hrefPath} className="link">
      {title}
    </Link>
  );
};

export default LinkItem;
