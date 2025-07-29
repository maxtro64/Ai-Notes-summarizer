import React, { useEffect, useState } from 'react';
import { Code, Github, Linkedin, Twitter, MousePointerClick, Terminal, Cpu, Server } from 'lucide-react';

const About = () => {
  const [typedText, setTypedText] = useState('');
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const words = ['Developer', 'Coder', 'Problem Solver', 'Tech Enthusiast'];
  const [isDeleting, setIsDeleting] = useState(false);
  
  // Typewriter effect
  useEffect(() => {
    const typeSpeed = isDeleting ? 50 : 150;
    const currentWord = words[currentWordIndex];
    
    const timer = setTimeout(() => {
      if (isDeleting) {
        setTypedText(currentWord.substring(0, typedText.length - 1));
        if (typedText === '') {
          setIsDeleting(false);
          setCurrentWordIndex((prev) => (prev + 1) % words.length);
        }
      } else {
        setTypedText(currentWord.substring(0, typedText.length + 1));
        if (typedText === currentWord) {
          setTimeout(() => setIsDeleting(true), 1000);
        }
      }
    }, typeSpeed);

    return () => clearTimeout(timer);
  }, [typedText, currentWordIndex, isDeleting]);

  return (
    <div className="relative bg-gradient-to-r from-gray-900 to-gray-800 h-[calc(100vh-68px)] overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-10">
        {[...Array(20)].map((_, i) => (
          <div 
            key={i}
            className="absolute text-blue-400"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              fontSize: `${Math.random() * 20 + 10}px`,
              animation: `float ${Math.random() * 10 + 10}s linear infinite`,
              animationDelay: `${Math.random() * 5}s`
            }}
          >
            {['<', '/', '>', '{', '}', ';', '=', '()', '[]'].sort(() => 0.5 - Math.random())[0]}
          </div>
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center w-full">
          {/* Left column - Text content */}
          <div className="text-center md:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-4">
              Hi, I'm <span className="text-blue-400">Shivam Yadav</span>
            </h1>
            
            <div className="h-12 mb-6">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-300">
                {typedText}
                <span className="ml-1 animate-pulse">|</span>
              </h2>
            </div>
            
            <p className="text-lg text-gray-300 mb-8 max-w-lg mx-auto md:mx-0">
              Passionate about building innovative solutions and solving complex problems through code.
              Currently mastering full-stack development and competitive programming.
            </p>
            
            <div className="flex flex-wrap justify-center md:justify-start gap-4 mb-8">
              <a 
                href="https://github.com/maxtro64" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all transform hover:scale-105"
              >
                <Github className="h-5 w-5 mr-2" />
                GitHub
              </a>
              <a 
                href="https://www.linkedin.com/in/shivam-yadav-b87300294/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-all transform hover:scale-105"
              >
                <Linkedin className="h-5 w-5 mr-2" />
                LinkedIn
              </a>
              <a 
                href="https://leetcode.com/u/shivam2110207/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center px-6 py-3 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg transition-all transform hover:scale-105"
              >
                <Code className="h-5 w-5 mr-2" />
                LeetCode
              </a>
            </div>
          </div>

          {/* Right column - Visual elements */}
          <div className="relative hidden md:block">
            <div className="relative w-full h-64 md:h-96">
              {/* Floating cards */}
              <div className="absolute top-0 left-1/4 w-48 h-48 bg-blue-900/30 rounded-xl backdrop-blur-sm border border-blue-500/30 transform rotate-6 animate-float">
                <div className="p-4">
                  <Terminal className="h-8 w-8 text-blue-400 mb-2" />
                  <h3 className="text-white font-medium">150+ Problems</h3>
                  <p className="text-blue-200 text-sm">LeetCode Solved</p>
                </div>
              </div>
              
              <div className="absolute top-1/3 right-0 w-48 h-48 bg-purple-900/30 rounded-xl backdrop-blur-sm border border-purple-500/30 transform -rotate-6 animate-float-delay">
                <div className="p-4">
                  <Server className="h-8 w-8 text-purple-400 mb-2" />
                  <h3 className="text-white font-medium">8 Projects</h3>
                  <p className="text-purple-200 text-sm">GitHub Repos</p>
                </div>
              </div>
              
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-green-900/30 rounded-xl backdrop-blur-sm border border-green-500/30 transform rotate-12 animate-float-delay-2">
                <div className="p-4">
                  <Cpu className="h-8 w-8 text-green-400 mb-2" />
                  <h3 className="text-white font-medium">Full Stack</h3>
                  <p className="text-green-200 text-sm">MERN Developer</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CSS for animations */}
      <style jsx>{`
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
  );
};

export default About;