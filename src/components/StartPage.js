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
          className="apiInput__number"
          type="number"
          name="noQuestions"
          id="noQuestions"
          value={props.noQuestions}
          onChange={props.handleChange}
        />
      </div>
      <div className="apiInput">
        <label htmlFor="category" className="apiInput__label">
          Choose category
        </label>
        <select
          name="category"
          id="category"
          className="apiInput__category"
          onChange={props.handleChange}
          value={props.category}
        >
          <option value="">Any</option>
          <option value="&category=9">General Knowledge</option>
          <option value="&category=17">Science and Nature</option>
          <option value="&category=18">Computers</option>
          <option value="&category=21">Sports</option>
          <option value="&category=23">History</option>
        </select>
      </div>
      <button className="button__start" onClick={props.handleClick}>
        Start Quiz
      </button>
    </div>
  );
}
