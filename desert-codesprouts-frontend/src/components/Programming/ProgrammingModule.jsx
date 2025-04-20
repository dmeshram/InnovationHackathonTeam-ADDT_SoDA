import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./ProgrammingModule.module.css";
import { getUserProgress } from "../../firebase/progress";
import { auth } from "../../firebase/firebase";

const ProgrammingModule = () => {
  const navigate = useNavigate();
  const [progress, setProgress] = useState({});
  const [loading, setLoading] = useState(true);

  const games = [
    { title: "Stage Quiz", path: "stage/1", key: "stage1" },
    { title: "Fill in the Blank", path: "fill", key: "stage2" },
    { title: "Code Sort", path: "sort", key: "stage3" },
    { title: "Debug Game", path: "debug", key: "stage4" },
    { title: "Memory Match", path: "memory", key: "stage5" },
    { title: "Code Typing", path: "type", key: "stage6" },
    { title: "Bug Hunt", path: "bug", key: "stage7" },
  ];

  useEffect(() => {
    const fetchProgress = async () => {
      const user = auth.currentUser;
      if (user) {
        let data = await getUserProgress(user.uid);

        // Automatically unlock the first stage if no progress yet
        if (!data || Object.keys(data).length === 0) {
          data = { stage1: true };
        }

        setProgress(data);
      }
      setLoading(false);
    };
    fetchProgress();
  }, []);

  const handleGameNavigation = (path) => {
    navigate(path);
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2>Programming Module</h2>
        <div className={styles.grid}>
          {games.map((game, index) => (
            <button
              key={index}
              className={styles.moduleButton}
              disabled={!progress[game.key]}
              onClick={() => handleGameNavigation(game.path)}
            >
              {game.title}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProgrammingModule;
