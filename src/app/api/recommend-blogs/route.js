import { NextResponse } from "next/server";
import GlobalApi from "@/service/GlobalApi";

export const runtime = "nodejs";

export async function POST(req) {
  try {
    const { GoogleGenAI } = await import("@google/genai");
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "Missing Gemini API key" }, { status: 500 });
    }
    const ai = new GoogleGenAI({ apiKey });
    const { currentArticle } = await req.json();
    const resp = await GlobalApi.GetBlogs();
    const allBlogs = resp.data.data;

    // Remove the current article
    const candidateBlogs = allBlogs.filter(
      (blog) => blog.id !== currentArticle.id
    );

    // Prepare simplified data for AI
    const aiArticles = candidateBlogs.map((blog) => ({
      id: blog.id,
      title: blog.title,
      excerpt: blog.excerpt,
      tags: blog.tags?.map((t) => t.name).join(", "),
      categories: blog.categories?.map((c) => c.name).join(", "),
    }));

    // Build prompt
    const prompt = `
      Current article:
      Title: ${currentArticle.title}
      Excerpt: ${currentArticle.excerpt}
      Tags: ${currentArticle.tags?.map((t) => t.name).join(", ")}
      Categories: ${currentArticle.categories?.map((c) => c.name).join(", ")}

      Candidate articles:
      ${aiArticles
        .map(
          (a) =>
            `ID: ${a.id}, Title: ${a.title}, Excerpt: ${a.excerpt}, Tags: ${a.tags}, Categories: ${a.categories}`
        )
        .join("\n")}
          Suggest the 3 most related articles by their IDs, as a comma-separated list.
          `;

    const res = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      config: {
        systemInstruction: "You are a helpful assistant that suggests related blog articles by ID.",
        temperature: 0.7,
      },
    });

    const text = (res.text || "").trim();
    if (!text) {
      return NextResponse.json({ error: "No text from model" }, { status: 502 });
    }
    const idMatches = text.match(/\d+/g);
    const recommendedIds = idMatches ? idMatches.map(Number) : [];
    const recommendedArticles = allBlogs.filter(blog => recommendedIds.includes(blog.id));
    return NextResponse.json({ recommendedArticles });
  } catch (e) {
    console.error("Gemini API error:", e);
    return NextResponse.json({ error: "Failed to generate" }, { status: 500 });
  }
}
