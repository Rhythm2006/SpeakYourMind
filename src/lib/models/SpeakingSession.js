import mongoose from "mongoose";

const SpeakingSessionSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    // Session info
    mode: {
      type: String,
      enum: ["quick-speak", "opinion-room", "debate"],
      required: true,
    },
    topic: { type: String, required: true },
    category: { type: String },
    duration: { type: Number, required: true }, // in seconds
    actualDuration: { type: Number }, // how long they actually spoke
    // Content
    notes: { type: String, default: "" },
    // For debate mode
    side: { type: String },
    opponentId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    // Rating & Feedback
    selfRating: { type: Number, min: 1, max: 5 },
    mood: { type: String },
    // XP earned
    xpEarned: { type: Number, default: 0 },
    completed: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.models.SpeakingSession ||
  mongoose.model("SpeakingSession", SpeakingSessionSchema);
