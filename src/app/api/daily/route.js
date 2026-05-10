import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const DAILY_API_KEY = process.env.DAILY_API_KEY;
    console.log("DAILY_API_KEY present:", !!DAILY_API_KEY);

    if (!DAILY_API_KEY) {
      return NextResponse.json({ error: "Missing Daily API Key" }, { status: 500 });
    }

    const response = await fetch("https://api.daily.co/v1/rooms", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${DAILY_API_KEY}`,
      },
      body: JSON.stringify({
        properties: {
          exp: Math.round(Date.now() / 1000) + 60 * 60, // Room expires in 1 hour
          enable_chat: true,
          start_audio_off: false,
          start_video_off: false,
        },
      }),
    });

    const room = await response.json();
    console.log("Daily response:", room);

    if (!response.ok) {
      return NextResponse.json({ error: room.info || "Failed to create room" }, { status: response.status });
    }

    return NextResponse.json({ url: room.url }, { status: 200 });
  } catch (error) {
    console.error("Daily API Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
