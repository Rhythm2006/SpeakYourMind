"use client";

import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import ProtectedRoute from "@/components/layout/ProtectedRoute";
import {
  IconFire, IconMic, IconLightning, IconBubble, IconSwords,
  IconStar, IconTrophy, IconMedal, IconChart, IconSparkle,
  IconSprout, IconCrown, IconClock, IconWind, IconOwl, IconLock,
  IconCheck, IconTarget,
} from "@/components/ui/Icons";
import styles from "./page.module.css";

const DEMO_USER = {
  name: "Speaker", rank: "Finding Voice", level: 3,
  xp: 450, xpToNext: 600, streak: 5, longestStreak: 12,
  totalSessions: 23, totalMinutes: 47,
  quickSpeakCount: 15, debateCount: 4, opinionCount: 4,
};

const DEMO_BADGES = [
  { name: "First Words", Icon: IconMic, earned: true, description: "Complete your first session" },
  { name: "Three's a Charm", Icon: IconFire, earned: true, description: "3-day streak" },
  { name: "Week Warrior", Icon: IconLightning, earned: false, description: "7-day streak" },
  { name: "Quick Thinker", Icon: IconWind, earned: true, description: "10 Quick Speak sessions" },
  { name: "Debater", Icon: IconSwords, earned: false, description: "5 debate sessions" },
  { name: "Hour Power", Icon: IconClock, earned: false, description: "1 hour total speaking" },
  { name: "Opinionated", Icon: IconBubble, earned: false, description: "20 opinions shared" },
  { name: "Night Owl", Icon: IconOwl, earned: false, description: "Session after midnight" },
];

const DEMO_HISTORY = [
  { mode: "quick-speak", topic: "If animals could talk, which would be the rudest?", category: "Fun", duration: 60, rating: 4, xp: 100, date: "Today" },
  { mode: "debate", topic: "Social media has done more harm than good", category: "Debate", duration: 180, rating: 5, xp: 150, date: "Today" },
  { mode: "quick-speak", topic: "Is vulnerability a strength or weakness?", category: "Deep", duration: 120, rating: 3, xp: 80, date: "Yesterday" },
  { mode: "opinion-room", topic: "Is hustle culture toxic or necessary?", category: "Career", duration: 0, rating: 4, xp: 50, date: "Yesterday" },
  { mode: "quick-speak", topic: "What makes something 'real'?", category: "Philosophy", duration: 60, rating: 5, xp: 100, date: "2 days ago" },
];

