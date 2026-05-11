"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Navbar from "@/components/layout/Navbar";
import ProtectedRoute from "@/components/layout/ProtectedRoute";
import {
  IconMic, IconShuffle, IconStar, IconSparkle, IconSave,
  IconRefresh, IconHand, IconDot, IconFire, IconClock,
} from "@/components/ui/Icons";
import { useAuth } from "@/context/AuthContext";
import { saveSession as saveSessionToDb, awardXPAndStats } from "@/lib/firestore";
import styles from "./page.module.css";

const DURATIONS = [
  { label: "1 min", value: 60, color: "#10B981" },
  { label: "2 min", value: 120, color: "#3B82F6" },
  { label: "3 min", value: 180, color: "#8B5CF6" },
];

export default function QuickSpeak() {
  const { user } = useAuth();
  const [phase, setPhase] = useState("setup");
  const [topic, setTopic] = useState(null);
  const [category, setCategory] = useState(null);
  const [duration, setDuration] = useState(DURATIONS[0]);
  const [timeLeft, setTimeLeft] = useState(60);
  const [countdownNum, setCountdownNum] = useState(3);
  const [selfRating, setSelfRating] = useState(0);
  const [notes, setNotes] = useState("");
  const timerRef = useRef(null);

  const fetchTopic = useCallback(async () => {
    try {
      const res = await fetch("/api/topics?random=true");
      const data = await res.json();
      setTopic(data.topic);
      setCategory(data.categoryInfo);
    } catch {
      setTopic("If you could have any superpower, what would it be and why?");
      setCategory({ name: "Fun", color: "#F59E0B" });
    }
  }, []);

  useEffect(() => { fetchTopic(); }, [fetchTopic]);

  const startCountdown = () => {
    setPhase("countdown");
    setCountdownNum(3);
    let count = 3;
    const interval = setInterval(() => {
      count--;
      if (count <= 0) { clearInterval(interval); startSpeaking(); }
      else { setCountdownNum(count); }
    }, 1000);
  };

  const startSpeaking = () => {
    setPhase("speaking");
    setTimeLeft(duration.value);
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) { clearInterval(timerRef.current); setPhase("complete"); return 0; }
        return prev - 1;
      });
    }, 1000);
  };

  const endSpeaking = () => { clearInterval(timerRef.current); setPhase("complete"); };

  const reset = () => {
    clearInterval(timerRef.current);
    setPhase("setup"); setTimeLeft(duration.value); setSelfRating(0); setNotes(""); fetchTopic();
  };

  const saveSession = async () => {
    const actualDuration = duration.value - timeLeft;
    const xpEarned = Math.round(actualDuration / 6) * 10;
    
    if (user) {
      try {
        await saveSessionToDb({
          userId: user.uid,
          mode: "quick-speak",
          topic,
          category: category?.name,
          duration: duration.value,
          actualDuration,
          selfRating,
          notes,
          completed: true,
          xpEarned,
        });
        await awardXPAndStats(user.uid, "quick-speak", Math.ceil(actualDuration / 60), xpEarned);
      } catch (e) { console.error("Failed to save:", e); }
    }
    reset();
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  const progress = timeLeft / duration.value;
  const circumference = 2 * Math.PI * 120;
  const dashOffset = circumference * (1 - progress);

  return (
    <ProtectedRoute>
      <Navbar />
      <main className={styles.main}>
        <div className={styles.container}>
          {/* SETUP */}
          {phase === "setup" && (
            <div className={styles.setupPhase}>
              <div className={styles.header}>
                <span className={`${styles.headerTag} handwritten`}>Quick Speak</span>
                <h1 className={styles.title}>Ready to speak your mind?</h1>
                <p className={styles.subtitle}>
                  A random topic. A timer. No preparation.{" "}
                  <span className="highlight-yellow">Just you and your words.</span>
                </p>
              </div>

              {topic && (
                <div className={styles.topicCard}>
                  <div className={styles.topicHeader}>
                    <span className={styles.topicCategory} style={{ color: category?.color }}>
                      {category?.name}
                    </span>
                    <button className={styles.shuffleBtn} onClick={fetchTopic}>
                      <IconShuffle size={14} /> New Topic
                    </button>
                  </div>
                  <h2 className={styles.topicText}>{topic}</h2>
                </div>
              )}

              <div className={styles.durationSection}>
                <h3 className={styles.durationLabel}>
                  <span className="handwritten" style={{ fontSize: "1.3rem", color: "var(--accent-red)" }}>Choose your timer</span>
                </h3>
                <div className={styles.durationGrid}>
                  {DURATIONS.map((d) => (
                    <button key={d.value}
                      className={`${styles.durationBtn} ${duration.value === d.value ? styles.durationActive : ""}`}
                      style={{ "--dur-color": d.color }}
                      onClick={() => { setDuration(d); setTimeLeft(d.value); }}>
                      <span className={styles.durationTime}>{d.label}</span>
                      <span className={styles.durationDesc}>
                        {d.value === 60 ? "Quick challenge" : d.value === 120 ? "Standard" : "Deep dive"}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <button className={`btn btn-primary btn-large ${styles.startBtn}`} onClick={startCountdown}>
                <IconMic size={18} /> Start Speaking
              </button>
            </div>
          )}

          {/* COUNTDOWN */}
          {phase === "countdown" && (
            <div className={styles.countdownPhase}>
              <div className={styles.countdownNumber}>{countdownNum}</div>
              <p className={styles.countdownText}>Get ready...</p>
            </div>
          )}

          {/* SPEAKING */}
          {phase === "speaking" && (
            <div className={styles.speakingPhase}>
              <div className={styles.timerContainer}>
                <svg className={styles.timerSvg} viewBox="0 0 260 260">
                  <circle cx="130" cy="130" r="120" fill="none" stroke="rgba(0,0,0,0.04)" strokeWidth="6" />
                  <circle cx="130" cy="130" r="120" fill="none" stroke={duration.color}
                    strokeWidth="6" strokeLinecap="round"
                    strokeDasharray={circumference} strokeDashoffset={dashOffset}
                    className={styles.timerRing} transform="rotate(-90 130 130)" />
                </svg>
                <div className={styles.timerCenter}>
                  <span className={styles.timerTime}>{formatTime(timeLeft)}</span>
                  <span className={styles.timerLabel}>remaining</span>
                </div>
              </div>

              <div className={styles.recordingIndicator}>
                <IconDot size={8} color="var(--accent-red)" className={styles.recordingDot} />
                <span>SPEAKING</span>
              </div>

              <div className={styles.topicReminder}>
                <span className={styles.topicReminderLabel}>Your topic:</span>
                <p className={styles.topicReminderText}>{topic}</p>
              </div>

              <button className={`btn btn-secondary ${styles.endBtn}`} onClick={endSpeaking}>
                <IconHand size={16} /> End Early
              </button>
            </div>
          )}

          {/* COMPLETE */}
          {phase === "complete" && (
            <div className={styles.completePhase}>
              <div className={styles.completeIcon}>
                <IconSparkle size={48} color="var(--accent-yellow)" />
              </div>
              <h2 className={styles.completeTitle}>Well spoken!</h2>
              <p className={styles.completeSubtitle}>
                You spoke for <strong>{formatTime(duration.value - timeLeft)}</strong> on:
              </p>
              <div className={styles.completeTopic}>
                <em>&ldquo;{topic}&rdquo;</em>
              </div>

              <div className={styles.xpEarned}>
                <IconSparkle size={16} color="#B45309" />
                <span className={styles.xpAmount}>
                  +{Math.round((duration.value - timeLeft) / 6) * 10} XP
                </span>
              </div>

              <div className={styles.ratingSection}>
                <h4 className="handwritten" style={{ fontSize: "1.3rem", marginBottom: "12px" }}>
                  How did that feel?
                </h4>
                <div className={styles.ratingStars}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button key={star}
                      className={`${styles.ratingStar} ${selfRating >= star ? styles.ratingActive : ""}`}
                      onClick={() => setSelfRating(star)}>
                      <IconStar size={28} filled={selfRating >= star} color={selfRating >= star ? "var(--accent-yellow)" : "var(--text-muted)"} />
                    </button>
                  ))}
                </div>
              </div>

              <div className={styles.notesSection}>
                <textarea className={styles.notesInput}
                  placeholder="Quick notes about your session... (optional)"
                  value={notes} onChange={(e) => setNotes(e.target.value)} rows={3} />
              </div>

              <div className={styles.completeActions}>
                <button className="btn btn-primary btn-large" onClick={saveSession}>
                  <IconSave size={16} /> Save & Continue
                </button>
                <button className="btn btn-ghost" onClick={reset}>
                  <IconRefresh size={16} /> Try Another
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </ProtectedRoute>
  );
}
