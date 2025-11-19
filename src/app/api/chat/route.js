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
    const { message, blogId } = await req.json();
    const resp = await GlobalApi.GetBlogs();
    console.log("blog id:", blogId);
    const allBlogs = resp.data?.data || [];

    // Detect casual/general chat messages and route to Gemini
    const searchTerm = message.trim().toLowerCase();
    const casualPatterns = [
      /^how are you\??$/i,
      /^hello$/i,
      /^hi$/i,
      /^hey$/i,
      /^what's up\??$/i,
      /^who are you\??$/i,
      /^tell me about yourself\??$/i
    ];
    if (searchTerm && !blogId) {
      if (casualPatterns.some((pattern) => pattern.test(message.trim()))) {
        // Route casual/general chat to Gemini
        const prompt = `Question: ${message}`;
        const res = await ai.models.generateContent({
          model: "gemini-2.5-flash",
          contents: [{ role: "user", parts: [{ text: prompt }] }],
          config: {
            systemInstruction: "You are a helpful assistant that answers general questions.",
            temperature: 0.7,
          },
        });
        const aiAnswer = (res.text || "").trim();
        return NextResponse.json({ type: "text", answer: aiAnswer || "No answer found." });
      } else if (/latest blog posts?|recent blog posts?/i.test(message.trim())) {
        // Return latest blog posts sorted by publishedAt
        const sortedBlogs = [...allBlogs].sort((a, b) => {
          const dateA = new Date(a.publishedAt || a.createdAt || 0);
          const dateB = new Date(b.publishedAt || b.createdAt || 0);
          return dateB - dateA;
        });
        const latestBlogs = sortedBlogs.slice(0, 5); // Return top 5 latest
        return NextResponse.json({ type: "blog_recommendations", posts: latestBlogs });
      } else {
        // Keyword-based blog search for actual queries (match any keyword)
        const keywords = searchTerm.split(/\s+/).filter(Boolean);
        const recommendedArticles = allBlogs.filter(blog => {
          const fields = [
            blog.title,
            blog.excerpt,
            blog.content,
          ].join(" ").toLowerCase();
          // Match if any keyword is present
          return keywords.some(keyword => fields.includes(keyword));
        });
        console.log("Search keywords:", keywords);
        console.log("Recommended articles:", recommendedArticles);
        // Return blog posts if found, else a helpful message
        if (recommendedArticles.length > 0) {
          return NextResponse.json({ type: "blog_recommendations", posts: recommendedArticles });
        } else {
          return NextResponse.json({ type: "text", answer: "No matching blog posts found." });
        }
      }
    }

    // If asking a question about a specific blog post
    let blogContent = "";
    if (blogId) {
      const blog = allBlogs.find(b => b.id === blogId);
      if (blog) {
        blogContent = `${blog.title}\n${blog.excerpt}\n${blog.content || ""}`;
      }
    }

    // Build prompt for Gemini
      const prompt = blogContent
        ? `Blog Content:\n${blogContent}\n\nQuestion: ${message}`
      : `Question: ${message}`;

    const res = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      config: {
        systemInstruction: "You are a helpful assistant that answers questions based on blog content.",
        temperature: 0.7,
      },
    });

    const aiAnswer = (res.text || "").trim();
    return NextResponse.json({
      type: "text",
      answer: aiAnswer || "No answer found."
    });
  } catch (e) {
    console.error("Gemini API error:", e);
    return NextResponse.json({ error: "Failed to generate" }, { status: 500 });
  }
}