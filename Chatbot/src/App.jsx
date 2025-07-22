import { useEffect, useRef, useState } from 'react';
import Header from './components/Header.jsx';
import Chatmessage from './components/Chatmessage.jsx';
import { formatTime } from '../utils/chatUtils.js';
import LoadingIndicator from './components/LoadingIndicator.jsx';
import ChatInput from './components/ChatInput.jsx';
import { generateContent } from './services/geminiApi.js';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello, how can I help you?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  const handleSendMessage = () => {
    if (!input.trim()) return;

    const userMessage = {
      id: Date.now().toString(),
      text: input,
      sender: "user",
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    generateContent(input)
      .then((responseText) => {
        const botMessage = {
          id: (Date.now() + 1).toString(),
          text: responseText,
          sender: "bot",
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, botMessage]);
      })
      .catch((error) => {
        const errorMessage = {
          id: (Date.now() + 2).toString(),
          text: "Something went wrong. Please try again later.",
          sender: "bot",
          timestamp: new Date(),
        };
        console.error("Gemini error:", error);
        setMessages((prev) => [...prev, errorMessage]);
      })
      .finally(() => setIsLoading(false));
  };

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className={`${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'} flex flex-col h-screen transition-colors duration-300`}>
      <Header toggleDarkMode={toggleDarkMode} darkMode={darkMode} />
      
      <main className="flex-1 overflow-y-auto p-4 md:p-6 max-w-3xl mx-auto w-full">
        {messages.map((message) => (
          <Chatmessage
            key={message.id}
            darkMode={darkMode}
            message={message}
            formatTime={formatTime}
          />
        ))}
        {isLoading && <LoadingIndicator darkMode={darkMode} />}
        <div ref={messagesEndRef} />
      </main>

      <ChatInput
        darkMode={darkMode}
        input={input}
        setInput={setInput}
        loading={isLoading}
        handleSendMessage={handleSendMessage}
      />
    </div>
  );
}

export default App;
