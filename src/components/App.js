import React, { useState } from "react";
// import { nanoid } from "nanoid";
import StartPage from "./StartPage";
import Quiz2 from "./Quiz2";

export default function App2() {
  //Stores number of questions for quiz
  const [noQuestions, setNoQuestions] = useState(5);
  //Stores category API code
  const [category, setCategory] = useState("");
  //Controls whether StartPage or Quiz render
  const [startQuiz, setStartQuiz] = useState(false);

  //Take input from StartPage for API call
  function chooseQuiz(event) {
    const { name, value } = event.target;
    //Control number of questions to be 1-10
    if (name === "noQuestions") {
      if (value < 1) {
        setNoQuestions(1);
      } else if (value > 10) {
        setNoQuestions(10);
      } else {
        setNoQuestions(value);
      }
    } else {
      setCategory(value);
    }
  }

  /*Runs when "Play Again" is clicked.
  Resets startQuiz, scoreQuiz and Score states*/
  function resetQuiz() {
    setStartQuiz(false);
    setNoQuestions(5);
    setCategory("");
  }

  return (
    <main>
      {startQuiz ? (
        <Quiz2
          category={category}
          noQuestions={noQuestions}
          resetQuiz={resetQuiz}
        />
      ) : (
        <StartPage
          handleClick={() => setStartQuiz((prevState) => !prevState)}
          handleChange={chooseQuiz}
          noQuestions={noQuestions}
          category={category}
        />
      )}
    </main>
  );
}
