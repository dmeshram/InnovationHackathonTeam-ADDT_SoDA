import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import RegisterPage from "./screens/RegisterPage";
import LoginPage from "./screens/LoginPage";
import ForgotPasswordPage from "./screens/ForgotPasswordPage";
// import Dashboard from "./screens/Dashboard";
import { auth } from "./firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useState } from 'react';
import StartScreen from './components/StartScreen';
import PuzzleScreen from './components/PuzzleScreen';
import ResultScreen from './components/ResultScreen';
import WinScreen from './components/WinScreen';
import DragDropPuzzle from './components/DragDropPuzzle';
import puzzles from './data/puzzles';

function App() {
  const [screen, setScreen] = useState('start');
  const [currentPuzzle, setCurrentPuzzle] = useState(0);
  const [isCorrect, setIsCorrect] = useState(null);

  const handleStart = () => {
    setCurrentPuzzle(0);
    setScreen('puzzle');
  };

  const handleAnswer = (correct) => {
    setIsCorrect(correct);
    setScreen('result');
  };

  const handleNext = () => {
    const nextPuzzle = currentPuzzle + 1;

    if (nextPuzzle < puzzles.length) {
      setCurrentPuzzle(nextPuzzle);
      setScreen('puzzle');
    } else if (nextPuzzle === puzzles.length) {
      setScreen('drag'); // Show drag-and-drop puzzle
    } else {
      setScreen('win'); // Final win screen
    }
  };

  const handleRestart = () => {
    setCurrentPuzzle(0);
    setScreen('start');
  };

  return (
    <Router>
      <Routes>
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage onLogin={setUser} />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/" element={<Navigate to={user ? "/dashboard" : "/login"} />} />
      </Routes>
    </Router>
  );
}

export default App;