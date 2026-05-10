"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import { login, signup, loginWithGoogle } from "@/lib/auth";
import { IconLogoMark, IconArrowRight, IconGoogle } from "@/components/ui/Icons";
import styles from "./page.module.css";

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (isLogin) {
        await login(email, password);
        router.push("/dashboard");
      } else {
        await signup(email, password, name);
        router.push("/dashboard");
      }
    } catch (err) {
      // Format Firebase error messages nicely
      const message = err.message.replace("Firebase: ", "").replace(/\\(auth.*\\)./, "");
      setError(message || "An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError("");
    setLoading(true);
    try {
      await loginWithGoogle();
      router.push("/dashboard");
    } catch (err) {
      if (err.code !== "auth/popup-closed-by-user") {
        setError("Failed to sign in with Google. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <main className={styles.main}>
        <div className={styles.container}>
          <div className={styles.authCard}>
            <div className={styles.header}>
              <div className={styles.logoWrapper}>
                <IconLogoMark size={32} color="var(--accent-red)" />
              </div>
              <h1 className={styles.title}>
                {isLogin ? "Welcome back" : "Create an account"}
              </h1>
              <p className={styles.subtitle}>
                {isLogin 
                  ? "Log in to track your speaking progress." 
                  : "Join the playground for fearless speakers."}
              </p>
            </div>

            {error && (
              <div className={styles.errorAlert}>
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className={styles.form}>
              {!isLogin && (
                <div className={styles.inputGroup}>
                  <label htmlFor="name" className={styles.label}>Display Name</label>
                  <input
                    id="name"
                    type="text"
                    className={styles.input}
                    placeholder="How should we call you?"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required={!isLogin}
                  />
                </div>
              )}

              <div className={styles.inputGroup}>
                <label htmlFor="email" className={styles.label}>Email Address</label>
                <input
                  id="email"
                  type="email"
                  className={styles.input}
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className={styles.inputGroup}>
                <label htmlFor="password" className={styles.label}>Password</label>
                <input
                  id="password"
                  type="password"
                  className={styles.input}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                />
              </div>

              <button 
                type="submit" 
                className={`btn btn-primary btn-large ${styles.submitBtn}`}
                disabled={loading}
              >
                {loading ? "Please wait..." : isLogin ? "Sign In" : "Create Account"}
                {!loading && <IconArrowRight size={18} />}
              </button>
            </form>

            <div className={styles.divider}>
              <span className={styles.dividerText}>or</span>
            </div>

            <button 
              type="button" 
              className={`btn btn-secondary btn-large ${styles.googleBtn}`}
              onClick={handleGoogleLogin}
              disabled={loading}
            >
              <IconGoogle size={18} />
              Continue with Google
            </button>

            <div className={styles.footer}>
              <p className={styles.toggleText}>
                {isLogin ? "Don't have an account?" : "Already have an account?"}
                <button 
                  type="button"
                  className={styles.toggleBtn}
                  onClick={() => {
                    setIsLogin(!isLogin);
                    setError("");
                  }}
                >
                  {isLogin ? "Sign up" : "Log in"}
                </button>
              </p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
