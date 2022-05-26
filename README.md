# Quizzical

[](./screenshot_start.png)

Quizzical is a simple Q&A game where the user ansers up to 10 questions to see how many they can get correct.

This project was coded as the capstone project of freeCodeCamp's intIntro to React course.

As extra credit I have added the ability to select between 1 and 10 questions and to choose from a subset of categories.

I am hosting the completed project on [Vercel](https://quizzical-green.vercel.app/)

## Built With
[React.js](https://reactjs.org/) </br>
[nanoid](https://www.npmjs.com/package/nanoid) </br>
[Open Trivia Database for the questions](https://opentdb.com/)

## What I learned
This is the most challenging project I have attempted so far. My initial structure did not make good enough use of objects or useState with too much code being pushed down to coponents rather than in App.js. This led me to a point where I was manipulating the DOM directly and losing content when components rendered. I refactored the code starting from the point of making an API call and then processing the returned information into an object that I could use as my base structure.

Of particular note for me on this project:

* css Class selction using an IF statement with true/false props.
* Using a controlled variable to limit the upper and lower value of a numerical input
* async await in React
* Manipulation of main object via useState Set function
* Refactoring to improve code as I went


### Acknowledgements
* Brian Ziroll from freeCodeCamp for the course
* An encoding of the Durstenfield shuffle which I borrowed to randomise where the correct answer appeared in the list of options.