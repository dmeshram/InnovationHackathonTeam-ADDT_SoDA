// src/firebase/auth.js
import { signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, sendPasswordResetEmail, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "./firebase";

const provider = new GoogleAuthProvider();

export const registerUser = async (email, password) => {
  return await createUserWithEmailAndPassword(auth, email, password);
};

export const loginUser = async (email, password) => {
  return await signInWithEmailAndPassword(auth, email, password);
};

export const logoutUser = async () => {
  return await signOut(auth);
};

export const signInWithGoogle = async () => {
  return await signInWithPopup(auth, provider);
};

export const resetPassword = async (email) => {
  return await sendPasswordResetEmail(auth, email);
};