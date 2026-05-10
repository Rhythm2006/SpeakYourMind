// Hand-drawn SVG icon library — sketchy, organic, Feather Computer aesthetic
// All icons use imperfect strokes, round caps, and organic shapes

export function IconMic({ size = 24, color = "currentColor", ...props }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M12 2.5c-1.7 0-3.1 1.4-3.1 3.2v5.1c0 1.7 1.4 3.2 3.1 3.2s3.1-1.4 3.1-3.2V5.7C15.1 3.9 13.7 2.5 12 2.5z" />
      <path d="M18.5 10.5c0 3.6-2.9 6.5-6.5 6.5s-6.5-2.9-6.5-6.5" />
      <path d="M12 17v4.5" />
      <path d="M8.5 21.5h7" />
    </svg>
  );
}

export function IconLightning({ size = 24, color = "currentColor", ...props }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M13.5 2L5.5 14h5.5l-1 8 8.5-12h-6z" />
    </svg>
  );
}

export function IconBubble({ size = 24, color = "currentColor", ...props }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M21 12c0 4.4-4 8-9 8-1.6 0-3-.3-4.3-.9L3 21l1.5-4.2C3.5 15.3 3 13.7 3 12c0-4.4 4-8 9-8s9 3.6 9 8z" />
    </svg>
  );
}

export function IconSwords({ size = 24, color = "currentColor", ...props }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M4 20l5-5m-3.5 1.5l2 2" />
      <path d="M14.5 3.5l-10 10 2 2 10-10" />
      <path d="M20 4l-5 5m3.5-1.5l-2-2" />
      <path d="M9.5 3.5l10 10-2 2-10-10" />
    </svg>
  );
}

export function IconFire({ size = 24, color = "currentColor", ...props }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M12 22c4-2 7-5.5 7-10 0-3-1.5-5.5-3-7.5-.5-.7-1.5-.3-1.5.5 0 1.5-.5 3-2 4-1-3-3-5.5-4.5-7-.5-.5-1.4-.2-1.4.5C6.6 5 5 8 5 12c0 4.5 3 8 7 10z" />
      <path d="M12 22c-2-1.5-3-3.5-3-5.5 0-2 1.5-3.5 3-4.5 1.5 1 3 2.5 3 4.5 0 2-1 4-3 5.5z" />
    </svg>
  );
}

export function IconStar({ size = 24, color = "currentColor", filled = false, ...props }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={filled ? color : "none"} stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M12 3l2.5 5.5 6 .7-4.4 4 1.2 5.8L12 16.3 6.7 19l1.2-5.8-4.4-4 6-.7z" />
    </svg>
  );
}

export function IconTrophy({ size = 24, color = "currentColor", ...props }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M8 3h8v7c0 2.2-1.8 4-4 4s-4-1.8-4-4V3z" />
      <path d="M8 5H5c0 3 1.5 5 3 5" />
      <path d="M16 5h3c0 3-1.5 5-3 5" />
      <path d="M12 14v3" />
      <path d="M8 21h8" />
      <path d="M10 17h4" />
    </svg>
  );
}

export function IconMedal({ size = 24, color = "currentColor", ...props }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M8 2l2 6h-4z" />
      <path d="M16 2l-2 6h4z" />
      <circle cx="12" cy="14" r="6" />
      <path d="M12 11v6" />
      <path d="M9 14h6" />
    </svg>
  );
}

export function IconChart({ size = 24, color = "currentColor", ...props }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M3 20h18" />
      <path d="M6 16v4" />
      <path d="M10 12v8" />
      <path d="M14 8v12" />
      <path d="M18 4v16" />
    </svg>
  );
}

export function IconShuffle({ size = 24, color = "currentColor", ...props }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M3 8h4l4 8h6" />
      <path d="M3 16h4l4-8h6" />
      <path d="M18 6l3 3-3 3" />
      <path d="M18 14l3 3-3 3" />
    </svg>
  );
}

export function IconArrowRight({ size = 24, color = "currentColor", ...props }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M5 12h14" />
      <path d="M13 6l6 6-6 6" />
    </svg>
  );
}

export function IconArrowLeft({ size = 24, color = "currentColor", ...props }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M19 12H5" />
      <path d="M11 18l-6-6 6-6" />
    </svg>
  );
}

export function IconCheck({ size = 24, color = "currentColor", ...props }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M5 13l4 4L19 7" />
    </svg>
  );
}

