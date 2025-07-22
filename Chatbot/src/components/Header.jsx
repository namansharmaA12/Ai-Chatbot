import React from 'react';
import { Sun, Moon, Sparkles } from 'lucide-react';

function Header({ darkMode, toggleDarkMode }) {
  return (
    <header
      className={`
        ${darkMode ? 'bg-gray-900 text-white border-b border-gray-700' : 'bg-white text-gray-900 border-b border-gray-200'}
        shadow-sm transition-colors duration-300
      `}
    >
      <div className="flex items-center justify-between max-w-4xl mx-auto px-4 py-4 md:px-6">
        {/* Left Section */}
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-full bg-gradient-to-tr from-purple-600 to-indigo-600">
            <Sparkles className="h-5 w-5 text-white" />
          </div>
          <h1 className="text-lg md:text-xl font-semibold tracking-wide">Intelligent Chat</h1>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1 text-sm font-medium">
            <Sparkles className={`${darkMode ? 'text-indigo-400' : 'text-indigo-600'} h-4 w-4`} />
            <span className={`${darkMode ? 'text-indigo-300' : 'text-indigo-700'}`}>
              AI Powered
            </span>
          </div>

          {/* Toggle Theme Button */}
          <button
            onClick={toggleDarkMode}
            className={`
              p-2 rounded-full transition-colors duration-300
              ${darkMode ? 'bg-gray-700 text-yellow-300' : 'bg-indigo-100 text-indigo-700'}
              hover:scale-105 hover:shadow-md
            `}
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
