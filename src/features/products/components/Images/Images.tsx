import React from "react";

import "./Images.scss";

const Images = () => {
  return (
    <div className="images">
      <div className="images__data">
        <span>- 36 %</span>
        <span>Free shipping</span>
      </div>
      <div className="images__block">
        <img
          className="img img--main"
          src="https://content2.rozetka.com.ua/goods/images/big/325629467.jpg"
          alt="Main"
        />
        <img
          className="img"
          src="https://content2.rozetka.com.ua/goods/images/big/325629467.jpg"
          alt="Main"
        />
        <img
          className="img"
          src="https://content2.rozetka.com.ua/goods/images/big/325629467.jpg"
          alt="Main"
        />
      </div>
    </div>
  );
};

export default Images;
