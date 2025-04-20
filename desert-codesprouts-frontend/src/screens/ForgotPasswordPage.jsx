import { useState } from "react";
import { resetPassword } from "../firebase/auth";
import styles from "./ForgotPasswordPage.module.css";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");

  const handleReset = async () => {
    setStatus("");
    setError("");
    if (!email) {
      setError("Please enter your email.");
      return;
    }

    try {
      await resetPassword(email);
      setStatus("✅ Reset email sent!");
    } catch (err) {
      setError(`❌ ${err.message}`);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.heading}>Forgot Password?</h1>
        <p className={styles.subtext}>Enter your email and we’ll send you a reset link.</p>
        <div className={styles.row}>
            <input
            type="email"
            placeholder="Email"
            className={styles.input}
            onChange={(e) => setEmail(e.target.value)}
            />
        </div>

        <button className={styles.primaryBtn} onClick={handleReset}>
          Send Reset Link
        </button>

        {status && <p className={styles.success}>{status}</p>}
        {error && <p className={styles.error}>{error}</p>}
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
