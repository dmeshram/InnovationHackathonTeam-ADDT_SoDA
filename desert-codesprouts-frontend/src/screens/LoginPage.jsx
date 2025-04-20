import { useState } from "react";
import { loginUser, signInWithGoogle } from "../firebase/auth";
import styles from "./LoginPage.module.css";
import { useNavigate } from "react-router-dom";
import googleIcon from "../logo/google.svg";

const LoginPage = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const result = await loginUser(email, password);
      onLogin(result.user);
      console.log("Login Success",result.user);
    } catch (err) {
      alert(err.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithGoogle();
      onLogin(result.user);
      console.log("Google Sign In Success",result.user);
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.header}>
          <p className={styles.smallTitle}>WELCOME BACK</p>
          <h1>Log into your account<span className={styles.dot}>.</span></h1>
          <p className={styles.subtext}>
            Don’t have an account? <a href="/register">Sign Up</a>
          </p>
        </div>

        <div className={styles.row}>
          <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
        </div>
        
        <div className={styles.row}>
          <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
        </div>

        <div className={styles.buttons}>
        <button className={styles.grayBtn} onClick={() => navigate("/forgot-password")}>
          Forgot password?
        </button>
          <button className={styles.primaryBtn} onClick={handleLogin}>Log In</button>
        </div>

        <div className={styles.divider}>or</div>

        <button className={styles.googleBtn} onClick={handleGoogleSignIn}>
          <img src={googleIcon} alt="Google" />
          Sign in with Google
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
