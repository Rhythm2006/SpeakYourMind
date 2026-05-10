"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import ProtectedRoute from "@/components/layout/ProtectedRoute";
import { useAuth } from "@/context/AuthContext";
import { saveOpinion, getTopicOpinions, updateOpinionReactions, deleteOpinion } from "@/lib/firestore";
import {
  IconParty, IconWave, IconScale, IconHeart, IconBriefcase,
  IconBrain, IconFire, IconRocket, IconArrowLeft, IconTrash,
} from "@/components/ui/Icons";
import styles from "./page.module.css";

const CATEGORIES = [
  { id: "fun", name: "Fun", Icon: IconParty, color: "#F59E0B" },
  { id: "deep", name: "Deep", Icon: IconWave, color: "#3B82F6" },
  { id: "ethical", name: "Ethical", Icon: IconScale, color: "#8B5CF6" },
  { id: "relationships", name: "Relationships", Icon: IconHeart, color: "#EC4899" },
  { id: "career", name: "Career", Icon: IconBriefcase, color: "#10B981" },
  { id: "philosophy", name: "Philosophy", Icon: IconBrain, color: "#6366F1" },
  { id: "debate", name: "Debate", Icon: IconFire, color: "#E54D2E" },
  { id: "hypothetical", name: "Hypotheticals", Icon: IconRocket, color: "#F97316" },
];

