import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const formData = await request.formData();
    const audioFile = formData.get("file");

    if (!audioFile) {
      return NextResponse.json({ error: "No audio file provided" }, { status: 400 });
    }

    if (!process.env.GROQ_API_KEY) {
      return NextResponse.json({ error: "Groq API key not configured" }, { status: 500 });
    }

    // Prepare form data for Groq
    const groqFormData = new FormData();
    groqFormData.append("file", audioFile);
    groqFormData.append("model", "whisper-large-v3-turbo");
    groqFormData.append("response_format", "json");
    groqFormData.append("language", "en");
    
    // Add a prompt with filler words to instruct Whisper NOT to filter them out
    groqFormData.append("prompt", "Umm, uh, like, literally, basically, so, you know.");

    const groqResponse = await fetch("https://api.groq.com/openai/v1/audio/transcriptions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
      },
      body: groqFormData,
    });

    if (!groqResponse.ok) {
      const errorText = await groqResponse.text();
      console.error("Groq API error:", errorText);
      return NextResponse.json({ error: "Failed to transcribe audio via Groq" }, { status: groqResponse.status });
    }

    const data = await groqResponse.json();
    return NextResponse.json({ text: data.text });
  } catch (error) {
    console.error("Speech transcription error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
