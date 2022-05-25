import React, { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import Answer from "./Answer";

export default function QuizPage(props) {
  //Initialise array for storing answers and correct answers
  const [answerArray, setAnswerArray] = useState([]);

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
  //Function will highlight clicked answer for each question on the page

  function selectAnswer(event) {
    const { name, value } = event.target;

    // Select only the answers associated with a single question
    const elements = document.querySelectorAll(
      "[name=" + CSS.escape(name) + "]"
    );

    // Add selected style to clicked answer, remove from others
    elements.forEach((el) => {
      if (el.value === value) {
        el.classList.add("selected");
      } else {
        el.classList.remove("selected");
      }
    });

    // setAnswerArray((prevAnswers) => ({
    //   ...prevAnswers,
    //   [name]: value,
    // }));
  }
  // console.log(answerArray);

  // Initailise counter for question number
  let counter = 0;

  // Create question-answer blocks

  useEffect(() => {});
  const quiz = props.questions.map((question) => {
    counter++;
    // Variable to store question number
    let questionNumber = `question${counter}`;

    // Get array of answers for the question and shuffle it
    const answers = [];
    answers.push(
      question.correct_answer.replace(/&quot;/g, '"').replace(/&#039;/g, "'")
    );
    question.incorrect_answers.forEach((answer) => {
      answers.push(answer.replace(/&quot;/g, '"').replace(/&#039;/g, "'"));
    });
    shuffleArray(answers);

    // Return the question-answer block
    return (
      <div className="quiz__section" key={nanoid()}>
        <h2 className="quiz__question">
          {question.question.replace(/&quot;/g, '"').replace(/&#039;/g, "'")}
        </h2>
        {answers.map((answer) => {
          return (
            <Answer
              key={nanoid()}
              className="quiz__answer"
              questionNumber={questionNumber}
              answer={answer}
              handleClick={selectAnswer}
            />
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
