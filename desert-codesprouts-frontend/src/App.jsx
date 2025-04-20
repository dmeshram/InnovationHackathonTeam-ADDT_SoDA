import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import RegisterPage from "./screens/RegisterPage";
import LoginPage from "./screens/LoginPage";
import DashboardPage from "./screens/DashboardPage";
import EditProfilePage from "./screens/EditProfilePage";
import ForgotPasswordPage from "./screens/ForgotPasswordPage";

import ProgrammingModule from "./components/Programming/ProgrammingModule";
import StageGame from "./components/Programming/StageGame";
import FillInBlankGame from "./components/Programming/FillInBlankGame";
import CodeSortGame from "./components/Programming/CodeSortGame";
import DebugGame from "./components/Programming/DebugGame";
import MemoryMatchGame from "./components/Programming/MemoryMatchGame";
import CodeTypingGame from "./components/Programming/CodeTypingGame";

import StartScreen from "./components/Cybersecurity/StartScreen";
import { auth } from "./firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage onLogin={setUser} />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />

        {/* Protected Routes */}
        <Route path="/dashboard" element={user ? <DashboardPage /> : <Navigate to="/login" />} />
        <Route path="/profile" element={user ? <EditProfilePage /> : <Navigate to="/login" />} />

        {/* Programming Module Routes */}
        <Route path="/programming" element={<ProgrammingModule />} />
        <Route path="/programming/stage/:id" element={<StageGame />} />
        <Route path="/programming/fill" element={<FillInBlankGame />} />
        <Route path="/programming/sort" element={<CodeSortGame />} />
        <Route path="/programming/debug" element={<DebugGame />} />
        <Route path="/programming/memory" element={<MemoryMatchGame />} />
        <Route path="/programming/type" element={<CodeTypingGame />} />

        {/* Cybersecurity */}
        <Route path="/cybersecurity" element={<StartScreen />} />

        {/* Redirect to Dashboard or Login */}
        <Route path="*" element={<Navigate to={user ? "/dashboard" : "/login"} />} />
      </Routes>
    </Router>
  );
}

export default App;
