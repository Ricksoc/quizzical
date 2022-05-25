import React, { useState, useEffect } from "react";
import { nanoid } from "nanoid";

export default function QuizPage(props) {
  // Durstenfield shuffle algorithm to randomise array of answers
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      let temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
  }

  // Select answer to question when clicked
  function selectAnswer(event) {
    const { name, value } = event.target;
    const elements = document.querySelectorAll(
      "[name=" + CSS.escape(name) + "]"
    );
    elements.forEach((el) => {
      if (el.value === value) {
        el.classList.add("selected");
      } else {
        el.classList.remove("selected");
      }
    });
  }

  // Initailise counter for question number
  let counter = 0;

  const quiz = props.questions.map((question) => {
    counter++;
    // Variable to store question number
    let questionNumber = `question${counter}`;

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
            <button
              key={nanoid()}
              className="quiz__answer"
              name={questionNumber}
              value={answer}
              onClick={selectAnswer}
            >
              {answer}
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
