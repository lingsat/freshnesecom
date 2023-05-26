import React, { FC } from "react";

import { IQuestion } from "@Products/types/product";

import "./Questions.scss";

interface QuestionsProps {
  questions: IQuestion[];
}

const Questions: FC<QuestionsProps> = ({ questions }) => {
  if (!questions.length) {
    return <p className="questions__message">No questions asked yet!</p>;
  }

  return (
    <ul className="questions">
      {questions.map((questions, index) => (
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
