import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    avatar: { type: String, default: "" },
    // Gamification
    level: { type: Number, default: 1 },
    xp: { type: Number, default: 0 },
    rank: { type: String, default: "Novice Speaker" },
    streak: { type: Number, default: 0 },
    longestStreak: { type: Number, default: 0 },
    lastSpeakDate: { type: Date },
    // Stats
    totalSessions: { type: Number, default: 0 },
    totalMinutesSpoken: { type: Number, default: 0 },
    quickSpeakCount: { type: Number, default: 0 },
    debateCount: { type: Number, default: 0 },
    opinionCount: { type: Number, default: 0 },
    // Badges
    badges: [
      {
        id: String,
        name: String,
        description: String,
        earnedAt: Date,
        icon: String,
      },
    ],
    // Preferences
    preferredCategories: [String],
    preferredDuration: { type: Number, default: 60 },
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model("User", UserSchema);
