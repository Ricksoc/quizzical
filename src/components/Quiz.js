import React from "react";
import { nanoid } from "nanoid";

export default function Quiz(props) {
  return (
    <div className="quiz__section" key={props.id}>
      <h2 className="quiz__question">{props.question}</h2>
      {props.answers.map((answer) => {
        return (
          <button
            key={nanoid()}
            className={
              answer.isSelected ? "quiz__answer selected" : "quiz__answer"
            }
            value={answer.answer}
            onClick={() =>
              props.handleClick(props.id, answer.id, answer.answer)
            }
          >
            {answer.answer}
          </button>
        );
      })}
    </div>
  );
}
