import React, { useState } from "react";
import { SendHorizonal } from "lucide-react";
import Navbar from "./Navbar";

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { text: "Hi! I'm Neuro, your note assistant. How can I help?", sender: "bot" }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = () => {
    if (!input.trim() || isLoading) return;

    setIsLoading(true);
    const newMessages = [...messages, { text: input, sender: "user" }];
    setMessages(newMessages);
    setInput("");

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { text: "Got it! I'm generating notes now...", sender: "bot" }
      ]);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div 
      className="fixed inset-0 flex flex-col"
      style={{
        background: 'radial-gradient(125% 125% at 50% 10%, #000 40%, #63e 100%)'
      }}
    >
        <Navbar/>
      {/* Chat container with precise viewport sizing */}
      <div className="flex-1 flex flex-col w-full max-w-6xl mx-auto bg-white/5 backdrop-blur-lg rounded-xl border border-white/10 shadow-xl overflow-hidden my-4">
        {/* Chat Area - with precise height calculation */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3" style={{ maxHeight: 'calc(100vh - 180px)' }}>
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${
                msg.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`px-4 py-2 rounded-lg max-w-xs md:max-w-md ${
                  msg.sender === "user"
                    ? "bg-blue-600/80 text-white rounded-br-none"
                    : "bg-white/20 text-white rounded-bl-none"
                } backdrop-blur-sm`}
              >
                {msg.text}
              </div>
            </div>
          ))}
        </div>

        {/* Input Area - optimized for smooth transitions */}
        <div className="p-4 border-t border-white/10 bg-white/5 backdrop-blur-md">
          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Ask something..."
              className="flex-1 px-4 py-3 rounded-lg bg-white/10 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400/50 border border-white/10 transition-all duration-200"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || isLoading}
              className={`p-3 rounded-lg transition-all duration-300 ${
                isLoading 
                  ? 'bg-blue-700 cursor-not-allowed' 
                  : 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 shadow-lg shadow-blue-500/30'
              }`}
              aria-label="Send message"
            >
              {isLoading ? (
                <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                <SendHorizonal size={20} className="text-white" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;