import React from "react";
import { Bot } from "lucide-react";

function LoadingIndicator({ darkMode }) {
  const bubbleColor = darkMode ? "bg-gray-500" : "bg-indigo-400";

  return (
    <div className="flex justify-start px-4 mb-4">
      <div
        className={`
          flex items-center gap-3 px-4 py-2.5 rounded-2xl shadow-md max-w-[80%] md:max-w-[70%]
          ${darkMode
            ? "bg-gray-800 text-gray-100 border border-gray-700"
            : "bg-white text-gray-900 border border-gray-200"}
        `}
      >
        <Bot
          size={18}
          className={`${darkMode ? "text-indigo-400" : "text-indigo-600"}`}
        />
        <div className="flex gap-1.5">
          {[0, 100, 200].map((delay) => (
            <span
              key={delay}
              className={`w-2.5 h-2.5 rounded-full ${bubbleColor} animate-bounce`}
              style={{ animationDelay: `${delay}ms` }}
            ></span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default LoadingIndicator;
