"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import ProtectedRoute from "@/components/layout/ProtectedRoute";
import { useAuth } from "@/context/AuthContext";
import { subscribeToUserProfile, getUserSessions, initializeUserProfile } from "@/lib/firestore";
import {
  IconFire, IconMic, IconLightning, IconBubble, IconSwords,
  IconStar, IconTrophy, IconMedal, IconChart, IconSparkle,
  IconSprout, IconCrown, IconClock, IconWind, IconOwl, IconLock,
  IconCheck, IconTarget,
} from "@/components/ui/Icons";
import styles from "./page.module.css";

const BADGES_DEFS = [
  { id: "first-words", name: "First Words", Icon: IconMic, description: "Complete your first session" },
  { id: "threes-charm", name: "Three's a Charm", Icon: IconFire, description: "3-day streak" },
  { id: "week-warrior", name: "Week Warrior", Icon: IconLightning, description: "7-day streak" },
  { id: "quick-thinker", name: "Quick Thinker", Icon: IconWind, description: "10 Quick Speak sessions" },
  { id: "debater", name: "Debater", Icon: IconSwords, description: "5 debate sessions" },
  { id: "hour-power", name: "Hour Power", Icon: IconClock, description: "1 hour total speaking" },
  { id: "opinionated", name: "Opinionated", Icon: IconBubble, description: "20 opinions shared" },
  { id: "night-owl", name: "Night Owl", Icon: IconOwl, description: "Session after midnight" },
];

const RANK_PROGRESS = [
  { name: "Novice", Icon: IconSprout, xp: 0 },
  { name: "Warming Up", Icon: IconFire, xp: 100 },
  { name: "Finding Voice", Icon: IconMic, xp: 300 },
  { name: "Confident", Icon: IconBubble, xp: 600 },
  { name: "Eloquent", Icon: IconSparkle, xp: 1000 },
  { name: "Silver Tongue", Icon: IconMedal, xp: 1500 },
  { name: "Golden Voice", Icon: IconTrophy, xp: 2500 },
  { name: "Legend", Icon: IconCrown, xp: 10000 },
];

