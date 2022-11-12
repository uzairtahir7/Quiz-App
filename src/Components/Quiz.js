import React, { useEffect, useState, useMemo } from "react";

const Quiz = function ({
  question,
  answers,
  specialChar,
  playing,
  corrAns,
  again,
}) {
  const [selected, setSelected] = useState([]);
  console.log(selected);

  function shuffle(arr) {
    return arr.sort((a, b) => 0.5 - Math.random());
  }

  const shuffledAns = useMemo(() => {
    return shuffle(answers);
  }, []);

  useEffect(() => {
    if (again === true) {
      setSelected([]);
    }
  }, [again]);

  return (
    <div className="quiz-ctn">
      <h2 className="question">{specialChar(question)}</h2>
      {
        <p className="options">
          {shuffledAns.map((answer) => {
            return (
              <span
                onClick={() => {
                  return playing && setSelected(answer);
                }}
                key={answer}
                className={`option ${
                  playing && selected === answer ? "selected-ans" : ""
                }  ${
                  playing === false && corrAns === answer ? "correct-ans" : ""
                } ${
                  playing === false &&
                  selected === answer &&
                  corrAns !== selected
                    ? "wrong-ans"
                    : ""
                } `}
              >
                {specialChar(answer)}
              </span>
            );
          })}
        </p>
      }
      <div className="separator"></div>
    </div>
  );
};

export default Quiz;
