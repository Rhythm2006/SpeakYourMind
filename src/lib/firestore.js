import app from "./firebase";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  query,
  where,
  orderBy,
  serverTimestamp,
  doc,
  updateDoc,
  deleteDoc
} from "firebase/firestore";

const db = getFirestore(app);

// Save a speaking session
export const saveSession = async (sessionData) => {
  return await addDoc(collection(db, "sessions"), {
    ...sessionData,
    createdAt: serverTimestamp()
  });
};

// Get sessions for a specific user
export const getUserSessions = async (userId) => {
  const q = query(
    collection(db, "sessions"),
    where("userId", "==", userId)
  );
  
  const snapshot = await getDocs(q);
  const docs = snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));

  // Sort descending by createdAt
  return docs.sort((a, b) => {
    const timeA = a.createdAt?.toMillis ? a.createdAt.toMillis() : 0;
    const timeB = b.createdAt?.toMillis ? b.createdAt.toMillis() : 0;
    return timeB - timeA;
  });
};

// Save a user opinion
export const saveOpinion = async (opinionData) => {
  return await addDoc(collection(db, "opinions"), {
    ...opinionData,
    createdAt: serverTimestamp()
  });
};

// Get opinions for a specific topic
export const getTopicOpinions = async (topicId) => {
  const q = query(
    collection(db, "opinions"),
    where("topicId", "==", topicId)
  );

  const snapshot = await getDocs(q);
  const docs = snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));

  // Sort descending by createdAt
  return docs.sort((a, b) => {
    const timeA = a.createdAt?.toMillis ? a.createdAt.toMillis() : 0;
    const timeB = b.createdAt?.toMillis ? b.createdAt.toMillis() : 0;
    return timeB - timeA;
  });
};

// Update opinion reactions
export const updateOpinionReactions = async (opinionId, reactions) => {
  const opinionRef = doc(db, "opinions", opinionId);
  return await updateDoc(opinionRef, {
    reactions
  });
};

// Delete a user opinion
export const deleteOpinion = async (opinionId) => {
  const opinionRef = doc(db, "opinions", opinionId);
  return await deleteDoc(opinionRef);
};

export default db;
