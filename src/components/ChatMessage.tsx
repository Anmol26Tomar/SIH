import React from "react";
import ChatbotIcon from "./ChatbotIcon";

export type ChatMessageType = {
  role: "user" | "bot" | "model";
  text: string;
  hideInChat?: boolean;
};

type ChatMessageProps = {
  chat: ChatMessageType;
};

const ChatMessage: React.FC<ChatMessageProps> = ({ chat }) => {
  if (chat.hideInChat) return null;

  return (
    !chat.hideInChat && 
    <div className={`message ${chat.role === "model" ? "bot" : "user"}-message`}>
      {chat.role === "model" && <ChatbotIcon />}
      <p className="message-text">{chat.text}</p>
    </div>
  );
};

export default ChatMessage;
