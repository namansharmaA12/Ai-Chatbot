import { User, Bot } from "lucide-react";
import React from "react";

const ChatMessage = ({ message, darkMode, formatTime }) => {
  if (!message) return null;

  const isUser = message.sender?.toLowerCase() === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} mb-4`}>
      <div
        className={`
          flex gap-3 px-4 py-3 rounded-2xl shadow-md transition-colors max-w-[80%] md:max-w-[70%]
          ${isUser
            ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white"
            : darkMode
              ? "bg-gray-800 text-gray-100 border border-gray-700"
              : "bg-white text-gray-900 border border-gray-200"}
        `}
      >
        {/* Avatar/Icon */}
        <div
          className={`pt-1 ${
            isUser
              ? "text-indigo-200"
              : darkMode
              ? "text-indigo-400"
              : "text-indigo-600"
          }`}
        >
          {isUser ? <User size={18} /> : <Bot size={18} />}
        </div>

        {/* Message Content */}
        <div className="flex flex-col">
          <span className="text-xs font-medium opacity-70 mb-1">
            {isUser ? "You" : "AI Assistant"} · {formatTime(message.timestamp)}
          </span>
          <p className="text-sm whitespace-pre-line leading-relaxed break-words">
            {message.text}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
