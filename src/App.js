import React, { useState, useEffect } from "react";
import Quiz from "./Components/Quiz";

function App() {
  const [quizArr, setQuizArr] = useState([]);
  const [displayQuiz, setDisplayQuiz] = useState(false);
  const [playing, setPlaying] = useState(true);
  const [again, setAgain] = useState(false);
  const [newQuiz, setNewQuiz] = useState(false);

  console.log(quizArr);

  useEffect(() => {
    fetch(
      "https://opentdb.com/api.php?amount=5&difficulty=medium&type=multiple"
    )
      .then((res) => res.json())
      .then((data) => {
        setQuizArr(data.results);
      });
  }, [newQuiz]);

  function specialChar(str) {
    return str
      .replace(/(&quot;)/g, '"')
      .replace(/(&#039;)/g, "'")
      .replace(/(&uuml;)/g, "ü")
      .replace(/(&iacute;)/g, "í")
      .replace(/(&amp;)/g, "&")
      .replace(/(&lt;)/g, "<")
      .replace(/(&gt;)/g, ">")
      .replace(/(&eacute;)/g, "é");
  }

  const quizElements = quizArr.map((item) => {
    const answers = [...item.incorrect_answers, item.correct_answer];
    const corrAns = item.correct_answer;
    const incorrAns = item.incorrect_answers;

    return (
      <Quiz
        key={item.question}
        question={item.question}
        answers={answers}
        specialChar={specialChar}
        playing={playing}
        corrAns={corrAns}
        incorrAns={incorrAns}
        again={again}
      />
    );
  });

  function checkAnswers() {
    setAgain(false);
    setPlaying(false);
  }

  function playAgain() {
    setPlaying(true);
    setAgain(true);
    setNewQuiz(!newQuiz);
  }

  return (
    <main>
      {displayQuiz ? (
        <div className="start-quiz">
          {quizElements}
          {playing === true && (
            <button onClick={checkAnswers} className="check-btn btn">
              Check Answers
            </button>
          )}
          {playing === false && (
            <button onClick={playAgain} className="btn">
              Play Again
            </button>
          )}
        </div>
      ) : (
        <div className="no-quiz">
          <h1 className="main-title">Quizzical</h1>
          <p className="description">Do you want to start a Quiz?</p>
          <button
            onClick={() => setDisplayQuiz(true)}
            className="start-btn btn"
          >
            Start Quiz
          </button>
        </div>
      )}
    </main>
  );
}

export default App;
