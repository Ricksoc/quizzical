import React, { useState } from "react";
import { nanoid } from "nanoid";
import StartPage from "./StartPage";
import Quiz from "./Quiz";

export default function App() {
  const [startQuiz, setStartQuiz] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [scoreQuiz, setScoreQuiz] = useState(true);

  async function beginQuiz() {
    const response = await fetch("https://opentdb.com/api.php?amount=5");
    const data = await response.json();
    // console.log(data.results);
    setQuestions(
      data.results.map((item) => {
        return {
          questionId: nanoid(),
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
          correct: false,
        };
      })
    );
    setStartQuiz((prevState) => !prevState);
  }

  const quiz = questions.map((question) => {
    return (
      <Quiz
        key={nanoid()}
        questionId={question.questionId}
        correctAnswer={question.correctAnswer}
        question={question.question}
        answers={question.answers}
        handleClick={handleSelected}
        correct={question.correct}
        scoreQuiz={scoreQuiz}
      />
    );
  });

  // console.log(quiz);

  // Durstenfield shuffle algorithm to randomise array of answers
  function shuffleArray(array) {
    // algorithm operates on original array => create new array to be returned
    // use opportunity to clean up text with .replace
    let arr = array.map((item) => {
      return {
        answer: item.replace(/&quot;/g, '"').replace(/&#039;/g, "'"),
        id: nanoid(),
        isSelected: false,
      };
    });
    for (let i = arr.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      let temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;
    }
    return arr;
  }

  function handleSelected(questionId, answerId) {
    setQuestions((prevQuestions) =>
      prevQuestions.map((question) => {
        // Select only the answers corresponding to a single question
        if (question.questionId === questionId) {
          return {
            ...question,
            answers: question.answers.map((ans) => {
              return ans.id === answerId
                ? { ...ans, isSelected: !ans.isSelected }
                : { ...ans, isSelected: false };
            }),
            correct:
              question.correctAnswer ===
              question.answers.find((ans) => ans.id === answerId).answer
                ? true
                : false,
          };
        } else {
          return question;
        }
      })
    );
  }

  return (
    <main>
      {/* <StartPage handleClick={beginQuiz} /> */}
      {startQuiz ? (
        <div className="quiz__container">
          <div className="blob blob__top__quiz"></div>
          <div className="blob blob__bottom__quiz"></div>
          {quiz}
          <div className="footer">
            {scoreQuiz && (
              <h4 className="score">You scored x/5 correct answers</h4>
            )}
            <button className="quiz__check">
              {scoreQuiz ? "Play Again" : "Check Answers"}
            </button>
          </div>
        </div>
      ) : (
        <StartPage handleClick={beginQuiz} />
      )}
    </main>
  );
}
