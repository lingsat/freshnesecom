import React, { FC } from "react";
import { Link } from "react-router-dom";
import "./Tag.scss";

interface TagProps {
  title: string;
  hrefPath?: string;
}

const Tag: FC<TagProps> = ({ title, hrefPath = "/" }) => {
  return (
    <Link to={hrefPath} className="tag">
      {title}
    </Link>
  );
};

export default Tag;