export default function Dashboard() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");
  const [userProfile, setUserProfile] = useState(null);
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    
    let unsubscribe;

    const setup = async () => {
      // Ensure the user has a profile document created
      await initializeUserProfile(user);

      // Subscribe to live user profile
      unsubscribe = subscribeToUserProfile(user.uid, (profile) => {
        setUserProfile(profile);
        setLoading(false);
      });

      // Fetch history
      getUserSessions(user.uid).then(history => {
        setSessions(history);
      });
    };

    setup();

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [user]);

  const getModeIcon = (mode) => {
    if (mode === "quick-speak") return <IconLightning size={20} color="var(--accent-yellow)" />;
    if (mode === "debate") return <IconSwords size={20} color="var(--accent-red)" />;
    return <IconBubble size={20} color="var(--accent-purple)" />;
  };

  if (loading || !userProfile) {
    return (
      <ProtectedRoute>
        <Navbar />
        <main className={styles.main}>
          <div className={styles.container} style={{ textAlign: "center", paddingTop: "100px" }}>
            <p>Loading your dashboard...</p>
          </div>
        </main>
      </ProtectedRoute>
    );
  }

  // Calculate XP Progress
  const currentRankIndex = RANK_PROGRESS.findIndex(r => r.name === userProfile.rank) || 0;
  const currentRankXp = RANK_PROGRESS[currentRankIndex]?.xp || 0;
  const nextRankXp = RANK_PROGRESS[currentRankIndex + 1]?.xp || currentRankXp;
  
  const xpProgress = nextRankXp === currentRankXp ? 100 : ((userProfile.xp - currentRankXp) / (nextRankXp - currentRankXp)) * 100;

  // Process History
  const historyList = sessions.map(s => {
    let dateStr = "Unknown";
    if (s.createdAt) {
      const d = new Date(s.createdAt.toMillis ? s.createdAt.toMillis() : s.createdAt);
      dateStr = d.toLocaleDateString();
    }
    return {
      mode: s.type || "quick-speak",
      topic: s.topic,
      category: s.category || "General",
      duration: s.duration || 0,
      rating: s.rating || 5, // Default to 5 if not rated
      xp: s.earnedXp || 0,
      date: dateStr
    };
  });

  // Calculate This Week Activity
  const weekActivity = {
    Mon: { sessions: 0, duration: 0 }, Tue: { sessions: 0, duration: 0 },
    Wed: { sessions: 0, duration: 0 }, Thu: { sessions: 0, duration: 0 },
    Fri: { sessions: 0, duration: 0 }, Sat: { sessions: 0, duration: 0 },
    Sun: { sessions: 0, duration: 0 }
  };
  const today = new Date();
  const dayOfWeek = today.getDay(); // 0 is Sunday
  const diffToMonday = today.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1);
  const mondayOfThisWeek = new Date(today.setDate(diffToMonday));
  mondayOfThisWeek.setHours(0, 0, 0, 0);

  sessions.forEach(s => {
    if (s.createdAt) {
      const d = new Date(s.createdAt.toMillis ? s.createdAt.toMillis() : s.createdAt);
      if (d >= mondayOfThisWeek) {
        const dayStr = d.toLocaleDateString("en-US", { weekday: "short" }); // "Mon", "Tue"
        if (weekActivity[dayStr]) {
          weekActivity[dayStr].sessions += 1;
          weekActivity[dayStr].duration += (s.actualDuration || s.duration || 0); // Add duration in seconds
        }
      }
    }
  });

  const formatTooltipDuration = (seconds) => {
    if (!seconds) return "0s";
    const m = Math.floor(seconds / 60);
    const s = Math.round(seconds % 60);
    if (m > 0) return `${m}m ${s}s`;
    return `${s}s`;
  };

  return (
    <ProtectedRoute>
      <Navbar />
      <main className={styles.main}>
        <div className={styles.container}>
          <div className={styles.header}>
            <div className={styles.headerLeft}>
              <span className={`${styles.headerTag} handwritten`}>Dashboard</span>
              <h1 className={styles.title}>
                Welcome back, <span className={styles.titleName}>{userProfile.name}</span>
              </h1>
              <p className={styles.subtitle}>
                Keep the momentum going.{" "}
                <span className="highlight-yellow">Your voice matters.</span>
              </p>
            </div>
            <div className={styles.streakCard}>
              <span className={styles.streakIcon}><IconFire size={28} color="var(--accent-orange)" /></span>
              <span className={styles.streakNum}>{userProfile.streak || 0}</span>
              <span className={styles.streakLabel}>day streak</span>
            </div>
          </div>

          <div className={styles.tabs}>
            {["overview", "badges", "history"].map((tab) => (
              <button key={tab}
                className={`${styles.tab} ${activeTab === tab ? styles.tabActive : ""}`}
                onClick={() => setActiveTab(tab)}>
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          {/* OVERVIEW */}
          {activeTab === "overview" && (
            <div className={styles.overviewGrid}>
              <div className={`${styles.card} ${styles.rankCard}`}>
                <h3 className={styles.cardTitle}>Current Rank</h3>
                <div className={styles.rankDisplay}>
                  <span className={styles.rankIcon}><IconMic size={36} color="var(--accent-purple)" /></span>
                  <span className={styles.rankName}>{userProfile.rank}</span>
                  <span className={styles.rankLevel}>Level {userProfile.level}</span>
                </div>
                <div className={styles.xpBar}>
                  <div className={styles.xpBarFill} style={{ width: `${Math.min(100, Math.max(0, xpProgress))}%` }} />
                </div>
                <div className={styles.xpLabels}>
                  <span>{userProfile.xp} XP</span>
                  <span>{nextRankXp > currentRankXp ? `${nextRankXp} XP` : "MAX"}</span>
                </div>
              </div>

              <div className={`${styles.card} ${styles.statsCard}`}>
                <h3 className={styles.cardTitle}>Speaking Stats</h3>
                <div className={styles.statsGrid}>
                  <div className={styles.statItem}><span className={styles.statNum}>{userProfile.totalSessions || 0}</span><span className={styles.statLabel}>Sessions</span></div>
                  <div className={styles.statItem}><span className={styles.statNum}>{userProfile.totalMinutes || 0}</span><span className={styles.statLabel}>Minutes Spoken</span></div>
                  <div className={styles.statItem}><span className={styles.statNum}>{userProfile.longestStreak || 0}</span><span className={styles.statLabel}>Best Streak</span></div>
                  <div className={styles.statItem}><span className={styles.statNum}>{userProfile.quickSpeakCount || 0}</span><span className={styles.statLabel}>Quick Speaks</span></div>
                </div>
              </div>

              <div className={`${styles.card} ${styles.activityCard}`}>
                <h3 className={styles.cardTitle}>This Week</h3>
                <div className={styles.weekGrid}>
                  {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => {
                    const dailyData = weekActivity[day] || { sessions: 0, duration: 0 };
                    const dailySessions = dailyData.sessions;
                    const dailyDuration = dailyData.duration;
                    const active = dailySessions > 0;
                    const heightPercent = Math.min(100, (dailySessions / 4) * 100); // 4 sessions is 100% height
                    const tooltipText = active ? `${dailySessions} session${dailySessions > 1 ? 's' : ''} (${formatTooltipDuration(dailyDuration)})` : "No sessions";
                    
                    return (
                      <div key={day} className={styles.weekDay}>
                        {active && (
                          <div className={styles.weekTooltip}>
                            {tooltipText}
                          </div>
                        )}
                        <div className={styles.weekBar}>
                          <div className={`${styles.weekBarFill} ${active ? styles.weekBarActive : ""}`}
                            style={{ height: `${heightPercent}%` }} />
                        </div>
                        <span className={styles.weekLabel}>{day}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className={`${styles.card} ${styles.modesCard}`}>
                <h3 className={styles.cardTitle}>Mode Breakdown</h3>
                <div className={styles.modesList}>
                  {(() => {
                    const qsCount = userProfile.quickSpeakCount || 0;
                    const dCount = userProfile.debateCount || 0;
                    const oCount = userProfile.opinionCount || 0;
                    const totalModes = qsCount + dCount + oCount;
                    const maxThreshold = Math.max(totalModes, 10); // Require at least 10 sessions to start filling 100%
                    const getPercent = (c) => (c / maxThreshold) * 100;
                    
                    return (
                      <>
                        <div className={styles.modeRow}>
                          <span className={styles.modeIcon}><IconLightning size={18} color="var(--accent-yellow)" /></span>
                          <span className={styles.modeLabel}>Quick Speak</span>
                          <span className={styles.modeCount}>{qsCount}</span>
                          <div className={styles.modeBar}><div className={styles.modeBarFill} style={{ width: `${getPercent(qsCount)}%`, background: "var(--accent-yellow)" }} /></div>
                        </div>
                        <div className={styles.modeRow}>
                          <span className={styles.modeIcon}><IconSwords size={18} color="var(--accent-red)" /></span>
                          <span className={styles.modeLabel}>Debate</span>
                          <span className={styles.modeCount}>{dCount}</span>
                          <div className={styles.modeBar}><div className={styles.modeBarFill} style={{ width: `${getPercent(dCount)}%`, background: "var(--accent-red)" }} /></div>
                        </div>
                        <div className={styles.modeRow}>
                          <span className={styles.modeIcon}><IconBubble size={18} color="var(--accent-purple)" /></span>
                          <span className={styles.modeLabel}>Opinion Room</span>
                          <span className={styles.modeCount}>{oCount}</span>
                          <div className={styles.modeBar}><div className={styles.modeBarFill} style={{ width: `${getPercent(oCount)}%`, background: "var(--accent-purple)" }} /></div>
                        </div>
                      </>
                    );
                  })()}
                </div>
              </div>
            </div>
          )}

          {/* BADGES */}
          {activeTab === "badges" && (
            <div className={styles.badgesGrid}>
              {BADGES_DEFS.map((badge, i) => {
                const earned = userProfile.badges?.includes(badge.id);
                return (
                  <div key={i}
                    className={`${styles.badgeCard} ${!earned ? styles.badgeLocked : ""}`}
                    style={{ "--rotate": `${(i % 2 === 0 ? -1 : 1) * (0.5 + Math.random())}deg` }}>
                    <span className={styles.badgeIcon}><badge.Icon size={32} color={earned ? "var(--text-primary)" : "var(--text-muted)"} /></span>
                    <h4 className={styles.badgeName}>{badge.name}</h4>
                    <p className={styles.badgeDesc}>{badge.description}</p>
                    {!earned && <div className={styles.badgeLock}><IconLock size={14} color="var(--text-muted)" /></div>}
                  </div>
                );
              })}
            </div>
          )}

          {/* HISTORY */}
          {activeTab === "history" && (
            <div className={styles.historyList}>
              {historyList.length === 0 ? (
                <p style={{ textAlign: "center", color: "var(--text-muted)", padding: "40px" }}>
                  No sessions yet. Head to Quick Speak or Debate to get started!
                </p>
              ) : historyList.map((session, i) => (
                <div key={i} className={styles.historyCard}>
                  <div className={styles.historyLeft}>
                    <span className={styles.historyMode}>{getModeIcon(session.mode)}</span>
                    <div className={styles.historyInfo}>
                      <h4 className={styles.historyTopic}>{session.topic}</h4>
                      <div className={styles.historyMeta}>
                        <span className={`tag tag-${session.mode === "debate" ? "red" : session.mode === "quick-speak" ? "yellow" : "purple"}`}>
                          {session.category}
                        </span>
                        {session.duration > 0 && (
                          <span className={styles.historyDuration}>{session.duration}m</span>
                        )}
                        <span className={styles.historyDate}>{session.date}</span>
                      </div>
                    </div>
                  </div>
                  <div className={styles.historyRight}>
                    <div className={styles.historyRating}>
                      {[1,2,3,4,5].map(s => (
                        <IconStar key={s} size={14} filled={s <= session.rating} color={s <= session.rating ? "var(--accent-yellow)" : "var(--text-muted)"} />
                      ))}
                    </div>
                    <span className={styles.historyXp}>+{session.xp} XP</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Rank Timeline */}
          {activeTab === "overview" && (
            <div className={styles.rankProgression}>
              <h3 className={`${styles.rankProgressionTitle} handwritten`}>Your Journey</h3>
              <div className={styles.rankTimeline}>
                {RANK_PROGRESS.map((rank, i) => {
                  const isCurrent = rank.name === userProfile.rank;
                  const isCompleted = rank.xp <= userProfile.xp;
                  return (
                    <div key={i} className={`${styles.rankStep} ${isCurrent ? styles.rankCurrent : ""} ${isCompleted ? styles.rankCompleted : ""}`}>
                      <div className={styles.rankStepDot}>
                        <rank.Icon size={18} color={isCurrent ? "var(--accent-purple)" : isCompleted ? "var(--accent-green)" : "var(--text-muted)"} />
                      </div>
                      <span className={styles.rankStepName}>{rank.name}</span>
                      <span className={styles.rankStepXp}>{rank.xp} XP</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </main>
    </ProtectedRoute>
  );
}
