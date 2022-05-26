import React from "react";
import { nanoid } from "nanoid";

export default function Quiz(props) {
  return (
    <div className="quiz__section" key={props.questionId}>
      <h2 className="quiz__question">{props.question}</h2>
      {props.answers.map((answer) => {
        return (
          <button
            key={nanoid()}
            // Apply highlighted style to clicked answer
            className={
              answer.isSelected ? "quiz__answer selected" : "quiz__answer"
            }
            value={answer.answer}
            // Pass back information needed to identify selected question and answer
            onClick={() =>
              props.handleClick(props.questionId, answer.id)
            }
          >
            {answer.answer}
          </button>
        );
      })}
    </div>
  );
}
