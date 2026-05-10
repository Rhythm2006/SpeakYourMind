"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import {
  IconParty, IconWave, IconScale, IconHeart, IconBriefcase,
  IconBrain, IconFire, IconRocket, IconArrowLeft,
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

  const selectTopic = (topic) => {
    setCurrentTopic(topic);
    setUserOpinion("");
    setOpinions([
      { id: 1, user: "Arjun K.", text: "Honestly, I think about this differently than most people. My perspective is shaped by personal experience and I believe we need to consider multiple viewpoints before forming a conclusion.", reactions: { "fire": 12, "agree": 8, "think": 3 }, time: "2m ago" },
      { id: 2, user: "Priya M.", text: "This is such an interesting prompt. I'd argue that the conventional wisdom is actually wrong here, and here's why...", reactions: { "heart": 15, "clap": 6 }, time: "5m ago" },
      { id: 3, user: "Dev S.", text: "I used to think one way about this, but after some deep reflection, I've completely changed my stance. Growth requires intellectual flexibility.", reactions: { "fire": 20, "agree": 14, "think": 7, "heart": 5 }, time: "8m ago" },
    ]);
  };

  const submitOpinion = () => {
    if (!userOpinion.trim()) return;
    const newOpinion = { id: Date.now(), user: "You", text: userOpinion, reactions: {}, time: "Just now" };
    setOpinions([newOpinion, ...opinions]);
    setUserOpinion("");
  };

  const REACTION_LABELS = [
    { key: "fire", label: "Fire" },
    { key: "agree", label: "Agree" },
    { key: "think", label: "Hmm" },
    { key: "heart", label: "Love" },
    { key: "clap", label: "Clap" },
  ];

  const addReaction = (opinionId, key) => {
    setOpinions(opinions.map((o) => {
      if (o.id === opinionId) {
        const reactions = { ...o.reactions };
        reactions[key] = (reactions[key] || 0) + 1;
        return { ...o, reactions };
      }
      return o;
    }));
  };

  return (
    <>
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
                            </div>
                            <p className={styles.opinionText}>{opinion.text}</p>
                            <div className={styles.opinionReactions}>
                              {REACTION_LABELS.map(({ key, label }) => (
                                <button key={key}
                                  className={`${styles.reactionBtn} ${opinion.reactions[key] ? styles.reactionActive : ""}`}
                                  onClick={() => addReaction(opinion.id, key)}>
                                  {label}
                                  {opinion.reactions[key] && (
                                    <span className={styles.reactionCount}>{opinion.reactions[key]}</span>
                                  )}
                                </button>
                              ))}
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
    </>
  );
}
