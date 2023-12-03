import React, { useState, useEffect } from "react";

function Question({ question, onAnswered }) {
  const [timeRemaining, setTimeRemaining] = useState(10);

  useEffect(() => {
    // This function will be called when the component mounts
    const timer = setTimeout(() => {
      // Decrease the time remaining by 1 every second
      setTimeRemaining((prevTime) => Math.max(0, prevTime - 1));
    }, 1000);

    // Clean up the timer when the component unmounts or when timeRemaining hits 0
    return () => clearTimeout(timer);
  }, [timeRemaining]); // Add timeRemaining as a dependency

  useEffect(() => {
    // Check if timeRemaining has reached 0
    if (timeRemaining === 0) {
      // Reset timeRemaining to 10 seconds
      setTimeRemaining(10);
      // Call the onAnswered callback with a value of false
      onAnswered(false);
    }
  }, [timeRemaining, onAnswered]); // Add timeRemaining and onAnswered as dependencies

  function handleAnswer(isCorrect) {
    // Reset timeRemaining to 10 seconds
    setTimeRemaining(10);
    // Call the onAnswered callback with the provided value
    onAnswered(isCorrect);
  }

  const { id, prompt, answers, correctIndex } = question;

  return (
    <>
      <h1>Question {id}</h1>
      <h3>{prompt}</h3>
      {answers.map((answer, index) => {
        const isCorrect = index === correctIndex;
        return (
          <button key={answer} onClick={() => handleAnswer(isCorrect)}>
            {answer}
          </button>
        );
      })}
      <h5>{timeRemaining} seconds remaining</h5>
    </>
  );
}

export default Question;
