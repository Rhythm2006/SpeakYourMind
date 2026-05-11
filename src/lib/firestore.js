import app from "./firebase";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  getDoc,
  setDoc,
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

// --- USER GAMIFICATION METHODS ---

export const initializeUserProfile = async (user) => {
  if (!user || !user.uid) return null;
  const userRef = doc(db, "users", user.uid);
  const userSnap = await getDoc(userRef);

  if (!userSnap.exists()) {
    const newProfile = {
      uid: user.uid,
      name: user.displayName || user.email?.split('@')[0] || "Speaker",
      email: user.email,
      level: 1,
      xp: 0,
      rank: "Novice",
      streak: 0,
      longestStreak: 0,
      lastSessionDate: null,
      totalSessions: 0,
      totalMinutes: 0,
      quickSpeakCount: 0,
      debateCount: 0,
      opinionCount: 0,
      badges: [],
      createdAt: serverTimestamp()
    };
    await updateDoc(userRef, newProfile).catch(async () => {
       await setDoc(userRef, newProfile); // if not exists, setDoc
    });
    return newProfile;
  }
  return userSnap.data();
};

export const getUserProfile = async (userId) => {
  const userRef = doc(db, "users", userId);
  const userSnap = await getDoc(userRef);
  return userSnap.exists() ? userSnap.data() : null;
};

// Listen to user profile real-time
export const subscribeToUserProfile = (userId, callback) => {
  const userRef = doc(db, "users", userId);
  return onSnapshot(userRef, (snapshot) => {
    if (snapshot.exists()) {
      callback(snapshot.data());
    }
  });
};

export const awardXPAndStats = async (userId, activityType, durationMinutes = 0, earnedXp = 100) => {
  const userRef = doc(db, "users", userId);
  const userSnap = await getDoc(userRef);
  
  if (!userSnap.exists()) return;
  const data = userSnap.data();

  // Streak Calculation
  let newStreak = data.streak || 0;
  let newLongestStreak = data.longestStreak || 0;
  const today = new Date().toDateString();
  const lastDate = data.lastSessionDate ? new Date(data.lastSessionDate.toMillis()).toDateString() : null;

  if (lastDate !== today) {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    if (lastDate === yesterday.toDateString()) {
      newStreak += 1;
    } else {
      newStreak = 1;
    }
    if (newStreak > newLongestStreak) newLongestStreak = newStreak;
  }

  // Update Stats
  const updateData = {
    xp: (data.xp || 0) + earnedXp,
    totalSessions: (data.totalSessions || 0) + 1,
    totalMinutes: (data.totalMinutes || 0) + durationMinutes,
    streak: newStreak,
    longestStreak: newLongestStreak,
    lastSessionDate: serverTimestamp(),
  };

  if (activityType === "quick-speak") updateData.quickSpeakCount = (data.quickSpeakCount || 0) + 1;
  if (activityType === "debate") updateData.debateCount = (data.debateCount || 0) + 1;
  if (activityType === "opinion") updateData.opinionCount = (data.opinionCount || 0) + 1;

  // Ranks (Calculated on the client or here)
  const newTotalXp = updateData.xp;
  let newRank = "Novice";
  let newLevel = 1;
  
  const rankTiers = [
    { name: "Novice", xp: 0 },
    { name: "Warming Up", xp: 100 },
    { name: "Finding Voice", xp: 300 },
    { name: "Confident", xp: 600 },
    { name: "Eloquent", xp: 1000 },
    { name: "Silver Tongue", xp: 1500 },
    { name: "Golden Voice", xp: 2500 },
    { name: "Legend", xp: 10000 },
  ];

  for (let i = rankTiers.length - 1; i >= 0; i--) {
    if (newTotalXp >= rankTiers[i].xp) {
      newRank = rankTiers[i].name;
      newLevel = i + 1;
      break;
    }
  }

  updateData.rank = newRank;
  updateData.level = newLevel;

  // Note: Badges evaluation can also be done here or handled on the frontend.
  // For simplicity, we can let the frontend calculate badges based on stats dynamically,
  // or we can store `earnedBadges` array. The dashboard has DEMO_BADGES. 
  // Let's store badges locally if we want them saved.
  const newBadges = [...(data.badges || [])];
  
  // Badge Checks
  const checkBadge = (id, condition) => {
    if (condition && !newBadges.includes(id)) newBadges.push(id);
  };

  checkBadge("first-words", updateData.totalSessions >= 1);
  checkBadge("threes-charm", updateData.streak >= 3);
  checkBadge("week-warrior", updateData.streak >= 7);
  checkBadge("quick-thinker", updateData.quickSpeakCount >= 10);
  checkBadge("debater", updateData.debateCount >= 5);
  checkBadge("hour-power", updateData.totalMinutes >= 60);
  checkBadge("opinionated", updateData.opinionCount >= 20);
  checkBadge("night-owl", new Date().getHours() >= 0 && new Date().getHours() < 4);

  updateData.badges = newBadges;

  await updateDoc(userRef, updateData);
};

export default db;
