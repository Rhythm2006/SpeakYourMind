import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const body = await request.json();
    const { transcript, topic, wpm, fillerCount } = body;

    if (!transcript || transcript.trim().length === 0) {
      return NextResponse.json({ error: "No transcript provided" }, { status: 400 });
    }

    if (!process.env.GROQ_API_KEY) {
      return NextResponse.json({ error: "Groq API key not configured" }, { status: 500 });
    }

    const systemPrompt = `You are an expert speech and communication coach. 
    Analyze the user's speech transcript based on the following:
    - Topic: "${topic}"
    - Average Words Per Minute (WPM): ${wpm}
    - Filler Words Used: ${fillerCount}
    
    Provide a concise, highly actionable evaluation formatted strictly in Markdown. Do not include pleasantries.
    Structure the report with these exact headers:
    ### 🎙️ Content Delivery
    (Critique their argument, relevance to the topic, and clarity of thought)
    
    ### 📊 Pacing & Habits
    (Analyze their WPM and filler word usage. Standard WPM is 130-160. Filler count > 5 is high.)
    
    ### 🚀 2 Things to Improve
    (Two specific, actionable tips for next time, using bullet points)`;

    const groqResponse = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: `Here is the transcript of what I said: "${transcript}"` }
        ],
        temperature: 0.7,
        max_tokens: 500,
      }),
    });

    if (!groqResponse.ok) {
      const errorText = await groqResponse.text();
      console.error("Groq Analysis API error:", errorText);
      return NextResponse.json({ error: "Failed to generate analysis" }, { status: groqResponse.status });
    }

    const data = await groqResponse.json();
    const report = data.choices[0].message.content;

    return NextResponse.json({ report });
  } catch (error) {
    console.error("Analysis generation error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
