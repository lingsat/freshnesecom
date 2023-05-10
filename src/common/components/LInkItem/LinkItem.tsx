import React, { FC } from "react";
import { Link } from "react-router-dom";
import "./LinkItem.scss";

interface LinkItemProps {
  title: string;
  hrefPath?: string;
  type?: "normal" | "small";
}

const LinkItem: FC<LinkItemProps> = ({
  title,
  hrefPath = "/",
  type = "normal",
}) => {
  return (
    <Link
      to={hrefPath}
      className={`link ${type === "small" ? "link--small" : ""}`}>
      {title}
    </Link>
  );
};

export default LinkItem;
