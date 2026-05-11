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

import ClientProviders from "@/components/providers/ClientProviders";
import { IconLogoMark } from "@/components/ui/Icons";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ClientProviders>
          <div className="mobile-warning">
            <div className="mobile-warning-content">
              <IconLogoMark size={48} color="var(--accent-red)" />
              <h2>Desktop Optimized</h2>
              <p>SpeakYourMind is designed for laptops and desktops. Please open this link on a computer for the full experience.</p>
            </div>
          </div>
          <div className="desktop-app-wrapper">
            {children}
          </div>
        </ClientProviders>
      </body>
    </html>
  );
}
