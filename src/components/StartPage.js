import React from "react";

export default function StartPage(props) {
  return (
    <div className="start__container">
      <div className="blob blob__top__start"></div>
      <div className="blob blob__bottom__start"></div>
      <h1 className="start__title">Quizzical</h1>
      <div className="apiInput">
        <label htmlFor="noQuestions" className="apiInput__label">
          Choose 1-10 questions
        </label>
        <input
          className="apiInput__input"
          type="number"
          name="noQuestions"
          id="noQuestions"
          min="1"
          max="10"
          value={props.noQuestions}
          onChange={props.handleChange}
        />
      </div>
      <button className="button__start" onClick={props.handleClick}>
        Start Quiz
      </button>
    </div>
  );
}
