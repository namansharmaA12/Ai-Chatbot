import { Send } from "lucide-react";
import React from "react";

function ChatInput({ darkMode, input, setInput, loading, handleSendMessage }) {
  return (
    <div
      className={`
        ${darkMode ? "bg-gray-900 border-t border-gray-700" : "bg-white border-t border-gray-200"}
        p-4 transition-colors duration-300
      `}
    >
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
            placeholder="Type your message..."
            className={`
              flex-1 px-5 py-3 rounded-full border text-sm transition-all duration-200
              ${darkMode 
                ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-indigo-500" 
                : "bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-indigo-500"}
              focus:outline-none focus:ring-2
            `}
          />
          <button
            onClick={handleSendMessage}
            disabled={loading || !input.trim()}
            className={`
              p-3 rounded-full transition-all duration-200
              ${loading || !input.trim()
                ? "bg-gray-400 cursor-not-allowed"
                : darkMode
                  ? "bg-indigo-600 hover:bg-indigo-500 text-white"
                  : "bg-indigo-100 hover:bg-indigo-200 text-indigo-700"}
              shadow-sm active:scale-95
            `}
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChatInput;
