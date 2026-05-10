import "./globals.css";

export const metadata = {
  title: "SpeakYourMind — Find Your Voice, Own Your Words",
  description:
    "Transform your communication skills through interactive speaking challenges, debates, and opinion-based discussions. Build confidence, articulation, and critical thinking in a gamified social experience.",
  keywords: [
    "speaking practice",
    "communication skills",
    "debate",
    "public speaking",
    "confidence building",
    "articulation",
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
