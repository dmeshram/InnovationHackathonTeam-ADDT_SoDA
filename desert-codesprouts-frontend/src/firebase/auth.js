import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "./firebase";

// Register a new user
export const registerUser = async (email, password) => {
  return await createUserWithEmailAndPassword(auth, email, password);
};

// Login existing user
export const loginUser = async (email, password) => {
  return await signInWithEmailAndPassword(auth, email, password);
};

// Logout
export const logoutUser = async () => {
  return await signOut(auth);
};
