import React, { useState, useEffect } from "react";
import { nanoid } from "nanoid";

export default function QuizPage(props) {
  console.log(props.questions);

  // Durstenfield shuffle algorithm to randomise array of answers
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      let temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
  }

  const quiz = props.questions.map((question) => {
    // Get array of answers and shuffle it
    const answers = [];
    answers.push(
      question.correct_answer.replace(/&quot;/g, '"').replace(/&#039;/g, "'")
    );
    question.incorrect_answers.forEach((answer) => {
      answers.push(answer.replace(/&quot;/g, '"').replace(/&#039;/g, "'"));
    });
    shuffleArray(answers);

    return (
      <div className="quiz__section" key={nanoid()}>
        <h2 className="quiz__question">
          {question.question.replace(/&quot;/g, '"').replace(/&#039;/g, "'")}
        </h2>
        {answers.map((answer) => {
          return (
            <button className="quiz__answer">
              {answer.replace(/&quot;/g, '"').replace(/&#039;/g, "'")}
            </button>
          );
        })}
      </div>
    );
  });

  return (
    <div className="quiz__container">
      <div className="blob blob__top__quiz"></div>
      <div className="blob blob__bottom__quiz"></div>
      {quiz}
      <button className="quiz__check" onClick={props.handleClick}>
        Check Answers
      </button>
    </div>
  );
}
