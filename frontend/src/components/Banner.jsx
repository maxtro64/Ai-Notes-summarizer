import React, { useState, useEffect } from 'react';
import { Bot, ArrowRight, Sparkles, Zap } from 'lucide-react';


const Banner = () => {
  const [typedText, setTypedText] = useState('');
  const phrases = [
    "your AI assistant",
    "smart responses",
    "24/7 support",
    "conversational AI"
  ];
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const typeSpeed = isDeleting ? 50 : 150;
    const currentPhrase = phrases[currentPhraseIndex];

    const timer = setTimeout(() => {
      if (isDeleting) {
        setTypedText(currentPhrase.substring(0, typedText.length - 1));
        if (typedText === '') {
          setIsDeleting(false);
          setCurrentPhraseIndex((prev) => (prev + 1) % phrases.length);
        }
      } else {
        setTypedText(currentPhrase.substring(0, typedText.length + 1));
        if (typedText === currentPhrase) {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      }
    }, typeSpeed);

    return () => clearTimeout(timer);
  }, [typedText, currentPhraseIndex, isDeleting]);

  return (<>
      
    <div className=" my-32  h-screen overflow-hidden fixed inset-0">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-20">
        {[...Array(20)].map((_, i) => (
          <div 
            key={i}
            className="absolute text-purple-300/50"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              fontSize: `${Math.random() * 20 + 10}px`,
              animation: `float ${Math.random() * 10 + 10}s linear infinite`,
              animationDelay: `${Math.random() * 5}s`
            }}
          >
            {['</>', '{ }', 'AI', 'chat', 'bot', '??'].sort(() => 0.5 - Math.random())[0]}
          </div>
        ))}
      </div>

      <div className="absolute inset-0 flex items-start justify-center">
        <div className="max-w-7xl w-full px-4 sm:px-6 lg:px-8 py-12 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Left column - Text content */}
            <div className="text-center md:text-left">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-purple-900/30 backdrop-blur-sm text-purple-200 mb-6 border border-purple-500/30">
                <Sparkles className="h-5 w-5 mr-2" />
                <span>Introducing AI Chatbot</span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-4">
                Experience <span className="text-purple-300">Next-Gen</span> Conversations
              </h1>
              
              <div className="h-12 mb-6">
                <h2 className="text-2xl md:text-3xl font-bold text-purple-200">
                  {typedText}
                  <span className="ml-1 animate-pulse">|</span>
                </h2>
              </div>
              
              <p className="text-lg text-purple-100 mb-8 max-w-lg mx-auto md:mx-0">
                Our intelligent chatbot adapts to your style, providing responses that range from casual to technical with just a click.
              </p>
              
              <div className="flex flex-wrap justify-center md:justify-start gap-4">
                <a 
                  href="https://ai-notes-summarizer-6.onrender.com/chatbot" 
                  className="flex items-center px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-all hover:scale-105 shadow-lg hover:shadow-purple-500/30"
                >
                  Try It Now <ArrowRight className="h-5 w-5 ml-2" />
                </a>
                <a 
                  href="https://ai-notes-summarizer-6.onrender.com/features" 
                  className="flex items-center px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all hover:scale-105 backdrop-blur-sm border border-white/20"
                >
                  Explore Features
                </a>
              </div>
            </div>

            {/* Right column - Visual elements */}
            <div className="relative hidden md:block">
              <div className="relative w-full h-96">
                {/* Main chat bubble */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-900/20 backdrop-blur-sm rounded-3xl border border-purple-500/30 shadow-2xl animate-float">
                  <div className="absolute top-4 left-4 w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center">
                    <Bot className="h-6 w-6 text-white" />
                  </div>
                  <div className="absolute top-16 left-4 right-4 space-y-3">
                    <div className="bg-purple-800/30 rounded-lg p-3 w-3/4">
                      <p className="text-white text-sm">Hello! How can I help you today?</p>
                    </div>
                    <div className="bg-purple-600 rounded-lg p-3 w-3/4 ml-auto">
                      <p className="text-white text-sm">I need help with my code</p>
                    </div>
                    <div className="bg-purple-800/30 rounded-lg p-3 w-3/4">
                      <p className="text-white text-sm">Sure! What language are you using?</p>
                    </div>
                  </div>
                </div>

                {/* Response mode selector floating card */}
                <div className="absolute top-8 right-8 w-48 bg-purple-900/30 backdrop-blur-sm rounded-xl p-4 border border-purple-500/30 animate-float-delay">
                  <div className="flex items-center mb-2">
                    <Sparkles className="h-5 w-5 text-purple-300 mr-2" />
                    <h3 className="text-white font-medium">Response Style</h3>
                  </div>
                  <select className="w-full bg-purple-900/40 text-white text-sm rounded-lg p-2 border border-purple-500/30">
                    <option className="bg-purple-900">Casual</option>
                    <option className="bg-purple-900">Technical</option>
                    <option className="bg-purple-900">Detailed</option>
                    <option className="bg-purple-900">Simple</option>
                  </select>
                </div>

                {/* Stats floating card */}
                <div className="absolute bottom-8 left-8 w-48 bg-purple-900/30 backdrop-blur-sm rounded-xl p-4 border border-purple-500/30 animate-float-delay-2">
                  <div className="flex items-center mb-2">
                    <Zap className="h-5 w-5 text-yellow-300 mr-2" />
                    <h3 className="text-white font-medium">Powered By</h3>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    <span className="px-2 py-1 bg-purple-800/50 text-purple-200 rounded-full text-xs">Gemini AI</span>
                    <span className="px-2 py-1 bg-indigo-800/50 text-indigo-200 rounded-full text-xs">React</span>
                    <span className="px-2 py-1 bg-emerald-800/50 text-emerald-200 rounded-full text-xs">Node.js</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add this to your main CSS file instead */}
      <style jsx="true">{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(2deg); }
        }
        @keyframes float-delay {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(-3deg); }
        }
        @keyframes float-delay-2 {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-25px) rotate(5deg); }
        }
        .animate-float {
          animation: float 8s ease-in-out infinite;
        }
        .animate-float-delay {
          animation: float-delay 10s ease-in-out infinite;
        }
        .animate-float-delay-2 {
          animation: float-delay-2 12s ease-in-out infinite;
        }
      `}</style>
     
    </div>
     
    </>
  );
};

export default Banner;
