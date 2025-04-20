import React, { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Label,
} from "recharts";
import styles from "./ChartPage.module.css";
import { getUserProgress } from "../firebase/progress";
import { auth } from "../firebase/firebase";

const COLORS = ["#4caf50", "#ff9800", "#2196f3", "#9c27b0"];

const ChartPage = () => {
  const [moduleData, setModuleData] = useState({});

  useEffect(() => {
    const fetchProgress = async () => {
      const user = auth.currentUser;
      if (user) {
        const progress = await getUserProgress(user.uid);

        // Dynamic stage keys based on naming pattern "stage1", "stage2", etc.
        const keys = Object.keys(progress || {});
        const total = keys.length;
        const completed = keys.filter(k => progress[k]).length;
        const remaining = total - completed;

        setModuleData({
          programming: [
            { name: "Completed", value: completed },
            { name: "Remaining", value: remaining < 0 ? 0 : remaining },
          ],
          ui: [
            { name: "Completed", value: 2 },
            { name: "Remaining", value: 3 },
          ],
          ml: [
            { name: "Completed", value: 1 },
            { name: "Remaining", value: 4 },
          ],
          cybersecurity: [
            { name: "Completed", value: 4 },
            { name: "Remaining", value: 1 },
          ],
          summary: [
            { name: "Programming", value: completed },
            { name: "UI", value: 2 },
            { name: "ML", value: 1 },
            { name: "Cyber", value: 4 },
          ]
        });
      }
    };

    fetchProgress();
  }, []);

  const renderChart = (title, data, colorIndex) => (
    <div className={styles.chartCard}>
      <h3 className={styles.chartTitle}>{title}</h3>
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={80}
            fill="#8884d8"
            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[(index + colorIndex) % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>📊 Module Progress Overview</h1>
      <div className={styles.grid}>
        {renderChart("Programming", moduleData.programming || [], 0)}
        {renderChart("UI Design", moduleData.ui || [], 1)}
        {renderChart("Machine Learning", moduleData.ml || [], 2)}
        {renderChart("Cybersecurity", moduleData.cybersecurity || [], 3)}
        {renderChart("Combined Summary", moduleData.summary || [], 0)}
      </div>
    </div>
  );
};

export default ChartPage;
