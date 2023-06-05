import React, { FC, useState } from "react";

import { getSortedImages } from "@Products/utils/products";

import "./Images.scss";

interface ImagesProps {
  images: string[];
  discount: number;
  freeShipping: boolean;
}

const Images: FC<ImagesProps> = ({ images, discount, freeShipping }) => {
  const [imagesArr, setImagesArr] = useState<string[]>(images);

  const handleImageClick = (imageIndex: number) => () => {
    const sortedImages = getSortedImages(imagesArr, imageIndex);
    setImagesArr(sortedImages);
  };

  return (
    <div className="images">
      <div className="images__data">
        <span>- {discount} %</span>
        <span>{freeShipping ? "Free" : "Payed"} shipping</span>
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
