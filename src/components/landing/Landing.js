"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  IconMic, IconLightning, IconBubble, IconSwords, IconFire,
  IconStar, IconTrophy, IconMedal, IconChart, IconShuffle,
  IconArrowRight, IconCheck, IconHeart, IconBrain, IconBriefcase,
  IconScale, IconRocket, IconParty, IconWave, IconSprout,
  IconLogoMark, IconDice, IconClock, IconSparkle, IconDot,
} from "@/components/ui/Icons";
import styles from "./Landing.module.css";

// Floating elements data — speech bubbles, sticky notes, tags (no emojis)
const floatingElements = [
  { id: 1, type: "sticky", text: "Why do we dream?", color: "yellow", x: 8, y: 18, rotate: -3, delay: 0 },
  { id: 2, type: "tag", text: "DEBATE", color: "red", x: 75, y: 12, rotate: 5, delay: 0.2 },
  { id: 3, type: "bubble", text: "Is pineapple on pizza valid?", x: 60, y: 25, rotate: -1, delay: 0.4 },
  { id: 4, type: "sticky", text: "Tell me about your biggest fear", color: "pink", x: 85, y: 35, rotate: 2, delay: 0.6 },
  { id: 5, type: "note", text: "3 min challenge", x: 12, y: 42, rotate: -5, delay: 0.1 },
  { id: 6, type: "tag", text: "FUN", color: "yellow", x: 90, y: 55, rotate: -2, delay: 0.3 },
  { id: 7, type: "sticky", text: "If money didn't exist...", color: "blue", x: 5, y: 65, rotate: 3, delay: 0.5 },
  { id: 8, type: "bubble", text: "Convince me in 60 seconds", x: 35, y: 72, rotate: -2, delay: 0.7 },
  { id: 9, type: "tag", text: "DEEP", color: "blue", x: 70, y: 68, rotate: 4, delay: 0.15 },
  { id: 10, type: "note", text: "7-day streak!", x: 82, y: 78, rotate: -3, delay: 0.35 },
  { id: 11, type: "tag", text: "ETHICS", color: "purple", x: 20, y: 82, rotate: 1, delay: 0.55 },
  { id: 12, type: "sticky", text: "What makes you, you?", color: "green", x: 50, y: 85, rotate: -4, delay: 0.25 },
  { id: 13, type: "bubble", text: "Hot take: school doesn't teach thinking", x: 15, y: 30, rotate: 2, delay: 0.45 },
  { id: 14, type: "tag", text: "CAREER", color: "green", x: 45, y: 15, rotate: -6, delay: 0.65 },
  { id: 15, type: "note", text: "Level Up!", x: 92, y: 22, rotate: 3, delay: 0.08 },
  { id: 16, type: "sticky", text: "Would you rather...", color: "orange", x: 30, y: 55, rotate: -2, delay: 0.38 },
  { id: 17, type: "tag", text: "SPEAK", color: "red", x: 55, y: 45, rotate: 7, delay: 0.48 },
  { id: 18, type: "bubble", text: "I think AI will replace artists", x: 72, y: 48, rotate: -3, delay: 0.58 },
];

