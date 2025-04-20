import React, { useState } from "react";
import styles from "./ProgrammingModule.module.css";

const questions = [
  {
    code: ["let ", " = 5;\n", "console.log(", ");"],
    blanks: [
      { id: 0, options: ["x", "5", "let"], correct: "x" },
      { id: 1, options: ["x", "5", "console"], correct: "x" }
    ]
  },
  {
    code: ["const arr = [1, 2, 3];\n", "console.", "(arr.length);"],
    blanks: [
      { id: 0, options: ["log", "length", "push"], correct: "log" }
    ]
  }
];

const FillInBlankGame = () => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(0);
  const current = questions[step];

  const handleSelect = (blankId, value) => {
    setAnswers((prev) => ({ ...prev, [blankId]: value }));
  };

  const handleSubmit = () => {
    let correctCount = 0;
    current.blanks.forEach((blank) => {
      if (answers[blank.id] === blank.correct) {
        correctCount++;
      }
    });
    setScore((prev) => prev + correctCount);
    if (step + 1 < questions.length) {
      setAnswers({});
      setStep((prev) => prev + 1);
    } else {
      alert(`\u{1F389} Game Complete! Score: ${score + correctCount}/${questions.reduce((a, q) => a + q.blanks.length, 0)}`);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2> Fill in the Blanks</h2>
        <pre className={styles.code}>
          {current.code.map((segment, i) => (
            <React.Fragment key={i}>
              {segment}
              {current.blanks[i] && (
                <select
                  className={styles.dropdown}
                  value={answers[i] || ""}
                  onChange={(e) => handleSelect(i, e.target.value)}
                >
                  <option value="" disabled>
                    ⬇️ Choose
                  </option>
                  {current.blanks[i].options.map((opt, idx) => (
                    <option key={idx} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              )}
            </React.Fragment>
          ))}
        </pre>
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
};

export default FillInBlankGame;