export default function OpinionRooms() {
  const { user } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [topics, setTopics] = useState([]);
  const [currentTopic, setCurrentTopic] = useState(null);
  const [opinions, setOpinions] = useState([]);
  const [userOpinion, setUserOpinion] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!selectedCategory) return;
    const fetchTopics = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/topics?category=${selectedCategory.id}`);
        const data = await res.json();
        setTopics(data.topics || []);
        if (data.topics?.length > 0) setCurrentTopic(data.topics[0]);
      } catch { setTopics([]); }
      setLoading(false);
    };
    fetchTopics();
  }, [selectedCategory]);

  useEffect(() => {
    if (!currentTopic) return;
    const fetchOpinions = async () => {
      try {
        const ops = await getTopicOpinions(currentTopic);
        setOpinions(ops);
      } catch (e) { console.error(e); }
    };
    fetchOpinions();
  }, [currentTopic]);

  const selectTopic = (topic) => {
    setCurrentTopic(topic);
    setUserOpinion("");
    setOpinions([]);
  };

  const submitOpinion = async () => {
    if (!userOpinion.trim()) return;
    
    const newOpinion = {
      userId: user?.uid || "anonymous",
      user: user?.displayName || user?.email?.split('@')[0] || "User",
      topicId: currentTopic,
      text: userOpinion,
      reactions: {},
      time: "Just now",
    };

    try {
      const docRef = await saveOpinion(newOpinion);
      setOpinions([{ id: docRef.id, ...newOpinion }, ...opinions]);
      setUserOpinion("");
    } catch (e) {
      console.error("Failed to save opinion", e);
    }
  };

  const REACTION_LABELS = [
    { key: "fire", label: "Fire" },
    { key: "agree", label: "Agree" },
    { key: "think", label: "Hmm" },
    { key: "heart", label: "Love" },
    { key: "clap", label: "Clap" },
  ];

  const addReaction = (opinionId, key) => {
    if (!user?.uid) return;

    setOpinions(opinions.map((o) => {
      if (o.id === opinionId) {
        const reactions = { ...o.reactions };
        let userArray = reactions[key];
        if (!Array.isArray(userArray)) userArray = [];

        if (userArray.includes(user.uid)) {
          userArray = userArray.filter(uid => uid !== user.uid);
        } else {
          userArray = [...userArray, user.uid];
        }

        if (userArray.length > 0) {
          reactions[key] = userArray;
        } else {
          delete reactions[key];
        }
        
        if (typeof opinionId === "string") {
          updateOpinionReactions(opinionId, reactions).catch(e => console.error(e));
        }

        return { ...o, reactions };
      }
      return o;
    }));
  };

  const handleDeleteOpinion = async (opinionId) => {
    if (confirm("Are you sure you want to delete this opinion?")) {
      setOpinions(opinions.filter(o => o.id !== opinionId));
      try {
        if (typeof opinionId === "string") {
          await deleteOpinion(opinionId);
        }
      } catch (e) {
        console.error("Failed to delete opinion", e);
      }
    }
  };

  return (
    <ProtectedRoute>
      <Navbar />
      <main className={styles.main}>
        <div className={styles.container}>
          <div className={styles.header}>
            <span className={`${styles.headerTag} handwritten`}>Opinion Rooms</span>
            <h1 className={styles.title}>What&apos;s on your mind?</h1>
            <p className={styles.subtitle}>
              Pick a category, choose a prompt, and share your perspective.{" "}
              <span className="highlight-purple">No wrong answers.</span>
            </p>
          </div>

          {!selectedCategory ? (
            <div className={styles.categoriesGrid}>
              {CATEGORIES.map((cat, i) => (
                <button key={cat.id} className={styles.categoryCard}
                  style={{ "--cat-color": cat.color, "--rotate": `${(i % 2 === 0 ? -1 : 1) * (0.5 + Math.random())}deg` }}
                  onClick={() => setSelectedCategory(cat)}>
                  <span className={styles.categoryIcon}>
                    <cat.Icon size={28} color={cat.color} />
                  </span>
                  <span className={styles.categoryName}>{cat.name}</span>
                </button>
              ))}
            </div>
          ) : (
            <div className={styles.roomView}>
              <button className={styles.backBtn} onClick={() => {
                setSelectedCategory(null); setCurrentTopic(null); setTopics([]); setOpinions([]);
              }}>
                <IconArrowLeft size={14} /> Back to categories
              </button>

              <div className={styles.roomHeader} style={{ "--cat-color": selectedCategory.color }}>
                <span className={styles.roomIcon}>
                  <selectedCategory.Icon size={28} color={selectedCategory.color} />
                </span>
                <h2 className={styles.roomTitle}>{selectedCategory.name}</h2>
              </div>

              <div className={styles.roomLayout}>
                <div className={styles.topicsSidebar}>
                  <h4 className={styles.sidebarTitle}>Prompts</h4>
                  <div className={styles.topicsList}>
                    {topics.map((t, i) => (
                      <button key={i}
                        className={`${styles.topicItem} ${currentTopic === t ? styles.topicActive : ""}`}
                        onClick={() => selectTopic(t)}>
                        <span className={styles.topicNum}>{i + 1}</span>
                        <span className={styles.topicPreview}>{t}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className={styles.roomContent}>
                  {currentTopic && (
                    <>
                      <div className={styles.promptCard}>
                        <span className={styles.promptLabel}>Current Prompt</span>
                        <h3 className={styles.promptText}>{currentTopic}</h3>
                      </div>

                      <div className={styles.opinionInput}>
                        <textarea className={styles.opinionTextarea}
                          placeholder="Share your perspective..."
                          value={userOpinion} onChange={(e) => setUserOpinion(e.target.value)} rows={3} />
                        <button className={`btn btn-primary ${styles.submitBtn}`}
                          onClick={submitOpinion} disabled={!userOpinion.trim()}>
                          Share Opinion
                        </button>
                      </div>

                      <div className={styles.opinionsList}>
                        {opinions.map((opinion) => (
                          <div key={opinion.id} className={styles.opinionCard}>
                            <div className={styles.opinionHeader}>
                              <span className={styles.opinionAvatar}>{opinion.user.charAt(0)}</span>
                              <span className={styles.opinionUser}>{opinion.user}</span>
                              <span className={styles.opinionTime}>{opinion.time}</span>
                              {user?.uid === opinion.userId && (
                                <button className={styles.deleteBtn} onClick={() => handleDeleteOpinion(opinion.id)} title="Delete opinion">
                                  <IconTrash size={14} color="var(--text-muted)" />
                                </button>
                              )}
                            </div>
                            <p className={styles.opinionText}>{opinion.text}</p>
                            <div className={styles.opinionReactions}>
                              {REACTION_LABELS.map(({ key, label }) => {
                                const reacts = opinion.reactions[key];
                                const count = Array.isArray(reacts) ? reacts.length : (typeof reacts === "number" ? reacts : 0);
                                const hasReacted = Array.isArray(reacts) && user?.uid && reacts.includes(user.uid);
                                
                                return (
                                  <button key={key}
                                    className={`${styles.reactionBtn} ${hasReacted ? styles.reactionActive : ""}`}
                                    onClick={() => addReaction(opinion.id, key)}>
                                    {label}
                                    {count > 0 && (
                                      <span className={styles.reactionCount}>{count}</span>
                                    )}
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </ProtectedRoute>
  );
}
