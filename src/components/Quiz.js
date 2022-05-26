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
            // Apply highlighted style to answer based on correctness and if clicked
            className={
              props.scoreQuiz &&
              props.correctAnswer === answer.answer &&
              answer.isSelected
                ? "quiz__answer green"
                : props.scoreQuiz && answer.isSelected
                ? "quiz__answer red"
                : answer.isSelected
                ? "quiz__answer selected"
                : "quiz__answer"
            }
            value={answer.answer}
            // Pass back information needed to identify selected question and answer
            onClick={() => props.handleClick(props.questionId, answer.id)}
          >
            {answer.answer}
          </button>
        );
      })}
    </div>
  );
}
