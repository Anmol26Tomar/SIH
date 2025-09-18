import { useRef } from "react";
import {type ChatMessageType} from "./ChatMessage";

type ChatFormProps = {
  chatHistory: ChatMessageType[];
  setChatHistory: React.Dispatch<React.SetStateAction<ChatMessageType[]>>;
  generateBotResponse: (updatedHistory: ChatMessageType[]) => void;
};

const ChatForm = ({
  chatHistory,
  setChatHistory,
  generateBotResponse,
}: ChatFormProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputRef.current) return;

    const userMessage = inputRef.current.value.trim();
    if (!userMessage) return;
    inputRef.current.value = "";

    // Add user message
    setChatHistory((history) => [
      ...history,
      { role: "user", text: userMessage },
    ]);

    // Add "Thinking..." bot message after a short delay
    setTimeout(() => {
      setChatHistory((history) => [
        ...history,
        { role: "model", text: "Thinking..." },
      ]);
      generateBotResponse([
        ...chatHistory,
        { role: "user", text: userMessage },
      ]);
    }, 600);
  };

  return (
    <form
      onSubmit={handleFormSubmit}
      className="flex items-center gap-2 px-3 py-2 border-t border-gray-200 bg-white rounded-xl shadow-sm"
    >
      <input
        ref={inputRef}
        type="text"
        placeholder="Type a message..."
        required
        className="flex-1 px-3 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400 transition placeholder-gray-400"
      />
      <button
        type="submit"
        className="bg-green-600 text-white p-2 rounded-full hover:bg-green-700 transition-transform duration-200 transform hover:scale-110"
      >
        Send
      </button>
    </form>
  );
};

export default ChatForm;