export function IconLock({ size = 24, color = "currentColor", ...props }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="5" y="11" width="14" height="10" rx="2" />
      <path d="M8 11V7a4 4 0 118 0v4" />
    </svg>
  );
}

export function IconHeart({ size = 24, color = "currentColor", ...props }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M12 21C12 21 3 14.5 3 8.5 3 5.5 5.5 3 8.5 3c1.7 0 3.2.8 3.5 2 .3-1.2 1.8-2 3.5-2C18.5 3 21 5.5 21 8.5 21 14.5 12 21 12 21z" />
    </svg>
  );
}

export function IconBrain({ size = 24, color = "currentColor", ...props }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M12 3C9.5 3 7.5 5 7.5 7.5c-2 .5-3.5 2.5-3.5 4.5 0 2.5 2 4.5 4.5 4.5h1.5v4h4v-4h1.5c2.5 0 4.5-2 4.5-4.5 0-2-1.5-4-3.5-4.5C16.5 5 14.5 3 12 3z" />
      <path d="M12 3v13" />
    </svg>
  );
}

export function IconBriefcase({ size = 24, color = "currentColor", ...props }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="3" y="7" width="18" height="13" rx="2" />
      <path d="M8 7V5c0-1.1.9-2 2-2h4c1.1 0 2 .9 2 2v2" />
      <path d="M3 12h18" />
    </svg>
  );
}

export function IconScale({ size = 24, color = "currentColor", ...props }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M12 3v18" />
      <path d="M4 7l8-4 8 4" />
      <path d="M4 7l-1 7h6L8 7" />
      <path d="M20 7l1 7h-6l-1-7" />
    </svg>
  );
}

export function IconRocket({ size = 24, color = "currentColor", ...props }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M12 2c-3 4-4 8-4 12l4 4 4-4c0-4-1-8-4-12z" />
      <path d="M8 14l-3 3 2 2" />
      <path d="M16 14l3 3-2 2" />
      <circle cx="12" cy="11" r="1.5" />
    </svg>
  );
}

export function IconParty({ size = 24, color = "currentColor", ...props }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M5.5 21L3 10l11 3z" />
      <path d="M9 14l-2.5-1" />
      <path d="M13 4l1 2" />
      <path d="M18 3l-1 3" />
      <path d="M20 8l-2 1" />
      <path d="M16 7l1 1" />
      <circle cx="16" cy="12" r="1" />
      <circle cx="19" cy="6" r="1" />
    </svg>
  );
}

export function IconWave({ size = 24, color = "currentColor", ...props }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M2 12c2-3 4-5 6-5s4 4 6 4 4-4 6-4" />
      <path d="M2 17c2-3 4-5 6-5s4 4 6 4 4-4 6-4" />
    </svg>
  );
}

export function IconSprout({ size = 24, color = "currentColor", ...props }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M12 22V10" />
      <path d="M12 10c0-4 4-7 8-7-1 4-4 7-8 7z" />
      <path d="M12 14c0-3-3-6-7-6 1 4 3 6 7 6z" />
    </svg>
  );
}

export function IconCrown({ size = 24, color = "currentColor", ...props }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M3 18h18V9l-4 3-5-6-5 6-4-3v9z" />
      <path d="M3 18l1 2h16l1-2" />
    </svg>
  );
}

export function IconRefresh({ size = 24, color = "currentColor", ...props }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M4 12a8 8 0 0114-5.3L21 10" />
      <path d="M20 12a8 8 0 01-14 5.3L3 14" />
      <path d="M21 4v6h-6" />
      <path d="M3 20v-6h6" />
    </svg>
  );
}

export function IconSave({ size = 24, color = "currentColor", ...props }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h10l6 6v10a2 2 0 01-2 2z" />
      <path d="M7 3v5h8V3" />
      <path d="M7 21v-7h10v7" />
    </svg>
  );
}

export function IconThumbUp({ size = 24, color = "currentColor", ...props }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M7 22V11l3.5-7c.5-1 1.5-1 2 0l.5 3v4h6c1.1 0 2 1 1.8 2.1l-1.5 8c-.1.5-.5.9-1.3.9H7z" />
      <path d="M3 11h4v11H3z" />
    </svg>
  );
}

export function IconThumbDown({ size = 24, color = "currentColor", ...props }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M17 2v11l-3.5 7c-.5 1-1.5 1-2 0l-.5-3v-4H5c-1.1 0-2-1-1.8-2.1l1.5-8c.1-.5.5-.9 1.3-.9H17z" />
      <path d="M21 2h-4v11h4z" />
    </svg>
  );
}

