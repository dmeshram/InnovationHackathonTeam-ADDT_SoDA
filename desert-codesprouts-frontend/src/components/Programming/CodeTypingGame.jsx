import React, { useState } from "react";
import styles from "./ProgrammingModule.module.css";

const questions = [
  {
    prompt: "Complete the function declaration:",
    code: "function ____() { return 'Hello'; }",
    answer: "greet"
  },
  {
    prompt: "Complete the variable initialization:",
    code: "let x = ____;",
    answer: "10"
  },
  {
    prompt: "Complete the array:",
    code: "const colors = ['red', 'green', ____];",
    answer: "'blue'"
  }
];

const CodeTypingGame = () => {
  const [step, setStep] = useState(0);
  const [input, setInput] = useState("");
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState("");
  const current = questions[step];

  const handleSubmit = () => {
    const cleanedInput = input.trim();
    const isCorrect = cleanedInput === current.answer;
    if (isCorrect) setScore((prev) => prev + 1);
    setFeedback(isCorrect ? "✅ Correct!" : `❌ Incorrect. Answer: ${current.answer}`);
    setTimeout(() => {
      setFeedback("");
      setInput("");
      if (step + 1 < questions.length) {
        setStep((prev) => prev + 1);
      } else {
        alert(`\u{1F389} Game Complete! Score: ${score + (isCorrect ? 1 : 0)} / ${questions.length}`);
      }
    }, 2000);
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2>⌨️ Code Typing Challenge</h2>
        <p>{current.prompt}</p>
        <pre className={styles.code}>{current.code}</pre>
        <input
          className={styles.input}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your answer here"
        />
        <button onClick={handleSubmit}>Submit</button>
        {feedback && <p>{feedback}</p>}
      </div>
    </div>
  );
};

export default CodeTypingGame;
