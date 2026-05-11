"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import ProtectedRoute from "@/components/layout/ProtectedRoute";
import { useAuth } from "@/context/AuthContext";
import { getUserSessions } from "@/lib/firestore";
import Link from "next/link";
import { IconClock, IconTarget } from "@/components/ui/Icons";
import styles from "./page.module.css";

export default function NotesPage() {
  const { user } = useAuth();
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    
    const fetchNotes = async () => {
      try {
        const history = await getUserSessions(user.uid);
        // Filter out sessions that have a truthy "notes" field
        const sessionsWithNotes = history.filter(s => s.notes && s.notes.trim() !== "");
        
        // Sort by newest first
        sessionsWithNotes.sort((a, b) => {
          const dateA = a.createdAt?.toMillis ? a.createdAt.toMillis() : (a.createdAt || 0);
          const dateB = b.createdAt?.toMillis ? b.createdAt.toMillis() : (b.createdAt || 0);
          return dateB - dateA;
        });

        setNotes(sessionsWithNotes);
      } catch (err) {
        console.error("Failed to fetch notes:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, [user]);

  const formatDate = (timestamp) => {
    if (!timestamp) return "Unknown Date";
    const d = new Date(timestamp.toMillis ? timestamp.toMillis() : timestamp);
    return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  };

  const formatDuration = (seconds) => {
    if (!seconds) return "0s";
    if (seconds < 60) return `${seconds}s`;
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return s > 0 ? `${m}m ${s}s` : `${m}m`;
  };

  return (
    <ProtectedRoute>
      <Navbar />
      <main className={styles.main}>
        <div className={styles.container}>
          <div className={styles.header}>
            <span className={`${styles.headerTag} handwritten`}>My Private Notes</span>
            <h1 className={styles.title}>Your Thoughts, Captured</h1>
            <p className={styles.subtitle}>
              Review the personal notes and self-reflections you saved during your Quick Speak sessions.
            </p>
          </div>

          {loading ? (
            <div style={{ textAlign: "center", padding: "40px" }}>Loading notes...</div>
          ) : notes.length === 0 ? (
            <div className={styles.emptyState}>
              <h3>No notes yet</h3>
              <p>You haven&apos;t saved any private notes during your sessions.</p>
              <Link href="/quick-speak" className="btn btn-primary">
                Start a Quick Speak Session
              </Link>
            </div>
          ) : (
            <div className={styles.notesGrid}>
              {notes.map((note) => (
                <div key={note.id} className={styles.noteCard}>
                  <div className={styles.noteHeader}>
                    <h3 className={styles.noteTopic}>{note.topic || "General Discussion"}</h3>
                    <span className={styles.noteDate}>{formatDate(note.createdAt)}</span>
                  </div>
                  
                  <div className={styles.noteBody}>
                    {note.notes}
                  </div>
                  
                  <div className={styles.noteFooter}>
                    <span className={`${styles.badge} ${styles.badgeCategory}`}>
                      <IconTarget size={12} />
                      {note.category || "General"}
                    </span>
                    {note.actualDuration && (
                      <span className={`${styles.badge} ${styles.badgeDuration}`}>
                        <IconClock size={12} />
                        {formatDuration(note.actualDuration)}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </ProtectedRoute>
  );
}
