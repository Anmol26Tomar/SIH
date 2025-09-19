import { useEffect, useRef, useState } from "react";
import { X, MessageCircle } from "lucide-react";
import ChatForm from "./ChatForm";
import { type ChatMessageType } from "./ChatMessage";
import { fraInfo } from "../fraInfo";
import ReactMarkdown from "react-markdown";

type ApiMessage = {
  role: "user" | "bot" | "model";
  parts: { text: string }[];
};

const Chatbot = () => {
  const [chatHistory, setChatHistory] = useState<ChatMessageType[]>([
    { role: "model", text: fraInfo, hideInChat: true }, // hidden context with instructions
  ]);
  const [showChatbot, setShowChatbot] = useState(false);
  const chatBodyRef = useRef<HTMLDivElement>(null);

  const generateBotResponse = async (history: ChatMessageType[]) => {
    const apiHistory: ApiMessage[] = history.map(({ role, text }) => ({
      role,
      parts: [{ text }],
    }));

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}?key=${import.meta.env.VITE_API_KEY}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ contents: apiHistory }),
        }
      );
      const data = await response.json();
      const botReply =
        data.candidates?.[0]?.content?.parts?.[0]?.text?.trim() ||
        "⚠️ No reply";

      setChatHistory((prev) => [
        ...prev.filter((msg) => msg.text !== "Thinking..."),
        { role: "model", text: botReply },
      ]);
    } catch (error) {
      console.error(error);
      setChatHistory((prev) => [
        ...prev.filter((msg) => msg.text !== "Thinking..."),
        { role: "model", text: "⚠️ Failed to fetch reply." },
      ]);
    }
  };

  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTo({
        top: chatBodyRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [chatHistory]);

  return (
    <div className="relative">
      {/* Toggle Button */}
      <button
        onClick={() => setShowChatbot((prev) => !prev)}
        className="fixed bottom-6 right-6 z-[1000] p-3 rounded-full bg-green-600 text-white shadow-lg hover:bg-green-700 transition-transform duration-200 transform hover:scale-105"
      >
        {showChatbot ? <X size={20} /> : <MessageCircle size={20} />}
      </button>

      {/* Chatbot Window */}
      <div
        className={`fixed bottom-20 right-6 w-80 max-h-[75vh] flex flex-col bg-white rounded-2xl shadow-2xl z-[999]
        transform transition-all duration-300 ease-in-out
        ${
          showChatbot
            ? "translate-y-0 opacity-100"
            : "translate-y-24 opacity-0 pointer-events-none"
        }`}
      >
        {/* Header */}
        <div className="flex justify-between items-center px-4 py-3 bg-green-600 rounded-t-2xl text-white shadow-inner">
          <h2 className="text-md font-semibold">AI Chat</h2>
          <button
            onClick={() => setShowChatbot(false)}
            className="p-1 rounded-full hover:bg-green-500 transition"
          >
            <X size={16} />
          </button>
        </div>

        {/* Chat Body */}
        <div
          ref={chatBodyRef}
          className="flex-1 overflow-y-auto px-3 py-3 flex flex-col gap-3 bg-gray-50"
        >
          {/* Initial Greeting */}
          <div className="flex items-start">
            <div className="bg-green-100 text-green-800 p-2 rounded-xl shadow-sm max-w-[75%]">
              👋 Hello! This is FRA Atlas AI chat support.
            </div>
          </div>

          {/* Chat Messages */}
          {chatHistory
            .filter((chat) => !chat.hideInChat)
            .map((chat, idx) => (
              <div
                key={idx}
                className={`flex ${
                  chat.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`p-2 rounded-xl shadow-sm max-w-[75%] break-words ${
                    chat.role === "user"
                      ? "bg-green-600 text-white rounded-br-none"
                      : "bg-green-100 text-green-800 rounded-bl-none prose prose-sm"
                  }`}
                >
                  <ReactMarkdown>{chat.text}</ReactMarkdown>
                </div>
              </div>
            ))}

          {/* Chat Form */}
          <div className="mt-auto pt-2">
            <ChatForm
              chatHistory={chatHistory}
              setChatHistory={setChatHistory}
              generateBotResponse={generateBotResponse}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
