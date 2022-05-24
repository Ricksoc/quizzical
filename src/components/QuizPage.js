import React from "react";

export default function QuizPage() {
  const questions = (
    <div className="quiz__section">
      <h2 className="quiz__question">What is the answer to this quesstion?</h2>
      <button className="quiz__answer">One</button>
      <button className="quiz__answer">Two</button>
      <button className="quiz__answer">Three</button>
      <button className="quiz__answer">Four</button>
    </div>
  );

  return (
    <div className="quiz__container">
      <div className="blob blob__top__quiz"></div>
      <div className="blob blob__bottom__quiz"></div>
      {questions}
      <button className="quiz__check">Check Answers</button>
    </div>
  );
}
