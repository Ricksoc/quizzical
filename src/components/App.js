import React, { useState } from "react";
import { nanoid } from "nanoid";
import StartPage from "./StartPage";
import Quiz from "./Quiz";

export default function App() {
  const [startQuiz, setStartQuiz] = useState(false);
  const [questions, setQuestions] = useState([]);

  async function beginQuiz() {
    const response = await fetch("https://opentdb.com/api.php?amount=5");
    const data = await response.json();
    // console.log(data.results);
    setQuestions(
      data.results.map((item) => {
        return {
          id: item.id,
          correctAnswer: item.correct_answer
            .replace(/&quot;/g, '"')
            .replace(/&#039;/g, "'"),
          question: item.question
            .replace(/&quot;/g, '"')
            .replace(/&#039;/g, "'"),
          answers: shuffleArray([
            ...item.incorrect_answers,
            item.correct_answer,
          ]),
        };
      })
    );
    setStartQuiz((prevState) => !prevState);
  }

  const quiz = questions.map((question) => {
    return (
      <Quiz
        key={nanoid()}
        correctAnswer={question.correctAnswer}
        question={question.question}
        answers={question.answers}
      />
    );
  });

  // console.log(quiz);

  return (
    <main>
      {/* <StartPage handleClick={beginQuiz} /> */}
      {startQuiz ? (
        <div className="quiz__container">
          <div className="blob blob__top__quiz"></div>
          <div className="blob blob__bottom__quiz"></div>
          {quiz}
          <button className="quiz__check">Check Answers</button>
        </div>
      ) : (
        <StartPage handleClick={beginQuiz} />
      )}
    </main>
  );
}

// Durstenfield shuffle algorithm to randomise array of answers
function shuffleArray(array) {
  // algorithm operates on original array => create new array to be returned
  // use opportunity to clean up text with .replace
  let arr = array.map((item) =>
    item.replace(/&quot;/g, '"').replace(/&#039;/g, "'")
  );
  for (let i = arr.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }
  return arr;
}