function FloatingElement({ el }) {
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    let animationId;
    const speed = 0.3 + Math.random() * 0.4;
    const amplitude = 6 + Math.random() * 8;
    const phaseX = Math.random() * Math.PI * 2;
    const phaseY = Math.random() * Math.PI * 2;
    let time = 0;

    const animate = () => {
      time += 0.008 * speed;
      const x = Math.sin(time + phaseX) * amplitude * 0.5;
      const y = Math.sin(time * 0.7 + phaseY) * amplitude;
      const r = Math.sin(time * 0.3) * 1.5;
      element.style.transform = `translate(${x}px, ${y}px) rotate(${el.rotate + r}deg)`;
      animationId = requestAnimationFrame(animate);
    };

    const timeout = setTimeout(() => {
      animate();
    }, el.delay * 1000);

    return () => {
      clearTimeout(timeout);
      cancelAnimationFrame(animationId);
    };
  }, [el]);

  const getElementContent = () => {
    switch (el.type) {
      case "sticky":
        return (
          <div className={`${styles.stickyNote} ${styles[`sticky${el.color.charAt(0).toUpperCase() + el.color.slice(1)}`]}`}>
            <span className={styles.stickyText}>{el.text}</span>
          </div>
        );
      case "tag":
        return (
          <div className={`${styles.floatingTag} ${styles[`tag${el.color.charAt(0).toUpperCase() + el.color.slice(1)}`]}`}>
            {el.text}
          </div>
        );
      case "bubble":
        return (
          <div className={styles.speechBubble}>
            <span>{el.text}</span>
            <div className={styles.bubbleTail} />
          </div>
        );
      case "note":
        return (
          <div className={styles.scribbleNote}>
            <span>{el.text}</span>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div ref={ref} className={styles.floatingEl}
      style={{ left: `${el.x}%`, top: `${el.y}%`, animationDelay: `${el.delay}s` }}>
      {getElementContent()}
    </div>
  );
}

export default function Landing() {
  const [textVisible, setTextVisible] = useState(false);
  const [floatingVisible, setFloatingVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setTextVisible(true), 300);
    setTimeout(() => setFloatingVisible(true), 800);
  }, []);

  return (
    <div className={styles.landing}>
      {/* ===== HERO SECTION ===== */}
      <section className={styles.hero}>
        <div className={`${styles.floatingContainer} ${floatingVisible ? styles.visible : ""}`}>
          {floatingElements.map((el) => (
            <FloatingElement key={el.id} el={el} />
          ))}
        </div>

        <div className={`${styles.heroContent} ${textVisible ? styles.visible : ""}`}>
          <div className={styles.heroTag}>
            <IconDot size={6} color="var(--accent-green)" />
            <span className={styles.mono}>A SPEAKING PLAYGROUND</span>
          </div>

          <h1 className={styles.heroTitle}>
            <span className={styles.heroLine}>Imagine a world where</span>
            <span className={styles.heroLine}>your thoughts flow <span className={styles.heroItalic}>freely,</span></span>
            <span className={styles.heroLine}><span className={styles.heroBold}>clearly, and fearlessly.</span></span>
          </h1>

          <p className={styles.heroSubtitle}>
            SpeakYourMind transforms communication practice into a social, gamified
            experience. Random topics. Timed challenges. Debates. Opinions.{" "}
            <span className="highlight-yellow">No scripts. No filters.</span>
          </p>

          <div className={styles.heroCtas}>
            <Link href="/quick-speak" className={`btn btn-primary btn-large ${styles.heroBtn}`}>
              <IconMic size={18} />
              Start Speaking Now
            </Link>
            <Link href="/opinion-rooms" className={`btn btn-secondary btn-large ${styles.heroBtn}`}>
              Explore Topics
            </Link>
          </div>

          <div className={styles.heroStats}>
            <div className={styles.heroStat}>
              <span className={styles.heroStatNum}>120+</span>
              <span className={styles.heroStatLabel}>Speaking Prompts</span>
            </div>
            <div className={styles.heroStatDivider} />
            <div className={styles.heroStat}>
              <span className={styles.heroStatNum}>8</span>
              <span className={styles.heroStatLabel}>Categories</span>
            </div>
            <div className={styles.heroStatDivider} />
            <div className={styles.heroStat}>
              <span className={styles.heroStatNum}>3</span>
              <span className={styles.heroStatLabel}>Speaking Modes</span>
            </div>
          </div>
        </div>
      </section>

      {/* ===== MODES SECTION ===== */}
      <section className={styles.modesSection}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <span className={`${styles.sectionTag} handwritten`}>How it works</span>
            <h2 className={styles.sectionTitle}>
              Three ways to <span className="sketch-underline" style={{ color: "var(--accent-red)" }}>speak your mind</span>
            </h2>
            <p className={styles.sectionDesc}>
              Each mode is designed to build a different communication muscle.
              Pick your challenge and start talking.
            </p>
          </div>

          <div className={styles.modesGrid}>
            {/* Quick Speak */}
            <Link href="/quick-speak" className={styles.modeCard}>
              <div className={`${styles.modeIcon} ${styles.modeIconQuick}`}>
                <IconLightning size={28} color="var(--accent-yellow)" />
              </div>
              <div className={styles.modeTag}>
                <span className="tag tag-yellow">QUICK SPEAK</span>
              </div>
              <h3 className={styles.modeTitle}>Think Fast, Speak Now</h3>
              <p className={styles.modeDesc}>
                Get a random topic. A timer starts. You speak. No prep, no notes, no
                second chances. Pure spontaneous thinking under pressure.
              </p>
              <div className={styles.modeFeatures}>
                <span className={styles.modeFeature}><IconDice size={12} /> Random topics</span>
                <span className={styles.modeFeature}><IconClock size={12} /> 1–3 min timer</span>
                <span className={styles.modeFeature}><IconFire size={12} /> Streak tracking</span>
              </div>
              <div className={`${styles.modeArrow} handwritten`}>Let&apos;s go <IconArrowRight size={16} /></div>
            </Link>

            {/* Opinion Rooms */}
            <Link href="/opinion-rooms" className={`${styles.modeCard} ${styles.modeCardFeatured}`}>
              <div className={styles.featuredBadge}>
                <span className="handwritten">Most Popular</span>
              </div>
              <div className={`${styles.modeIcon} ${styles.modeIconOpinion}`}>
                <IconBubble size={28} color="var(--accent-purple)" />
              </div>
              <div className={styles.modeTag}>
                <span className="tag tag-purple">OPINION ROOMS</span>
              </div>
              <h3 className={styles.modeTitle}>Share Your Perspective</h3>
              <p className={styles.modeDesc}>
                Browse thought-provoking prompts across 8 categories. Fun, Deep,
                Ethical, Philosophical — there&apos;s a conversation for every mood.
              </p>
              <div className={styles.modeFeatures}>
                <span className={styles.modeFeature}><IconParty size={12} /> 8 categories</span>
                <span className={styles.modeFeature}><IconBubble size={12} /> Share & discuss</span>
                <span className={styles.modeFeature}><IconHeart size={12} /> React & engage</span>
              </div>
              <div className={`${styles.modeArrow} handwritten`}>Explore <IconArrowRight size={16} /></div>
            </Link>

            {/* Debate */}
            <Link href="/debate" className={styles.modeCard}>
              <div className={`${styles.modeIcon} ${styles.modeIconDebate}`}>
                <IconSwords size={28} color="var(--accent-red)" />
              </div>
              <div className={styles.modeTag}>
                <span className="tag tag-red">DEBATE MODE</span>
              </div>
              <h3 className={styles.modeTitle}>Defend Your Ground</h3>
              <p className={styles.modeDesc}>
                Pick a side on controversial topics. Structure your argument.
                Persuade. Counter. Win hearts and minds in timed speaking rounds.
              </p>
              <div className={styles.modeFeatures}>
                <span className={styles.modeFeature}><IconSwords size={12} /> Two sides</span>
                <span className={styles.modeFeature}><IconBrain size={12} /> Critical thinking</span>
                <span className={styles.modeFeature}><IconTrophy size={12} /> Compete</span>
              </div>
              <div className={`${styles.modeArrow} handwritten`}>Challenge <IconArrowRight size={16} /></div>
            </Link>
          </div>
        </div>
      </section>

      {/* ===== CATEGORIES SCATTER SECTION ===== */}
      <section className={styles.categoriesSection}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <span className={`${styles.sectionTag} handwritten`}>Topics for every mood</span>
            <h2 className={styles.sectionTitle}>
              What do you feel like{" "}
              <span className="highlight-purple">talking about?</span>
            </h2>
          </div>

          <div className={styles.categoriesGrid}>
            {[
              { name: "Fun", Icon: IconParty, color: "#F59E0B", sample: "If animals could talk, which species would be the rudest?" },
              { name: "Deep", Icon: IconWave, color: "#3B82F6", sample: "Is vulnerability a strength or weakness?" },
              { name: "Ethical", Icon: IconScale, color: "#8B5CF6", sample: "Is it ever okay to lie to protect feelings?" },
              { name: "Relationships", Icon: IconHeart, color: "#EC4899", sample: "Can ex-partners truly be friends?" },
              { name: "Career", Icon: IconBriefcase, color: "#10B981", sample: "Is hustle culture toxic or necessary?" },
              { name: "Philosophy", Icon: IconBrain, color: "#6366F1", sample: "Does free will actually exist?" },
              { name: "Debate", Icon: IconFire, color: "#E54D2E", sample: "Social media: more harm than good?" },
              { name: "Hypotheticals", Icon: IconRocket, color: "#F97316", sample: "If the internet shut down forever..." },
            ].map((cat, i) => (
              <div key={cat.name} className={styles.categoryCard}
                style={{ "--cat-color": cat.color, "--rotate": `${(i % 2 === 0 ? -1 : 1) * (1 + ((i * 17) % 20) / 10)}deg`, animationDelay: `${i * 0.1}s` }}>
                <div className={styles.categoryIcon}>
                  <cat.Icon size={28} color={cat.color} />
                </div>
                <h4 className={styles.categoryName}>{cat.name}</h4>
                <p className={styles.categorySample}>&ldquo;{cat.sample}&rdquo;</p>
                <span className={styles.categoryCount}>15 prompts</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== GAMIFICATION SECTION ===== */}
      <section className={styles.gamificationSection}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <span className={`${styles.sectionTag} handwritten`}>Level up your voice</span>
            <h2 className={styles.sectionTitle}>
              Speaking is a game.{" "}
              <span className="highlight-red">Play to win.</span>
            </h2>
            <p className={styles.sectionDesc}>
              Track your streaks, earn badges, climb ranks, and watch yourself
              transform from a nervous speaker to a confident communicator.
            </p>
          </div>

          <div className={styles.gamificationGrid}>
            <div className={`${styles.gamCard} sticky-note sticky-yellow`} style={{ "--rotate": "-2deg" }}>
              <span className={styles.gamIcon}><IconFire size={32} color="var(--accent-orange)" /></span>
              <h4 className={styles.gamTitle}>Daily Streaks</h4>
              <p className={styles.gamDesc}>Speak every day. Build momentum. Never break the chain.</p>
            </div>
            <div className={`${styles.gamCard} sticky-note sticky-pink`} style={{ "--rotate": "1.5deg" }}>
              <span className={styles.gamIcon}><IconTrophy size={32} color="var(--accent-yellow)" /></span>
              <h4 className={styles.gamTitle}>Ranks & Titles</h4>
              <p className={styles.gamDesc}>Novice → Silver Tongue → Golden Voice → Legend.</p>
            </div>
            <div className={`${styles.gamCard} sticky-note sticky-blue`} style={{ "--rotate": "-1deg" }}>
              <span className={styles.gamIcon}><IconMedal size={32} color="var(--accent-blue)" /></span>
              <h4 className={styles.gamTitle}>Earn Badges</h4>
              <p className={styles.gamDesc}>Complete challenges to unlock unique achievements.</p>
            </div>
            <div className={`${styles.gamCard} sticky-note sticky-green`} style={{ "--rotate": "2.5deg" }}>
              <span className={styles.gamIcon}><IconChart size={32} color="var(--accent-green)" /></span>
              <h4 className={styles.gamTitle}>Track Progress</h4>
              <p className={styles.gamDesc}>See your speaking history, growth metrics, and patterns.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CTA SECTION (Envelope-inspired) ===== */}
      <section className={styles.ctaSection}>
        <div className={styles.container}>
          <div className={styles.ctaEnvelope}>
            <div className={styles.ctaFlap} />
            <div className={styles.ctaLetter}>
              <p className={`${styles.ctaLetterText} handwritten`}>
                The best way to improve your speaking
              </p>
              <p className={styles.ctaLetterBold}>
                is to simply start speaking.
              </p>
              <div className={styles.ctaLetterSignature}>
                <span className="handwritten">— SpeakYourMind</span>
              </div>
              <Link href="/quick-speak" className={`btn btn-primary btn-large ${styles.ctaBtn}`}>
                <IconMic size={18} /> Begin Your Journey
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <div className={styles.footerBrand}>
            <span className={styles.footerLogo}>
              <IconLogoMark size={16} color="var(--accent-red)" style={{ display: "inline-block", verticalAlign: "middle", marginRight: "6px" }} />
              SpeakYourMind
            </span>
            <p className={styles.footerTagline}>Find your voice. Own your words.</p>
          </div>
          <div className={styles.footerLinks}>
            <div className={styles.footerCol}>
              <h5>Modes</h5>
              <Link href="/quick-speak">Quick Speak</Link>
              <Link href="/opinion-rooms">Opinion Rooms</Link>
              <Link href="/debate">Debate</Link>
            </div>
            <div className={styles.footerCol}>
              <h5>Progress</h5>
              <Link href="/dashboard">Dashboard</Link>
              <Link href="/profile">Profile</Link>
            </div>
          </div>
          <div className={styles.footerBottom}>
            <span>&copy; 2026 SpeakYourMind. All rights reserved.</span>
            <div className={styles.footerStamps}>
              <span className={styles.stamp}>{"{ A QUIET TOOL }"}</span>
              <span className={styles.stamp}>FOR FEARLESS SPEAKERS</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
