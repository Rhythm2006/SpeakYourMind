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

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export const signup = async (email, password, displayName) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  
  if (displayName) {
    await updateProfile(userCredential.user, { displayName });
  }

  // Optional: Send email verification
  // await sendEmailVerification(userCredential.user);

  return userCredential.user;
};

export const login = async (email, password) => {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  return userCredential.user;
};

export const loginWithGoogle = async () => {
  const result = await signInWithPopup(auth, googleProvider);
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
