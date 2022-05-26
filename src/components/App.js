import React, { useState } from "react";
import { nanoid } from "nanoid";
import StartPage from "./StartPage";
import Quiz from "./Quiz";

export default function App() {
  //Controls whether StartPage or Quiz render
  const [startQuiz, setStartQuiz] = useState(false);
  //Takes data from API in more useable form
  const [questions, setQuestions] = useState([]);
  //Flipped to true to initiate quiz evaluation
  const [scoreQuiz, setScoreQuiz] = useState(false);
  //Stores total of correct answer
  const [score, setScore] = useState(0);

  //Makes API request and forms data into more useable object
  async function beginQuiz() {
    const response = await fetch("https://opentdb.com/api.php?amount=5");
    const data = await response.json();
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
        };
      })
    );
    //Switch from rendering StartPage to Quiz
    setStartQuiz((prevState) => !prevState);
  }

  //Create array of question-answer blocks
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

  //Runs when answer button clicked.
  //Flips isSelected for clicked answer which controls dynamic className
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
          };
        } else {
          return question;
        }
      })
    );
  }

  /*Runs when "Check Answers" is clicked
  Iterates over questions state array and updates score if correct answer
  has been selected. Also flips scoreQuiz state*/
  function checkScore() {
    questions.forEach((question) => {
      question.answers.forEach((answer) => {
        if (question.correctAnswer === answer.answer && answer.isSelected) {
          setScore((prevScore) => prevScore + 1);
        }
      });
    });
    setScoreQuiz(true);
  }

  /*Runs when "Play Again" is clicked.
  Resets startQuiz, scoreQuiz and Score states*/
  function resetGame() {
    setStartQuiz(false);
    setScoreQuiz(false);
    setScore(0);
  }

  return (
    <main>
      {startQuiz ? (
        <div className="quiz__container">
          <div className="blob blob__top__quiz"></div>
          <div className="blob blob__bottom__quiz"></div>
          {quiz}
          <div className="footer">
            {scoreQuiz && (
              <h4 className="score">You scored {score}/5 correct answers</h4>
            )}
            <button
              className="quiz__check"
              onClick={scoreQuiz ? resetGame : checkScore}
            >
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
