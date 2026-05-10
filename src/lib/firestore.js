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
  deleteDoc,
  onSnapshot
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

// --- LOBBY METHODS ---

export const createLobby = async (topic, user, roomUrl) => {
  return await addDoc(collection(db, "lobbies"), {
    topic,
    host: { uid: user.uid, name: user.displayName || user.email?.split('@')[0] || "User" },
    guest: null,
    status: "waiting",
    roomUrl: roomUrl || null,
    createdAt: serverTimestamp()
  });
};

export const joinLobby = async (lobbyId, user, roomUrl) => {
  const lobbyRef = doc(db, "lobbies", lobbyId);
  return await updateDoc(lobbyRef, {
    guest: { uid: user.uid, name: user.displayName || user.email?.split('@')[0] || "User" },
    status: "in-progress",
    roomUrl
  });
};

export const subscribeToLobbies = (callback) => {
  const q = query(
    collection(db, "lobbies"),
    where("status", "==", "waiting")
  );
  
  return onSnapshot(q, (snapshot) => {
    const lobbies = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    // Sort descending manually to avoid index requirement
    lobbies.sort((a, b) => {
      const timeA = a.createdAt?.toMillis ? a.createdAt.toMillis() : 0;
      const timeB = b.createdAt?.toMillis ? b.createdAt.toMillis() : 0;
      return timeB - timeA;
    });
    callback(lobbies);
  });
};

export const deleteLobby = async (lobbyId) => {
  const lobbyRef = doc(db, "lobbies", lobbyId);
  return await deleteDoc(lobbyRef);
};

export default db;
