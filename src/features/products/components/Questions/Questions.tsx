import React, { FC } from "react";

import "./Questions.scss";

const questionsList = [
  {
    question: "Is it possible to take this out of S mode?",
    answers: ["Yes, In fact (at 70) I turned it off in less than 2 minutes."],
  },
  {
    question:
      "Does it get very hot? I have an Acer a couple of years older that gets very hot.",
    answers: [
      "I've had mine on for a couple of years. Seems like typical room-temperature. Not even warm to the touch. (Aspire 5, Intel Core i5, Windows 10)",
      "No not bad. Im upgrading from an Aspire 1 and I used that for gaming FPS games, of course with lag but this does good too and dosenst get loud or hot",
    ],
  },
];

const Questions: FC = () => {
  return (
    <ul className="questions">
      {questionsList.map((questions, index) => (
        <li key={`question-${index}`} className="questions__item">
          <h4 className="questions__question">{questions.question}</h4>
          <ul className="questions__block">
            {questions.answers.map((answer, index) => (
              <li
                key={`answer-${index}`}
                className="questions__answer">{`"${answer}"`}</li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );
};

export default Questions;
