import React, { useState } from "react";
import StartPage from "./StartPage";
import QuizPage from "./QuizPage";

export default function App() {
  const [startQuiz, setStartQuiz] = useState(false);
  const [questions, setQuestions] = useState([]);

  async function beginQuiz() {
    const response = await fetch("https://opentdb.com/api.php?amount=5");
    const data = await response.json();
    setQuestions(data.results);
    setStartQuiz((prevState) => !prevState);
  }

  return (
    <main>
      {/* <StartPage handleClick={beginQuiz} /> */}
      {startQuiz ? (
        <QuizPage handleClick={beginQuiz} questions={questions} />
      ) : (
        <StartPage handleClick={beginQuiz} />
      )}
    </main>
  );
}