const RANK_PROGRESS = [
  { name: "Novice", Icon: IconSprout, xp: 0 },
  { name: "Warming Up", Icon: IconFire, xp: 100 },
  { name: "Finding Voice", Icon: IconMic, xp: 300, current: true },
  { name: "Confident", Icon: IconBubble, xp: 600 },
  { name: "Eloquent", Icon: IconSparkle, xp: 1000 },
  { name: "Silver Tongue", Icon: IconMedal, xp: 1500 },
  { name: "Golden Voice", Icon: IconTrophy, xp: 2500 },
  { name: "Legend", Icon: IconCrown, xp: 10000 },
];

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const user = DEMO_USER;
  const xpProgress = ((user.xp - 300) / (user.xpToNext - 300)) * 100;

  const getModeIcon = (mode) => {
    if (mode === "quick-speak") return <IconLightning size={20} color="var(--accent-yellow)" />;
    if (mode === "debate") return <IconSwords size={20} color="var(--accent-red)" />;
    return <IconBubble size={20} color="var(--accent-purple)" />;
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
                Welcome back, <span className={styles.titleName}>{user.name}</span>
              </h1>
              <p className={styles.subtitle}>
                Keep the momentum going.{" "}
                <span className="highlight-yellow">Your voice matters.</span>
              </p>
            </div>
            <div className={styles.streakCard}>
              <span className={styles.streakIcon}><IconFire size={28} color="var(--accent-orange)" /></span>
              <span className={styles.streakNum}>{user.streak}</span>
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
                  <span className={styles.rankName}>{user.rank}</span>
                  <span className={styles.rankLevel}>Level {user.level}</span>
                </div>
                <div className={styles.xpBar}>
                  <div className={styles.xpBarFill} style={{ width: `${xpProgress}%` }} />
                </div>
                <div className={styles.xpLabels}>
                  <span>{user.xp} XP</span><span>{user.xpToNext} XP</span>
                </div>
              </div>

              <div className={`${styles.card} ${styles.statsCard}`}>
                <h3 className={styles.cardTitle}>Speaking Stats</h3>
                <div className={styles.statsGrid}>
                  <div className={styles.statItem}><span className={styles.statNum}>{user.totalSessions}</span><span className={styles.statLabel}>Sessions</span></div>
                  <div className={styles.statItem}><span className={styles.statNum}>{user.totalMinutes}</span><span className={styles.statLabel}>Minutes Spoken</span></div>
                  <div className={styles.statItem}><span className={styles.statNum}>{user.longestStreak}</span><span className={styles.statLabel}>Best Streak</span></div>
                  <div className={styles.statItem}><span className={styles.statNum}>{user.quickSpeakCount}</span><span className={styles.statLabel}>Quick Speaks</span></div>
                </div>
              </div>

              <div className={`${styles.card} ${styles.activityCard}`}>
                <h3 className={styles.cardTitle}>This Week</h3>
                <div className={styles.weekGrid}>
                  {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, i) => {
                    const active = i < 5;
                    const sessions = active ? Math.floor(Math.random() * 3) + 1 : 0;
                    return (
                      <div key={day} className={styles.weekDay}>
                        <div className={styles.weekBar}>
                          <div className={`${styles.weekBarFill} ${active ? styles.weekBarActive : ""}`}
                            style={{ height: `${sessions * 30}%` }} />
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
                  <div className={styles.modeRow}>
                    <span className={styles.modeIcon}><IconLightning size={18} color="var(--accent-yellow)" /></span>
                    <span className={styles.modeLabel}>Quick Speak</span>
                    <span className={styles.modeCount}>{user.quickSpeakCount}</span>
                    <div className={styles.modeBar}><div className={styles.modeBarFill} style={{ width: "65%", background: "var(--accent-yellow)" }} /></div>
                  </div>
                  <div className={styles.modeRow}>
                    <span className={styles.modeIcon}><IconSwords size={18} color="var(--accent-red)" /></span>
                    <span className={styles.modeLabel}>Debate</span>
                    <span className={styles.modeCount}>{user.debateCount}</span>
                    <div className={styles.modeBar}><div className={styles.modeBarFill} style={{ width: "17%", background: "var(--accent-red)" }} /></div>
                  </div>
                  <div className={styles.modeRow}>
                    <span className={styles.modeIcon}><IconBubble size={18} color="var(--accent-purple)" /></span>
                    <span className={styles.modeLabel}>Opinion Room</span>
                    <span className={styles.modeCount}>{user.opinionCount}</span>
                    <div className={styles.modeBar}><div className={styles.modeBarFill} style={{ width: "18%", background: "var(--accent-purple)" }} /></div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* BADGES */}
          {activeTab === "badges" && (
            <div className={styles.badgesGrid}>
              {DEMO_BADGES.map((badge, i) => (
                <div key={i}
                  className={`${styles.badgeCard} ${!badge.earned ? styles.badgeLocked : ""}`}
                  style={{ "--rotate": `${(i % 2 === 0 ? -1 : 1) * (0.5 + Math.random())}deg` }}>
                  <span className={styles.badgeIcon}><badge.Icon size={32} color={badge.earned ? "var(--text-primary)" : "var(--text-muted)"} /></span>
                  <h4 className={styles.badgeName}>{badge.name}</h4>
                  <p className={styles.badgeDesc}>{badge.description}</p>
                  {!badge.earned && <div className={styles.badgeLock}><IconLock size={14} color="var(--text-muted)" /></div>}
                </div>
              ))}
            </div>
          )}

          {/* HISTORY */}
          {activeTab === "history" && (
            <div className={styles.historyList}>
              {DEMO_HISTORY.map((session, i) => (
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
                          <span className={styles.historyDuration}>{Math.floor(session.duration / 60)}m</span>
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
                {RANK_PROGRESS.map((rank, i) => (
                  <div key={i} className={`${styles.rankStep} ${rank.current ? styles.rankCurrent : ""} ${rank.xp <= user.xp ? styles.rankCompleted : ""}`}>
                    <div className={styles.rankStepDot}>
                      <rank.Icon size={18} color={rank.current ? "var(--accent-purple)" : rank.xp <= user.xp ? "var(--accent-green)" : "var(--text-muted)"} />
                    </div>
                    <span className={styles.rankStepName}>{rank.name}</span>
                    <span className={styles.rankStepXp}>{rank.xp} XP</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </ProtectedRoute>
  );
}
