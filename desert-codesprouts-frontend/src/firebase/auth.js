// src/firebase/auth.js
import { signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, sendPasswordResetEmail, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { auth } from "./firebase";

const provider = new GoogleAuthProvider();

export const registerUser = async (email, password, firstName, lastName) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password, firstName, lastName);
  const user = userCredential.user;

  // Save displayName as "First Last"
  await updateProfile(user, {
    displayName: `${firstName} ${lastName}`
  });

  return user;
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