export function IconHand({ size = 24, color = "currentColor", ...props }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M18 10V6a2 2 0 10-4 0" />
      <path d="M14 10V4a2 2 0 10-4 0v6" />
      <path d="M10 10V6a2 2 0 10-4 0v8c0 5 3 8 7 8h1c4 0 7-3 7-7v-3a2 2 0 10-4 0" />
    </svg>
  );
}

export function IconTarget({ size = 24, color = "currentColor", ...props }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="12" cy="12" r="1.5" />
    </svg>
  );
}

export function IconSparkle({ size = 24, color = "currentColor", ...props }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M12 2l1.5 6.5L20 10l-6.5 1.5L12 18l-1.5-6.5L4 10l6.5-1.5z" />
      <path d="M19 17l.7 2.3L22 20l-2.3.7L19 23l-.7-2.3L16 20l2.3-.7z" />
    </svg>
  );
}

export function IconDice({ size = 24, color = "currentColor", ...props }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="3" y="3" width="18" height="18" rx="3" />
      <circle cx="8" cy="8" r="1" fill={color} />
      <circle cx="16" cy="8" r="1" fill={color} />
      <circle cx="12" cy="12" r="1" fill={color} />
      <circle cx="8" cy="16" r="1" fill={color} />
      <circle cx="16" cy="16" r="1" fill={color} />
    </svg>
  );
}

export function IconClock({ size = 24, color = "currentColor", ...props }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 6v6l4 2" />
    </svg>
  );
}

export function IconWind({ size = 24, color = "currentColor", ...props }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M3 8h12a3 3 0 100-3" />
      <path d="M3 12h16a3 3 0 110 3" />
      <path d="M3 16h9a3 3 0 110 3" />
    </svg>
  );
}

export function IconOwl({ size = 24, color = "currentColor", ...props }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="12" cy="12" r="8" />
      <circle cx="9.5" cy="10.5" r="2" />
      <circle cx="14.5" cy="10.5" r="2" />
      <circle cx="9.5" cy="10.5" r="0.8" fill={color} />
      <circle cx="14.5" cy="10.5" r="0.8" fill={color} />
      <path d="M10 15l2-1 2 1" />
      <path d="M8 4l2 4" />
      <path d="M16 4l-2 4" />
    </svg>
  );
}

// Logo mark — a hand-drawn asterisk/star burst
export function IconLogoMark({ size = 24, color = "currentColor", ...props }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" {...props}>
      <path d="M12 3v18" />
      <path d="M3 12h18" />
      <path d="M5.5 5.5l13 13" />
      <path d="M18.5 5.5l-13 13" />
    </svg>
  );
}

// Dot indicator (recording, status)
export function IconDot({ size = 8, color = "currentColor", ...props }) {
  return (
    <svg width={size} height={size} viewBox="0 0 8 8" {...props}>
      <circle cx="4" cy="4" r="3.5" fill={color} />
    </svg>
  );
}

// Google 'G' Icon
export function IconGoogle({ size = 24, color = "currentColor", ...props }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M21.5 12.2c0-.8-.1-1.6-.2-2.2H12v4.4h5.4c-.2 1.4-.8 2.6-1.8 3.5v2.8h2.9c1.7-1.5 2.7-3.8 2.7-6.5z" />
      <path d="M12 22c2.7 0 4.9-.9 6.6-2.4l-2.9-2.8c-1 .6-2.2 1-3.6 1-2.8 0-5.1-1.9-6-4.4H3.1v2.9C4.8 19.8 8.1 22 12 22z" />
      <path d="M6 13.4c-.2-.6-.4-1.2-.4-1.9s.2-1.3.4-1.9V6.7H3.1C2.4 8.2 2 9.9 2 11.5s.4 3.3 1.1 4.8l2.9-2.9z" />
      <path d="M12 4.9c1.4 0 2.7.5 3.7 1.5l2.8-2.8C16.8 1.9 14.6 1 12 1 8.1 1 4.8 3.2 3.1 6.7l2.9 2.9c.9-2.6 3.2-4.7 6-4.7z" />
    </svg>
  );
}

// Trash Icon
export function IconTrash({ size = 24, color = "currentColor", ...props }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <polyline points="3 6 5 6 21 6"></polyline>
      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
    </svg>
  );
}
