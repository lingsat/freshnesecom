import React, { FC } from "react";

import { IReview } from "@Products/types/product";

import "./Reviews.scss";

interface ReviewsProps {
  reviews: IReview[];
}

const Reviews: FC<ReviewsProps> = ({ reviews }) => {
  if (!reviews.length) {
    return <p className="reviews__message">No reviews created yet!</p>;
  }

  return (
    <ul className="reviews">
      {reviews.map((review, index) => (
        <li
          key={`reviews-${review.authorName}-${index}`}
          className="reviews__item">
          <div className="reviews__block">
            <img
              src={review.authorImage}
              alt={review.authorName}
              className="reviews__image"
            />
            <h4 className="reviews__author">{review.authorName}</h4>
          </div>
          <p className="reviews__text">{`"${review.text}"`}</p>
        </li>
      ))}
    </ul>
  );
};

export default Reviews;
