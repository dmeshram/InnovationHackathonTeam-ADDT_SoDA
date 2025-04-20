import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import questions from "./GameStages";
import styles from "./ProgrammingModule.module.css";
import { updateUserProgress } from "../../firebase/progress";
import { auth } from "../../firebase/firebase";

const StageGame = () => {
  const { id } = useParams();
  const stage = parseInt(id) - 1;
  const questionSet = questions[stage];
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState(null);
  const [progressPercent, setProgressPercent] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (questionSet?.length) {
      setProgressPercent(Math.round((current / questionSet.length) * 100));
    }
  }, [current, questionSet]);

  const handleAnswer = async (choice) => {
    setSelected(choice);
    if (choice === questionSet[current].answer) {
      setScore((prev) => prev + 1);
    }
    setTimeout(async () => {
      setSelected(null);
      if (current + 1 < questionSet.length) {
        setCurrent((prev) => prev + 1);
      } else {
        alert(`Stage ${id} complete! Score: ${score + (choice === questionSet[current].answer ? 1 : 0)} / ${questionSet.length}`);

        // Unlock next stage in Firebase
        const user = auth.currentUser;
        if (user) {
          await updateUserProgress(user.uid, {
            ["stage" + (stage + 2)]: true
          });
        }

        navigate("/programming");
      }
    }, 1000);
  };

  if (!questionSet) return <p>Stage not found.</p>;

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2>Stage {id}</h2>
        <div className={styles.progressBarContainer}>
          <div className={styles.progressBar} style={{ width: `${progressPercent}%` }} />
          <span className={styles.progressLabel}>{progressPercent}% Complete</span>
        </div>
        <p>{questionSet[current].question}</p>
        <div className={styles.choices}>
          {questionSet[current].choices.map((choice, i) => (
            <button
              key={i}
              onClick={() => handleAnswer(choice)}
              style={{
                backgroundColor:
                  selected === choice
                    ? choice === questionSet[current].answer
                      ? "green"
                      : "red"
                    : undefined,
              }}
            >
              {choice}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StageGame;
