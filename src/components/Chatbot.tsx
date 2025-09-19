import { useEffect, useRef, useState } from "react";
import { X, MessageCircle } from "lucide-react";
import ChatForm from "./ChatForm";
import { type ChatMessageType } from "./ChatMessage";
import { fraInfo } from "../fraInfo";
import ReactMarkdown from "react-markdown";

type ApiMessage = {
  role: "user" | "bot" | "model" | "system";
  parts: { text: string }[];
};

const systemInstruction =
  `You are an FRA Atlas assistant. Answer in short, crisp form: maximum 2 sentences or at most 3 bullet points. Use plain language and be directly helpful. If a list is required, use a short Markdown list. Avoid long paragraphs.`;

/** Helpers to make replies short and keep Markdown balanced */
function shortenAndPreserveMarkdown(text: string, maxSentences = 2, maxListItems = 3) {
  if (!text) return text;

  // If it looks like a list, keep the header (if any) and first few list items
  const lines = text.split("\n").map((l) => l.replace(/\r/g, ""));
  const listStart = lines.findIndex((l) => /^\s*([-*]\s+|\d+\.\s+)/.test(l));
  if (listStart !== -1) {
    const header = lines.slice(0, listStart).join(" ").trim();
    const listItems = lines
      .slice(listStart)
      .filter((l) => /^\s*([-*]\s+|\d+\.\s+)/.test(l))
      .slice(0, maxListItems);
    const result = (header ? header + "\n\n" : "") + listItems.join("\n");
    return balanceMarkdown(result + (result.length < text.trim().length ? "\n\n…" : ""));
  }

  // Otherwise, split into sentence-like chunks (keeps punctuation)
  const sentenceRegex = /[^.!?\n]+[.!?\n]+|[^.!?\n]+$/g;
  const matches = text.match(sentenceRegex);
  if (!matches) {
    // fallback: character truncation
    const truncated = text.length > 300 ? text.slice(0, 300) + "…" : text;
    return balanceMarkdown(truncated);
  }
  const selected = matches.slice(0, maxSentences).join("").trim();
  const short = selected.length < text.trim().length ? selected + "…" : selected;
  return balanceMarkdown(short);
}

/** Make simple fixes to unbalanced Markdown markers (heuristic) */
function balanceMarkdown(md: string) {
  let out = md;

  // Ensure code fence triple backticks are balanced
  const tripleCount = (out.match(/```/g) || []).length;
  if (tripleCount % 2 === 1) out += "\n```";

  // Balance inline backticks (very simple heuristic)
  const backtickCount = (out.match(/`/g) || []).length;
  if (backtickCount % 2 === 1) out += "`";

  // Balance bold markers `**`
  const boldCount = (out.match(/\*\*/g) || []).length;
  if (boldCount % 2 === 1) out += "**";

  return out;
}

const Chatbot = () => {
  // keep fraInfo as hidden initial context (sent to API but not shown)
  const [chatHistory, setChatHistory] = useState<ChatMessageType[]>([
    { hideInChat: true, role: "model", text: fraInfo },
  ]);
  const [showChatbot, setShowChatbot] = useState(false);
  const chatBodyRef = useRef<HTMLDivElement | null>(null);

  const generateBotResponse = async (history: ChatMessageType[]) => {
    // Build API history: put system instruction first (sent only to API)
    const apiHistory: ApiMessage[] = [
      { role: "model", parts: [{ text: systemInstruction }] },
      // map your existing history (including fraInfo hidden context) to API format
      ...history.map(({ role, text }) => ({
        role: role as ApiMessage["role"],
        parts: [{ text }],
      })),
    ];

    // Insert a temporary "Thinking..." message in UI
    setChatHistory((prev) => [...prev, { role: "model", text: "Thinking..." }]);

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

      let rawReply =
        data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() ?? "⚠️ No reply";

      // Local safety: shorten and preserve Markdown
      const shortReply = shortenAndPreserveMarkdown(rawReply, 2, 3);

      // replace Thinking... with final reply
      setChatHistory((prev) => [
        ...prev.filter((msg) => msg.text !== "Thinking..."),
        { role: "model", text: shortReply },
      ]);
    } catch (err) {
      console.error("Chatbot fetch error:", err);
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
        aria-label="Toggle Chatbot"
      >
        {showChatbot ? <X size={20} /> : <MessageCircle size={20} />}
      </button>

      {/* Chat Window */}
      <div
        className={`fixed bottom-20 right-6 w-80 max-h-[75vh] flex flex-col bg-white rounded-2xl shadow-2xl z-[999] transform transition-all duration-300 ease-in-out ${
          showChatbot ? "translate-y-0 opacity-100" : "translate-y-24 opacity-0 pointer-events-none"
        }`}
      >
        {/* Header */}
        <div className="flex justify-between items-center px-4 py-3 bg-green-600 rounded-t-2xl text-white shadow-inner">
          <h2 className="text-md font-semibold">AI Chat</h2>
          <button
            onClick={() => setShowChatbot(false)}
            className="p-1 rounded-full hover:bg-green-500 transition"
            aria-label="Close Chatbot"
          >
            <X size={16} />
          </button>
        </div>

        {/* Body */}
        <div ref={chatBodyRef} className="flex-1 overflow-y-auto px-3 py-3 flex flex-col gap-3 bg-gray-50">
          {/* Static greeting */}
          <div className="flex items-start">
            <div className="bg-green-100 text-green-800 p-2 rounded-xl shadow-sm max-w-[75%] prose prose-sm">
              <ReactMarkdown>
                {"Hello! Ask me about the FRA 2006 Act, state-wise implementation, or specific queries. I will reply briefly."}
              </ReactMarkdown>
            </div>
          </div>

          {/* Chat messages (skip hidden context messages) */}
          {chatHistory
            .filter((m) => !m.hideInChat)
            .map((chat, idx) => (
              <div key={idx} className={`flex ${chat.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`p-2 rounded-xl shadow-sm max-w-[75%] break-words ${
                    chat.role === "user"
                      ? "bg-green-600 text-white rounded-br-none"
                      : "bg-green-100 text-green-800 rounded-bl-none"
                  }`}
                >
                  {chat.role === "model" ? (
                    <div className="prose prose-sm">
                      <ReactMarkdown>{chat.text}</ReactMarkdown>
                    </div>
                  ) : (
                    // user messages shown plainly (no markdown rendering for safety)
                    <div>{chat.text}</div>
                  )}
                </div>
              </div>
            ))}

          {/* ChatForm (keeps same API) */}
          <div className="mt-auto pt-2">
            <ChatForm chatHistory={chatHistory} setChatHistory={setChatHistory} generateBotResponse={generateBotResponse} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
