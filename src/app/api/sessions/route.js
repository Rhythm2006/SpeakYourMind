import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import SpeakingSession from "@/lib/models/SpeakingSession";

export async function GET(request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");
    const limit = parseInt(searchParams.get("limit") || "20");

    const query = userId ? { userId } : {};
    const sessions = await SpeakingSession.find(query)
      .sort({ createdAt: -1 })
      .limit(limit);

    return NextResponse.json({ sessions });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    await connectDB();
    const body = await request.json();

    const session = await SpeakingSession.create({
      mode: body.mode,
      topic: body.topic,
      category: body.category,
      duration: body.duration,
      actualDuration: body.actualDuration,
      notes: body.notes || "",
      selfRating: body.selfRating,
      mood: body.mood,
      completed: body.completed || false,
      xpEarned: body.xpEarned || 0,
      userId: body.userId || null,
    });

    return NextResponse.json({ session }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
