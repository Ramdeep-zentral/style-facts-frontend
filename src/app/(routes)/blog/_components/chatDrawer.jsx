import { Button } from "@/components/ui/button";
import React, { useState } from "react";

const ChatDrawer = ({ isOpen, blogId }) => {
  const [messages, setMessages] = useState([
 
    {
      sender: "ai",
      text: "How I can assist you today?",
      time: "8:35 AM",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMessage = {
      sender: "user",
      text: input,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input, blogId }),
      });
      const data = await res.json();
      let aiText = data.answer || "Sorry, I couldn't understand.";
      // If recommendations, format as links
      if (data.type === "blog_recommendations" && Array.isArray(data.posts)) {
        aiText = (
          <div>
            <div>Recommended blog posts:</div>
            <ul>
              {data.posts.map((post) => (
                <li key={post.id}>
                  <a
                    href={post.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline"
                  >
                    {post.title}
                  </a>
                  {post.description && (
                    <div className="text-xs">{post.description}</div>
                  )}
                </li>
              ))}
            </ul>
          </div>
        );
      }
      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: aiText,
          time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: "Error connecting to AI.",
          time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ]);
    }
    setInput("");
    setLoading(false);
  };

  return (
    <div className={`${isOpen ? "block" : "hidden"}`}>
      {/* ...existing header code... */}
      <div className=" bg-white w-96 h-[500px] fixed top-24 right-5 overflow-scroll">
        <div className=" bg-black text-white p-2">
            <h4>Style•Facts AI Chat</h4>
            <Button variant="outline" size="sm" className="absolute top-2 right-2" onClick={() => {}}>X</Button>
            </div>
        
        <div className="flex flex-col justify-between h-[450px] w-full">
          <ul className="border-t border-gray-200 p-3 pb-6">
            {messages.map((msg, idx) => (
              <li
                key={idx}
                className={`flex flex-col py-2 items-${
                  msg.sender === "user" ? "end" : "start"
                }`}
              >
                <div className="text-right text-xs">{msg.time}</div>
                <div
                  className={`w-56 rounded-lg px-2 py-1 text-sm ${
                    msg.sender === "user"
                      ? "bg-black text-white"
                      : "bg-gray-100"
                  }`}
                >
                  {typeof msg.text === "string" ? msg.text : msg.text}
                </div>
              </li>
            ))}
            {loading && (
              <li className="flex flex-col items-start">
                <div className="flex w-fit items-center gap-1 rounded-lg bg-gray-100 px-2 py-2.5 text-sm">
                  <div className="size-2 rounded-full bg-gray-300"></div>
                  <div className="size-2 rounded-full bg-gray-400"></div>
                  <div className="size-2 rounded-full bg-gray-300"></div>
                </div>
              </li>
            )}
          </ul>
           <div className=" w-full">
          <div className="relative">
            <input
              type="text"
              placeholder="Reply"
              className="h-10 w-full rounded-b-lg border-t border-gray-200 bg-gray-100 pl-3 text-sm focus:outline-blue-600/50"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              disabled={loading}
            />
            <button
              className="absolute top-0 right-1 bottom-0 my-auto size-fit cursor-pointer rounded-full p-2 text-black hover:bg-gray-200 focus:bg-gray-200"
              onClick={sendMessage}
              disabled={loading}
            >
              {/* ...existing send icon... */}
            </button>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default ChatDrawer;
