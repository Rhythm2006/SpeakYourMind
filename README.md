<p align="center">
  <img src="https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js" />
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react" />
  <img src="https://img.shields.io/badge/Firebase-Auth%20%2B%20Firestore-FFCA28?style=for-the-badge&logo=firebase" />
  <img src="https://img.shields.io/badge/Groq-Whisper%20%2B%20LLaMA-F55036?style=for-the-badge" />
  <img src="https://img.shields.io/badge/ZegoCloud-Video-0055FF?style=for-the-badge" />
</p>

# 🎙️ SpeakYourMind

**Find Your Voice. Own Your Words.**

SpeakYourMind is a gamified communication skills platform that helps users become more confident, articulate speakers through interactive challenges, live debates, and AI-powered speech coaching — all wrapped in a beautiful, editorial-style interface.

---

## ✨ Features

### 🗣️ Quick Speak
Impromptu speaking practice with randomly generated prompts across 8 categories. Choose your timer (1–3 min), hit start, and speak your mind — no preparation allowed.

- **800+ unique prompts** across Fun, Deep, Ethical, Career, Philosophy, Debate, Relationships & Hypotheticals
- **Real-time AI transcription** powered by Groq's Whisper API
- **Live speech analytics** — WPM, filler word detection (um, uh, like), and a rolling transcript
- **AI Coach Report** — post-session analysis by LLaMA 3.3 70B covering content delivery, pacing, and actionable improvement tips

### 💬 Opinion Rooms
A social space to share perspectives on thought-provoking prompts.

- Browse prompts by category
- Post written opinions with your take
- React to others' opinions (Fire, Agree, Hmm, Love, Clap)
- Full CRUD — edit and delete your own opinions

### ⚔️ Debate Mode
Structured argumentation practice — solo or live with another person.

- **Solo Practice** — argue FOR and AGAINST the same topic across two timed rounds, building empathy and critical thinking
- **Live Lobbies** — host or join real-time video debates powered by ZegoCloud (1-on-1 video calls with screen sharing, chat, and mic/camera controls)
- Custom topic support for both modes

### 📊 Dashboard & Gamification
A full progression system to keep users engaged.

- **XP & Leveling** — earn XP for every session; climb from Novice → Legend across 8 ranks
- **Streak Tracking** — daily streak counter with longest-streak records
- **Badges** — 8 earnable achievements (First Words, Week Warrior, Night Owl, etc.)
- **Weekly Activity Chart** — visual breakdown of your speaking activity
- **Mode Breakdown** — see your Quick Speak vs. Debate vs. Opinion distribution
- **Session History** — full log of past sessions with ratings, XP earned, and duration

### 📝 Private Notes
Review personal reflections saved during Quick Speak sessions, organized by date, topic, and category.

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Framework** | Next.js 16 (App Router, Turbopack) |
| **Frontend** | React 19, CSS Modules, GSAP |
| **Auth** | Firebase Authentication (Email/Password + Google OAuth) |
| **Database** | Cloud Firestore (sessions, profiles, lobbies, opinions) |
| **Video** | ZegoCloud UIKit (1-on-1 video calls) |
| **Speech-to-Text** | Groq Whisper Large V3 Turbo |
| **AI Analysis** | Groq LLaMA 3.3 70B Versatile |
| **Legacy DB** | MongoDB Atlas + Mongoose (sessions API) |

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- A Firebase project (Auth + Firestore enabled)
- A [Groq API key](https://console.groq.com/keys) (free tier available)
- A [ZegoCloud](https://www.zegocloud.com/) account (for live video debates)

### 1. Clone the repository

```bash
git clone https://github.com/Rhythm2006/SpeakYourMind.git
cd SpeakYourMind
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env.local` file in the root directory:

```env
# MongoDB (for sessions API)
MONGODB_URI=your_mongodb_connection_string

# NextAuth
NEXTAUTH_SECRET=your-secret-key
NEXTAUTH_URL=http://localhost:3000

# Firebase Client Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# ZegoCloud (Live Video Debates)
NEXT_PUBLIC_ZEGO_APP_ID=your_zego_app_id
NEXT_PUBLIC_ZEGO_SERVER_SECRET=your_zego_server_secret

# Groq AI (Speech Transcription + Analysis)
GROQ_API_KEY=your_groq_api_key
```

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📁 Project Structure

```
src/
├── app/
│   ├── api/
│   │   ├── analysis/       # AI speech analysis (Groq LLaMA)
│   │   ├── sessions/       # Session CRUD (MongoDB)
│   │   ├── speech/          # Audio transcription (Groq Whisper)
│   │   └── topics/          # Topic/prompt API
│   ├── dashboard/           # User stats, badges, history
│   ├── debate/              # Solo + live debate mode
│   ├── login/               # Auth (email + Google)
│   ├── notes/               # Private session notes
│   ├── opinion-rooms/       # Social opinion sharing
│   ├── quick-speak/         # Timed speaking challenges + AI coach
│   ├── globals.css          # Design system & global styles
│   ├── layout.js            # Root layout with providers
│   └── page.js              # Landing page
├── components/
│   ├── debate/              # VideoRoom (ZegoCloud)
│   ├── landing/             # Landing page sections
│   ├── layout/              # Navbar, ProtectedRoute
│   ├── providers/           # AuthProvider wrapper
│   └── ui/                  # Icon library
├── context/
│   └── AuthContext.js       # Firebase auth state
└── lib/
    ├── auth.js              # Firebase auth helpers
    ├── firebase.js          # Firebase app init
    ├── firestore.js         # Firestore CRUD + gamification
    ├── mongodb.js           # MongoDB connection
    ├── topics.js             # 800+ speaking prompts
    └── models/              # Mongoose schemas
```

---

## 🎨 Design Philosophy

SpeakYourMind uses an **editorial, cream-toned aesthetic** inspired by premium publishing platforms:

- **Typography** — Serif headings (Instrument Serif), clean sans-serif body (Inter), and playful handwritten accents (Caveat)
- **Color Palette** — Warm cream backgrounds with carefully curated accent colors for each mode
- **Micro-animations** — Smooth transitions, hover effects, and animated UI feedback using CSS and GSAP
- **Responsive** — Fully responsive across desktop, tablet, and mobile

---

## 🤖 AI Pipeline

```
User speaks into mic
        ↓
MediaRecorder captures 4-second audio chunks
        ↓
Chunks sent to /api/speech → Groq Whisper API
        ↓
Live transcript + WPM + filler word count displayed
        ↓
On session end, user clicks "Get AI Analysis"
        ↓
Full transcript sent to /api/analysis → Groq LLaMA 3.3 70B
        ↓
Structured markdown report returned:
  • Content Delivery critique
  • Pacing & Habits analysis
  • 2 actionable improvement tips
```

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 🙏 Acknowledgments

- [Groq](https://groq.com/) — Lightning-fast AI inference for Whisper and LLaMA
- [Firebase](https://firebase.google.com/) — Authentication and real-time database
- [ZegoCloud](https://www.zegocloud.com/) — Video calling infrastructure
- [Next.js](https://nextjs.org/) — The React framework for production

---

<p align="center">
  <strong>Built with ❤️ to help people find their voice.</strong>
</p>
