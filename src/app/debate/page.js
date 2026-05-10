"use client";

import { useState, useRef, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import ProtectedRoute from "@/components/layout/ProtectedRoute";
import { useAuth } from "@/context/AuthContext";
import { createLobby, joinLobby, subscribeToLobbies, deleteLobby } from "@/lib/firestore";
import VideoRoom from "@/components/debate/VideoRoom";
import {
  IconSwords, IconThumbUp, IconThumbDown, IconRefresh, IconDot,
  IconLightning, IconSparkle, IconBrain, IconTarget, IconArrowRight,
  IconCheck,
} from "@/components/ui/Icons";
import styles from "./page.module.css";

const DEBATE_TOPICS = [
  "Social media has done more harm than good to society.",
  "AI will ultimately create more jobs than it destroys.",
  "College education should be free for everyone.",
  "Universal basic income is the future of economics.",
  "Climate change activism has become more performative than effective.",
  "Privacy is dead, and we should accept it.",
  "Traditional schooling is outdated and needs to be reimagined.",
  "Mental health days should be legally mandated like sick days.",
  "Space exploration is a waste when Earth has unsolved problems.",
  "Video games are a legitimate art form equal to film and literature.",
];

export default function DebatePage() {
  const { user } = useAuth();
  const [mode, setMode] = useState("live"); // "live" or "solo"
  const [lobbies, setLobbies] = useState([]);
  const [isCreatingLobby, setIsCreatingLobby] = useState(false);
  const [activeDebate, setActiveDebate] = useState(null); // { lobbyId, isHost, topic }

  const [phase, setPhase] = useState("select");
  const [topic, setTopic] = useState(null);
  const [side, setSide] = useState(null);
  const [round, setRound] = useState(1);
  const [timeLeft, setTimeLeft] = useState(90);
  const [prepTime, setPrepTime] = useState(30);
  const timerRef = useRef(null);

  useEffect(() => {
    if (mode === "live") {
      const unsubscribe = subscribeToLobbies(setLobbies);
      return () => unsubscribe();
    }
  }, [mode]);



  const handleCreateLiveDebate = async (t) => {
    if (!user) return alert("Please log in to host a debate");
    setIsCreatingLobby(true);
    try {
      const lobbyDoc = await createLobby(t, user, null);
      setActiveDebate({ lobbyId: lobbyDoc.id, isHost: true, topic: t });
    } catch (e) { console.error(e); }
    setIsCreatingLobby(false);
  };

  const handleJoinLobby = async (lobby) => {
    if (!user) return alert("Please log in to join");
    try {
      await joinLobby(lobby.id, user, null);
      setActiveDebate({ lobbyId: lobby.id, isHost: false, topic: lobby.topic });
    } catch (e) { console.error(e); }
  };

  const handleDeleteLobby = async (lobbyId) => {
    try {
      await deleteLobby(lobbyId);
    } catch (e) { console.error("Failed to delete lobby", e); }
  };

  const selectTopic = (t) => setTopic(t);

  const chooseSide = (s) => {
    setSide(s); setPhase("prepare"); setPrepTime(30);
    let time = 30;
    timerRef.current = setInterval(() => {
      time--;
      setPrepTime(time);
      if (time <= 0) { clearInterval(timerRef.current); startRound(); }
    }, 1000);
  };

  const skipPrep = () => { clearInterval(timerRef.current); startRound(); };

  const startRound = () => {
    setPhase("speaking"); setTimeLeft(90);
    let time = 90;
    timerRef.current = setInterval(() => {
      time--;
      setTimeLeft(time);
      if (time <= 0) {
        clearInterval(timerRef.current);
        setPhase(round === 1 ? "switch" : "complete");
      }
    }, 1000);
  };

  const switchSides = () => {
    setSide(side === "for" ? "against" : "for");
    setRound(2); setPhase("prepare"); setPrepTime(30);
    let time = 30;
    timerRef.current = setInterval(() => {
      time--;
      setPrepTime(time);
      if (time <= 0) { clearInterval(timerRef.current); startRound(); }
    }, 1000);
  };

  const endEarly = () => {
    clearInterval(timerRef.current);
    setPhase(round === 1 ? "switch" : "complete");
  };

  const reset = () => {
    clearInterval(timerRef.current);
    setPhase("select"); setTopic(null); setSide(null); setRound(1); setTimeLeft(90);
  };

  const formatTime = (s) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, "0")}`;
  const progress = timeLeft / 90;
  const circumference = 2 * Math.PI * 100;
  const dashOffset = circumference * (1 - progress);

  return (
    <ProtectedRoute>
      <Navbar />
      <main className={styles.main}>
        <div className={styles.container}>
          {activeDebate ? (
            <VideoRoom
              lobbyId={activeDebate.lobbyId}
              isHost={activeDebate.isHost}
              userName={user?.displayName || user?.email?.split('@')[0] || 'User'}
              topic={activeDebate.topic}
              onLeave={() => setActiveDebate(null)}
            />
          ) : phase === "select" && (
            <div className={styles.selectPhase}>
              <div className={styles.header}>
                <span className={`${styles.headerTag} handwritten`}>Debate Mode</span>
                <h1 className={styles.title}>Pick your battle</h1>
                
                <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginTop: '20px' }}>
                  <button className={`btn ${mode === 'live' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setMode('live')}>Live Lobbies</button>
                  <button className={`btn ${mode === 'solo' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setMode('solo')}>Solo Practice</button>
                </div>
              </div>

              {mode === "live" && (
                <div style={{ marginTop: '2rem' }}>
                  <h3 className={styles.sideTitle}>Active Lobbies</h3>
                  {lobbies.length === 0 ? (
                    <p style={{ textAlign: 'center', color: 'var(--text-muted)' }}>No active lobbies. Start one below!</p>
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      {lobbies.map(lobby => (
                        <div key={lobby.id} style={{ padding: '16px', background: 'white', border: '2px solid var(--border-color)', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <div>
                            <p style={{ fontWeight: 600, fontSize: '1.1rem' }}>&ldquo;{lobby.topic}&rdquo;</p>
                            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Hosted by: {lobby.host.name}</p>
                          </div>
                          <div style={{ display: 'flex', gap: '8px' }}>
                            {lobby.host.uid === user?.uid ? (
                              <button className="btn btn-secondary" onClick={() => handleDeleteLobby(lobby.id)}>
                                Close Lobby
                              </button>
                            ) : (
                              <button className="btn btn-primary" onClick={() => handleJoinLobby(lobby)}>
                                Join Debate
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  <h3 className={styles.sideTitle} style={{ marginTop: '3rem' }}>Or host a new topic:</h3>
                  <div className={styles.topicsList}>
                    {DEBATE_TOPICS.map((t, i) => (
                      <button key={i}
                        className={`${styles.topicCard} ${topic === t ? styles.topicActive : ""}`}
                        onClick={() => handleCreateLiveDebate(t)} disabled={isCreatingLobby}>
                        <span className={styles.topicNum}>{i + 1}</span>
                        <span className={styles.topicText}>{t}</span>
                        <span style={{marginLeft:'auto', opacity: 0.5}}><IconSwords size={16}/> Host Live</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {mode === "solo" && (
                <>
                  <div className={styles.topicsList}>
                {DEBATE_TOPICS.map((t, i) => (
                  <button key={i}
                    className={`${styles.topicCard} ${topic === t ? styles.topicActive : ""}`}
                    onClick={() => selectTopic(t)}>
                    <span className={styles.topicNum}>{i + 1}</span>
                    <span className={styles.topicText}>{t}</span>
                    {topic === t && <span className={styles.topicCheck}><IconCheck size={18} color="var(--accent-green)" /></span>}
                  </button>
                ))}
              </div>

              {topic && (
                <div className={styles.sideSelection}>
                  <h3 className={styles.sideTitle}>Choose your side:</h3>
                  <div className={styles.sideGrid}>
                    <button className={`${styles.sideBtn} ${styles.sideFor}`} onClick={() => chooseSide("for")}>
                      <span className={styles.sideIcon}><IconThumbUp size={32} color="var(--accent-green)" /></span>
                      <span className={styles.sideLabel}>FOR</span>
                      <span className={styles.sideDesc}>Argue in support</span>
                    </button>
                    <div className={styles.sideVs}>
                      <span className="handwritten" style={{ fontSize: "1.5rem" }}>vs</span>
                    </div>
                    <button className={`${styles.sideBtn} ${styles.sideAgainst}`} onClick={() => chooseSide("against")}>
                      <span className={styles.sideIcon}><IconThumbDown size={32} color="var(--accent-red)" /></span>
                      <span className={styles.sideLabel}>AGAINST</span>
                      <span className={styles.sideDesc}>Argue in opposition</span>
                    </button>
                  </div>
                </div>
              )}
                </>
              )}
            </div>
          )}

          {/* PREPARE */}
          {phase === "prepare" && (
            <div className={styles.prepPhase}>
              <div className={styles.prepBadge}>
                <span className={`tag ${side === "for" ? "tag-green" : "tag-red"}`}>
                  {side === "for" ? "FOR" : "AGAINST"} — Round {round}
                </span>
              </div>
              <h2 className={styles.prepTitle}>Prepare your argument</h2>
              <p className={styles.prepTopic}>&ldquo;{topic}&rdquo;</p>
              <div className={styles.prepTimer}>
                <span className={styles.prepTimerNum}>{prepTime}</span>
                <span className={styles.prepTimerLabel}>seconds to prepare</span>
              </div>
              <button className={`btn btn-primary ${styles.skipBtn}`} onClick={skipPrep}>
                Skip <IconArrowRight size={14} /> Start Speaking
              </button>
            </div>
          )}

          {/* SPEAKING */}
          {phase === "speaking" && (
            <div className={styles.speakingPhase}>
              <div className={styles.roundBadge}>
                <span className={`tag ${side === "for" ? "tag-green" : "tag-red"}`}>
                  {side === "for" ? "FOR" : "AGAINST"} — Round {round}/2
                </span>
              </div>

              <div className={styles.debateTimer}>
                <svg className={styles.timerSvg} viewBox="0 0 220 220">
                  <circle cx="110" cy="110" r="100" fill="none" stroke="rgba(0,0,0,0.04)" strokeWidth="5" />
                  <circle cx="110" cy="110" r="100" fill="none"
                    stroke={side === "for" ? "#10B981" : "#E54D2E"}
                    strokeWidth="5" strokeLinecap="round"
                    strokeDasharray={circumference} strokeDashoffset={dashOffset}
                    transform="rotate(-90 110 110)"
                    style={{ transition: "stroke-dashoffset 1s linear" }} />
                </svg>
                <div className={styles.timerCenter}>
                  <span className={styles.timerTime}>{formatTime(timeLeft)}</span>
                </div>
              </div>

              <div className={styles.recordingIndicator}>
                <IconDot size={8} color="var(--accent-red)" className={styles.recordingDot} />
                <span>DEBATING</span>
              </div>

              <div className={styles.debateTopic}><p>&ldquo;{topic}&rdquo;</p></div>

              <button className="btn btn-secondary" onClick={endEarly}>
                End Round
              </button>
            </div>
          )}

          {/* SWITCH */}
          {phase === "switch" && (
            <div className={styles.switchPhase}>
              <div className={styles.switchIcon}><IconRefresh size={56} color="var(--accent-purple)" /></div>
              <h2 className={styles.switchTitle}>Time to switch sides!</h2>
              <p className={styles.switchDesc}>
                You argued <strong>{side === "for" ? "FOR" : "AGAINST"}</strong> the topic.
                Now defend the <strong>{side === "for" ? "opposite" : "supporting"}</strong> position.
              </p>
              <p className={styles.switchTip}>
                <span className="handwritten" style={{ fontSize: "1.2rem", color: "var(--accent-purple)" }}>
                  This builds empathy and critical thinking
                </span>
              </p>
              <button className="btn btn-primary btn-large" onClick={switchSides}>
                <IconSwords size={16} /> Switch & Continue
              </button>
            </div>
          )}

          {/* COMPLETE */}
          {phase === "complete" && (
            <div className={styles.completePhase}>
              <div className={styles.completeIcon}>
                <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="var(--accent-yellow)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M8 3h8v7c0 2.2-1.8 4-4 4s-4-1.8-4-4V3z" />
                  <path d="M8 5H5c0 3 1.5 5 3 5" />
                  <path d="M16 5h3c0 3-1.5 5-3 5" />
                  <path d="M12 14v3" /><path d="M8 21h8" /><path d="M10 17h4" />
                </svg>
              </div>
              <h2 className={styles.completeTitle}>Debate Complete!</h2>
              <p className={styles.completeDesc}>You argued both sides of:</p>
              <p className={styles.completeTopic}>&ldquo;{topic}&rdquo;</p>

              <div className={styles.completeStats}>
                <div className={styles.completeStat}>
                  <span className={styles.completeStatIcon}><IconLightning size={24} color="var(--accent-yellow)" /></span>
                  <span className={styles.completeStatLabel}>Rounds</span>
                  <span className={styles.completeStatVal}>2/2</span>
                </div>
                <div className={styles.completeStat}>
                  <span className={styles.completeStatIcon}><IconSparkle size={24} color="var(--accent-green)" /></span>
                  <span className={styles.completeStatLabel}>XP Earned</span>
                  <span className={styles.completeStatVal}>+150</span>
                </div>
                <div className={styles.completeStat}>
                  <span className={styles.completeStatIcon}><IconBrain size={24} color="var(--accent-purple)" /></span>
                  <span className={styles.completeStatLabel}>Skill</span>
                  <span className={styles.completeStatVal}>Critical Thinking</span>
                </div>
              </div>

              <button className="btn btn-primary btn-large" onClick={reset}>
                <IconTarget size={16} /> New Debate
              </button>
            </div>
          )}
        </div>
      </main>
    </ProtectedRoute>
  );
}
