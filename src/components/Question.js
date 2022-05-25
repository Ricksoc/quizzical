import React from "react";
import { nanoid } from "nanoid";

export default function Question(props) {
  return (
    <button
      key={nanoid()}
      className="quiz__answer"
      name={props.questionNumber}
      value={props.answer}
      onClick={(event) => props.handleClick(event)}
    >
      {props.answer}
    </button>
  );
}
