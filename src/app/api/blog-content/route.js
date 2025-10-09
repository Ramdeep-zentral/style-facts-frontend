import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(req) {
  try {
    const { GoogleGenAI } = await import("@google/genai");
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "Missing Gemini API key" }, { status: 500 });
    }
    const ai = new GoogleGenAI({ apiKey });
    const { prompt, title } = await req.json();
    const finalPrompt =
      prompt ??
      [
        `Write a comprehensive blog post (500+ words) in Markdown about: "${title}".`,
        "",
        "Requirements:",
        "- Start with an H3 headline (the title).",
        "- Write a short, engaging introduction.",
        "- Use H4 headings for sections.",
        "- Use bullet points, bold text, and examples where helpful.",
        "- Add a conclusion with a call to action.",
        "- Use **bold** for important points.",
        "- Output only valid Markdown.",
      ].join("\n");

    // Log the prompt for debugging
    // console.log("Final prompt sent to Gemini:", finalPrompt);

    const res = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [{ role: "user", parts: [{ text: finalPrompt }] }],
      config: {
        systemInstruction: "You write concise, engaging SEO meta descriptions.",
        temperature: 0.7,
      },
    });

    const text = (res.text || "").trim();
    if (!text) {
      return NextResponse.json({ error: "No text from model" }, { status: 502 });
    }
    return NextResponse.json({ text });
  } catch (e) {
    console.error("Gemini API error:", e);
    return NextResponse.json({ error: "Failed to generate" }, { status: 500 });
  }
}
