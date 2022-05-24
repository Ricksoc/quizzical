import React, { useState, useEffect } from "react";
import StartPage from "./StartPage";
import QuizPage from "./QuizPage";

export default function App() {
  const [startQuiz, setStartQuiz] = useState(false);

  function beginQuiz() {
    setStartQuiz((prevState) => !prevState);
    console.log(startQuiz);
  }

  return (
    <main>
      {/* <StartPage handleClick={beginQuiz} /> */}
      {startQuiz ? (
        <QuizPage handleClick={beginQuiz} />
      ) : (
        <StartPage handleClick={beginQuiz} />
      )}
    </main>
  );
}
