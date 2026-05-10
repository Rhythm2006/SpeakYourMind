"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { logout } from "@/lib/auth";
import { IconLogoMark } from "@/components/ui/Icons";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ""}`}>
      <div className={styles.inner}>
        {/* Logo */}
        <Link href="/" className={styles.logo}>
          <span className={styles.logoIcon}><IconLogoMark size={20} color="var(--accent-red)" /></span>
          <span className={styles.logoText}>SpeakYourMind</span>
        </Link>

        {/* Desktop Navigation */}
        <div className={styles.links}>
          {user && (
            <>
              <Link href="/quick-speak" className={styles.link}>Quick Speak</Link>
              <Link href="/opinion-rooms" className={styles.link}>Opinion Rooms</Link>
              <Link href="/debate" className={styles.link}>Debate</Link>
              <Link href="/dashboard" className={styles.link}>Dashboard</Link>
            </>
          )}
        </div>

        {/* CTA */}
        <div className={styles.actions}>
          {user ? (
            <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
              <button onClick={() => logout()} className="btn btn-secondary">
                Log Out
              </button>
              <Link href="/quick-speak" className={`btn btn-primary ${styles.cta}`}>
                Start Speaking
              </Link>
            </div>
          ) : (
            <Link href="/login" className={`btn btn-primary ${styles.cta}`}>
              Log In
            </Link>
          )}
        </div>

        {/* Mobile hamburger */}
        <button
          className={`${styles.hamburger} ${menuOpen ? styles.open : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className={styles.mobileMenu}>
          {user ? (
            <>
              <Link href="/quick-speak" onClick={() => setMenuOpen(false)}>Quick Speak</Link>
              <Link href="/opinion-rooms" onClick={() => setMenuOpen(false)}>Opinion Rooms</Link>
              <Link href="/debate" onClick={() => setMenuOpen(false)}>Debate</Link>
              <Link href="/dashboard" onClick={() => setMenuOpen(false)}>Dashboard</Link>
              <button 
                onClick={() => { logout(); setMenuOpen(false); }}
                style={{ textAlign: "left", background: "none", border: "none", padding: "16px", fontSize: "1rem", color: "var(--accent-red)", fontWeight: "600", cursor: "pointer" }}
              >
                Log Out
              </button>
              <Link href="/quick-speak" className="btn btn-primary" onClick={() => setMenuOpen(false)}>
                Start Speaking
              </Link>
            </>
          ) : (
            <Link href="/login" className="btn btn-primary" onClick={() => setMenuOpen(false)}>
              Log In to Play
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}
