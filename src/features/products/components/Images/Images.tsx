import React, { useState } from "react";

import { getSortedImages } from "@/utils/products";

import "./Images.scss";

const Images = () => {
  const [imagesArr, setImagesArr] = useState([
    "https://content2.rozetka.com.ua/goods/images/big/325629467.jpg",
    "https://m.media-amazon.com/images/I/61U6oC65TTL._AC_SL1500_.jpg",
    "https://media.wired.com/photos/6151f908ce82f4f072e06cb9/1:1/w_1388,h_1388,c_limit/Gear-9th-Gen-iPad-Review-top.jpg",
  ]);

  const handleImageClick = (imageIndex: number) => () => {
    const sortedImages = getSortedImages(imagesArr, imageIndex);
    setImagesArr(sortedImages);
  };

  return (
    <div className="images">
      <div className="images__data">
        <span>- 36 %</span>
        <span>Free shipping</span>
      </div>
      <div className="images__block">
        {imagesArr.map((imageSrc, index) => (
          <img
            key={`productImage-${index}`}
            className="img"
            src={imageSrc}
            alt="Product Image"
            onClick={handleImageClick(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Images;
