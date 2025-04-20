import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './DashboardPage.module.css';
import Nav from '../screens/Nav'; 
import RoadmapPage from './RoadmapPage';
import CalendarPage from './CalendarPage'; 
import ChartPage from './ChartPage';

const DashboardPage = () => {
  const navigate = useNavigate();

  const handleClick = (label) => {
    switch (label) {
      case 'Programming':
        navigate('/programming'); // ✅ This is your ProgrammingModule.jsx entry point
        break;
      case 'UI Design':
        navigate('/ui-design');
        break;
      case 'Machine Learning':
        navigate('/machine-learning');
        break;
      case 'Cybersecurity':
        navigate('/cybersecurity');
        break;
      default:
        alert('Coming soon!');
    }
  };

  return (
    <div className={styles.dashboard}>
      <Nav />

      <div className={styles.topRowCards}>
        <div className={styles.cardWidget}>
          <RoadmapPage />
        </div>
        <div className={styles.cardWidget}>
          <CalendarPage />
        </div>
        <div className={styles.cardWidget}>
          <ChartPage />
        </div>
      </div>

      <div className={styles.bottomRow}>
        <div className={styles.buttonCard}>
          <h2>Modules</h2>
          <div className={styles.buttonGroup}>
            <button className={styles.programming} onClick={() => handleClick('Programming')}>
              Programming
            </button>
            <button className={styles.uiDesign} onClick={() => handleClick('UI Design')}>
              UI Design
            </button>
            <button className={styles.machineLearning} onClick={() => handleClick('Machine Learning')}>
              Machine Learning
            </button>
            <button className={styles.cybersecurity} onClick={() => handleClick('Cybersecurity')}>
              Cybersecurity
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
