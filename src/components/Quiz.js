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
            className="quiz__answer"
            // name={props.questionNumber}
            value={answer}
            // onClick={(event) => props.handleClick(event)}
          >
            {answer}
          </button>
        );
      })}
    </div>
  );
}
