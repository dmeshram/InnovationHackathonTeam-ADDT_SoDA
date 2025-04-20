import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "./firebase";

export const getUserProgress = async (uid) => {
  try {
    const userDoc = await getDoc(doc(db, "progress", uid));
    if (userDoc.exists()) {
      return userDoc.data();
    } else {
      return {}; // No progress yet
    }
  } catch (error) {
    console.error("Error fetching progress:", error);
    return {};
  }
};

export const updateUserProgress = async (uid, progressUpdate) => {
  try {
    const ref = doc(db, "progress", uid);
    const snapshot = await getDoc(ref);
    if (snapshot.exists()) {
      await updateDoc(ref, progressUpdate);
    } else {
      await setDoc(ref, progressUpdate);
    }
  } catch (error) {
    console.error("Error updating progress:", error);
  }
};