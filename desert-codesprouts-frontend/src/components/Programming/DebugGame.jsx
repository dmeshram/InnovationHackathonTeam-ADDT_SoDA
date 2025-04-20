import React, { useState } from "react";
import styles from "./ProgrammingModule.module.css";

const questions = [
  {
    code: `let x = 5;
console.log(x)`,
    isCorrect: false,
    explanation: "Missing semicolon after console.log(x)"
  },
  {
    code: `const name = 'Alice';
console.log(name);`,
    isCorrect: true
  },
  {
    code: `function greet() {
  return 'Hi';
}`,
    isCorrect: true
  },
  {
    code: `if (x === 5) {
  console.log('Yes')`,
    isCorrect: false,
    explanation: "Missing closing curly brace for if block"
  }
];

const DebugGame = () => {
  const [step, setStep] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState("");
  const current = questions[step];

  const handleAnswer = (answer) => {
    const isCorrectAnswer = answer === current.isCorrect;
    if (isCorrectAnswer) setScore((prev) => prev + 1);
    setFeedback(
      isCorrectAnswer
        ? "✅ Correct!"
        : `❌ Incorrect. ${current.explanation || "Check syntax carefully."}`
    );
    setTimeout(() => {
      setFeedback("");
      if (step + 1 < questions.length) {
        setStep((prev) => prev + 1);
      } else {
        alert(`\u{1F389} Game Complete! Score: ${score + (isCorrectAnswer ? 1 : 0)} / ${questions.length}`);
      }
    }, 1500);
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2>Debug the Code</h2>
        <pre className={styles.code}>{current.code}</pre>
        <div className={styles.choices}>
          <button onClick={() => handleAnswer(true)}>✅ Code is Correct</button>
          <button onClick={() => handleAnswer(false)}>❌ Code is Buggy</button>
        </div>
        {feedback && <p>{feedback}</p>}
      </div>
    </div>
  );
};

export default DebugGame;
