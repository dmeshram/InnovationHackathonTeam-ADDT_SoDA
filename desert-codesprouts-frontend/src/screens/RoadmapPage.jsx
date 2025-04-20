import React from "react";
import styles from "./RoadmapPage.module.css";
import { useNavigate } from "react-router-dom";

const RoadmapPage = () => {
  const navigate = useNavigate();

  const roadmapItems = [
    { id: 1, title: "Programming Basics", status: "completed" },
    { id: 2, title: "UI Design", status: "in-progress" },
    { id: 3, title: "Machine Learning", status: "locked" },
    { id: 4, title: "Cybersecurity", status: "locked" },
  ];

  const getStatusStyle = (status) => {
    switch (status) {
      case "completed":
        return styles.completed;
      case "in-progress":
        return styles.inProgress;
      case "locked":
      default:
        return styles.locked;
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Learning Roadmap 🗺️</h1>
      <div className={styles.roadmap}>
        {roadmapItems.map((item) => (
          <div
            key={item.id}
            className={`${styles.module} ${getStatusStyle(item.status)}`}
            onClick={() => item.status !== "locked" && navigate("/dashboard")}
          >
            <h2>{item.title}</h2>
            <span className={styles.status}>{item.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoadmapPage;
