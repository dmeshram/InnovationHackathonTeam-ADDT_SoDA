import { useState } from "react";
import { registerUser } from "../firebase/auth";
import styles from "./RegisterPage.module.css";

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const handleRegister = async () => {
    try {
      await registerUser(email, password, firstName, lastName);
      alert("Account created!");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.header}>
          <h1>Create new account<span className={styles.dot}>.</span></h1>
          <p className={styles.subtext}>
            Already A User? <a href="/login">Log In</a>
          </p>
        </div>

        <div className={styles.row}>
        <input type="text" placeholder="First name" onChange={(e) => setFirstName(e.target.value)} />
        <input type="text" placeholder="Last name" onChange={(e) => setLastName(e.target.value)} />
        </div>

        <div className={styles.row}>
        <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
        </div>

        <div className={styles.row}>
        <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
        </div>

        <div className={styles.buttons}>
          <button className={styles.primaryBtn} onClick={handleRegister}>Create account</button>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
