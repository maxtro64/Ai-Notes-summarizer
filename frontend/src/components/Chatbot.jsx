import React, { useState, useEffect, useRef } from "react";
import { SendHorizonal, ChevronDown, Sparkles, MessageSquare, Smartphone, Settings } from "lucide-react";
import Navbar from "./Navbar";
import { useAuth } from "./Appcontext";
import { toast } from "react-toastify";
import axios from "axios";

const Chatbot = () => {
  const { user, token, isAuthenticated, loading: authLoading } = useAuth();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showResponseTypes, setShowResponseTypes] = useState(false);
  const [showStyleSettings, setShowStyleSettings] = useState(false);
  const [responseSettings, setResponseSettings] = useState({
    complexity: "medium",
    style: "default",
    tone: "neutral"
  });
  const [chatStyle, setChatStyle] = useState("default");
  const messagesEndRef = useRef(null);

  const complexityTypes = [
    { id: "simple", label: "Easy", emoji: "😊" },
    { id: "medium", label: "Medium", emoji: "💡" },
    { id: "detailed", label: "Detailed", emoji: "🔍" }
  ];

  const styleTypes = [
    { id: "default", label: "Default", emoji: "📝" },
    { id: "whatsapp", label: "WhatsApp", emoji: "💬" },
    { id: "formal", label: "Formal", emoji: "👔" }
  ];

  const toneTypes = [
    { id: "neutral", label: "Neutral", emoji: "😐" },
    { id: "friendly", label: "Friendly", emoji: "😊" },
    { id: "humorous", label: "Humorous", emoji: "😂" }
  ];

  // Initialize chat
  useEffect(() => {
    if (isAuthenticated) {
      setMessages([{ 
        text: `Hi ${user.name}! How can I help you today?`, 
        sender: "bot",
        type: "text",
        timestamp: new Date()
      }]);
    } else {
      setMessages([{ 
        text: "Please login to access the chatbot", 
        sender: "bot",
        type: "text",
        timestamp: new Date()
      }]);
    }
  }, [isAuthenticated, user]);

  // Auto-scroll to newest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const formatResponse = (text) => {
    if (text.includes('*') && text.split('\n').length > 1) {
      const lines = text.split('\n');
      return {
        type: "bullets",
        content: lines.filter(line => line.trim().startsWith('*')).map(line => 
          line.replace(/^\*\s*/, '').trim()
        ),
        title: lines[0] || "Summary",
        timestamp: new Date()
      };
    }
    
    if (/\d+\./.test(text)) {
      const items = text.split('\n').filter(line => /^\d+\./.test(line));
      if (items.length > 1) {
        return {
          type: "numbered",
          content: items.map(item => item.replace(/^\d+\.\s*/, '').trim()),
          timestamp: new Date()
        };
      }
    }
    
    return {
      type: "text",
      content: text,
      timestamp: new Date()
    };
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading || !isAuthenticated) return;

    setIsLoading(true);
    const userMessage = { 
      text: input, 
      sender: "user",
      type: "text",
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);
    setInput("");

    try {
      const response = await axios.post('/api/notes/summarize', 
        { 
          text: input,
          ...responseSettings
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        }
      );

      const summary = response.data?.data?.summary || "I couldn't process that request.";
      const formattedResponse = formatResponse(summary);
      
      setMessages(prev => [...prev, {
        ...formattedResponse,
        sender: "bot"
      }]);

    } catch (error) {
      toast.error(error.message);
      setMessages(prev => [...prev, {
        text: error.response?.data?.error || error.message,
        sender: "bot",
        type: "error",
        timestamp: new Date()
      }]);
    } finally {
      setIsLoading(false);
      setShowResponseTypes(false);
      setShowStyleSettings(false);
    }
  };

  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const renderMessageContent = (message) => {
    switch (message.type) {
      case "bullets":
        return (
          <div className="space-y-1">
            {message.title && <p className="font-semibold">{message.title}</p>}
            <ul className="list-disc pl-5 space-y-1">
              {message.content.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        );
      case "numbered":
        return (
          <ol className="list-decimal pl-5 space-y-1">
            {message.content.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ol>
        );
      case "error":
        return <p className="text-red-300">{message.text}</p>;
      default:
        return <p>{message.text}</p>;
    }
  };

  const renderWhatsappMessage = (msg, i) => {
    const isUser = msg.sender === "user";
    return (
      <div key={i} className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
        <div className={`max-w-xs md:max-w-md rounded-lg px-3 py-2 relative ${
          isUser 
            ? "bg-green-100 text-gray-800 rounded-tr-none" 
            : "bg-white text-gray-800 rounded-tl-none"
        }`}>
          {renderMessageContent(msg)}
          <div className={`text-xs text-gray-500 mt-1 flex ${isUser ? 'justify-end' : 'justify-start'}`}>
            {formatTime(msg.timestamp)}
          </div>
          {isUser && (
            <div className="absolute -right-1.5 top-0">
              <div className="w-3 h-3 bg-green-100 transform rotate-45 origin-bottom-left"></div>
            </div>
          )}
          {!isUser && (
            <div className="absolute -left-1.5 top-0">
              <div className="w-3 h-3 bg-white transform rotate-45 origin-bottom-right"></div>
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderDefaultMessage = (msg, i) => {
    return (
      <div key={i} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
        <div className={`px-4 py-2 rounded-lg max-w-md ${
          msg.sender === "user"
            ? "bg-blue-600/80 text-white rounded-br-none"
            : msg.type === "error"
              ? "bg-red-500/80 text-white rounded-bl-none"
              : "bg-white/20 text-white rounded-bl-none"
        }`}>
          {renderMessageContent(msg)}
        </div>
      </div>
    );
  };

  if (authLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-black via-blue-900 to-purple-900">
        <div className="text-white text-lg">Authenticating...</div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 flex flex-col bg-gradient-to-br from-black via-blue-900 to-purple-900">
      <Navbar />

      <div className="flex-1 flex flex-col max-w-4xl w-full mx-auto my-4 rounded-xl border border-white/10 bg-white/5 backdrop-blur-md shadow-xl overflow-hidden">
        {/* Style selector */}
        <div className="flex border-b border-white/10">
          <button
            onClick={() => setChatStyle("default")}
            className={`flex-1 py-2 flex items-center justify-center gap-2 ${
              chatStyle === 'default' ? 'bg-blue-600/80 text-white' : 'bg-transparent text-white/70 hover:bg-white/5'
            }`}
          >
            <MessageSquare size={16} />
            <span>Default</span>
          </button>
          <button
            onClick={() => setChatStyle("whatsapp")}
            className={`flex-1 py-2 flex items-center justify-center gap-2 ${
              chatStyle === 'whatsapp' ? 'bg-green-600/80 text-white' : 'bg-transparent text-white/70 hover:bg-white/5'
            }`}
          >
            <Smartphone size={16} />
            <span>WhatsApp</span>
          </button>
        </div>

        {/* Chat area */}
        <div className={`flex-1 overflow-y-auto p-4 space-y-4 ${
          chatStyle === 'whatsapp' ? 'bg-[#e5ddd5]' : ''
        }`}>
          {messages.map((msg, i) => 
            chatStyle === 'whatsapp' ? renderWhatsappMessage(msg, i) : renderDefaultMessage(msg, i)
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input area */}
        <div className={`p-4 border-t ${
          chatStyle === 'whatsapp' ? 'bg-[#f0f0f0] border-gray-300' : 'border-white/10 bg-white/10'
        }`}>
          {/* Response settings display */}
          <div className={`text-xs mb-2 flex justify-between ${
            chatStyle === 'whatsapp' ? 'text-gray-600' : 'text-white/60'
          }`}>
            <div>
              Style: {styleTypes.find(t => t.id === responseSettings.style)?.label} • 
              Tone: {toneTypes.find(t => t.id === responseSettings.tone)?.label}
            </div>
            <div>
              Complexity: {complexityTypes.find(t => t.id === responseSettings.complexity)?.label}
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Settings button */}
            <div className="relative">
              <button
                onClick={() => setShowStyleSettings(!showStyleSettings)}
                className={`flex items-center gap-1 px-3 py-2 rounded-lg ${
                  chatStyle === 'whatsapp' 
                    ? 'bg-white text-gray-800 hover:bg-gray-200' 
                    : 'bg-white/10 text-white hover:bg-white/20'
                } transition-colors`}
              >
                <Settings size={16} />
              </button>
              
              {showStyleSettings && (
                <div className={`absolute bottom-full mb-2 left-0 rounded-lg shadow-lg z-10 w-64 overflow-hidden ${
                  chatStyle === 'whatsapp' ? 'bg-white text-gray-800' : 'bg-gray-800 text-white'
                }`}>
                  <div className="p-2 border-b">
                    <h3 className="font-semibold">Response Settings</h3>
                  </div>
                  
                  <div className="p-2 border-b">
                    <h4 className="text-xs font-medium mb-1">Complexity</h4>
                    <div className="flex gap-1">
                      {complexityTypes.map((type) => (
                        <button
                          key={type.id}
                          onClick={() => setResponseSettings(prev => ({
                            ...prev,
                            complexity: type.id
                          }))}
                          className={`text-xs px-2 py-1 rounded flex-1 flex items-center gap-1 ${
                            responseSettings.complexity === type.id 
                              ? chatStyle === 'whatsapp' ? 'bg-green-100' : 'bg-blue-600/80' 
                              : chatStyle === 'whatsapp' ? 'bg-gray-100' : 'bg-gray-700'
                          }`}
                        >
                          <span>{type.emoji}</span>
                          <span>{type.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div className="p-2 border-b">
                    <h4 className="text-xs font-medium mb-1">Style</h4>
                    <div className="flex gap-1">
                      {styleTypes.map((type) => (
                        <button
                          key={type.id}
                          onClick={() => setResponseSettings(prev => ({
                            ...prev,
                            style: type.id
                          }))}
                          className={`text-xs px-2 py-1 rounded flex-1 flex items-center gap-1 ${
                            responseSettings.style === type.id 
                              ? chatStyle === 'whatsapp' ? 'bg-green-100' : 'bg-blue-600/80' 
                              : chatStyle === 'whatsapp' ? 'bg-gray-100' : 'bg-gray-700'
                          }`}
                        >
                          <span>{type.emoji}</span>
                          <span>{type.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div className="p-2">
                    <h4 className="text-xs font-medium mb-1">Tone</h4>
                    <div className="flex gap-1">
                      {toneTypes.map((type) => (
                        <button
                          key={type.id}
                          onClick={() => setResponseSettings(prev => ({
                            ...prev,
                            tone: type.id
                          }))}
                          className={`text-xs px-2 py-1 rounded flex-1 flex items-center gap-1 ${
                            responseSettings.tone === type.id 
                              ? chatStyle === 'whatsapp' ? 'bg-green-100' : 'bg-blue-600/80' 
                              : chatStyle === 'whatsapp' ? 'bg-gray-100' : 'bg-gray-700'
                          }`}
                        >
                          <span>{type.emoji}</span>
                          <span>{type.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              disabled={isLoading || !isAuthenticated}
              placeholder={isAuthenticated ? "Type your message..." : "Please login to chat"}
              className={`flex-1 px-4 py-3 rounded-lg ${
                chatStyle === 'whatsapp'
                  ? 'bg-white text-gray-800 placeholder-gray-500 border border-gray-300'
                  : 'bg-white/10 text-white placeholder-white/50 border border-white/10'
              } focus:outline-none focus:ring-2 ${
                chatStyle === 'whatsapp' ? 'focus:ring-green-400/50' : 'focus:ring-blue-400/50'
              } disabled:opacity-50 transition-all`}
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || isLoading || !isAuthenticated}
              className={`p-3 rounded-lg transition-all ${
                isLoading || !isAuthenticated || !input.trim()
                  ? chatStyle === 'whatsapp' 
                    ? "bg-gray-300 cursor-not-allowed" 
                    : "bg-gray-600 cursor-not-allowed"
                  : chatStyle === 'whatsapp'
                    ? "bg-green-500 hover:bg-green-600 shadow-md"
                    : "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 shadow-md"
              }`}
            >
              {isLoading ? (
                <div className={`h-5 w-5 border-2 ${
                  chatStyle === 'whatsapp' ? 'border-gray-600' : 'border-white'
                } border-t-transparent rounded-full animate-spin`} />
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