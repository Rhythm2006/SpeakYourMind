import app from "./firebase";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  signOut,
  onAuthStateChanged,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup
} from "firebase/auth";

import { initializeUserProfile } from "./firestore";

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export const signup = async (email, password, displayName) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  
  if (displayName) {
    await updateProfile(userCredential.user, { displayName });
  }

  // Ensure their profile exists in Firestore
  await initializeUserProfile(userCredential.user);

  return userCredential.user;
};

export const login = async (email, password) => {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  await initializeUserProfile(userCredential.user);
  return userCredential.user;
};

export const loginWithGoogle = async () => {
  const result = await signInWithPopup(auth, googleProvider);
  await initializeUserProfile(result.user);
  return result.user;
};

export const logout = async () => {
  return await signOut(auth);
};

// Custom hook helper (can be used in components to listen to auth state)
export const subscribeToAuthChanges = (callback) => {
  return onAuthStateChanged(auth, callback);
};

export default auth;
