import React, { FC } from "react";

import "./Reviews.scss";

const reviewsList = [
  {
    authorName: "John Dou",
    authorImage:
      "https://www.portotheme.com/wordpress/porto/business-consulting3/wp-content/uploads/sites/204/2021/02/team-1.jpg",
    text: "Works good with basic games FoE, stuff like that. You get what u pay for. If looking for high end gaming setups, I'd suggest Alienware. Killer gaming setups, laptop & desktop.",
  },
  {
    authorName: "Alan Barkley",
    authorImage:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6-5GagR_L2PllzfIMhifve6QJKA5exZ4v9zNeBHIYwec0FYe_bK4TSHp1bqnXIH3Riig&usqp=CAU",
    text: "I've had mine on for a couple of years. Seems like typical room-temperature. Not even warm to the touch. (Aspire 5, Intel Core i5, Windows 10)",
  },
];

const Reviews: FC = () => {
  return (
    <ul className="reviews">
      {reviewsList.map((review, index) => (
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
