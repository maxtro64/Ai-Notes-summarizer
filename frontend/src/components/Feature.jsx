import React from 'react';
import { Bot, MessageSquare, Lock, User, BarChart2, ChevronRight, Sparkles, Smartphone, Zap, Shield } from 'lucide-react';

const FeaturesPage = () => {
  const features = [
    {
      icon: <Bot className="h-8 w-8 text-blue-500" />,
      title: "🤖 AI Chatbot",
      description: "Get responses powered by advanced AI (OpenAI/Gemini) based on your input.",
      details: [
        "State-of-the-art natural language processing",
        "Context-aware conversations",
        "Multi-turn dialogue support"
      ]
    },
    {
      icon: <MessageSquare className="h-8 w-8 text-purple-500" />,
      title: "📝 Custom Response Modes",
      description: "Choose how you want your responses:",
      modes: [
        { name: "Easy", emoji: "😊", desc: "Simple, straightforward answers" },
        { name: "Medium", emoji: "💡", desc: "Balanced detail and conciseness" },
        { name: "Detailed", emoji: "🔍", desc: "In-depth explanations" },
        { name: "WhatsApp-style", emoji: "💬", desc: "Fun & casual responses" }
      ]
    },
    {
      icon: <Lock className="h-8 w-8 text-green-500" />,
      title: "🔐 Authentication",
      description: "Sign up or log in to access your personalized chatbot space securely.",
      details: [
        "Email/password login",
        "Google OAuth integration",
        "JWT token security"
      ]
    },
    {
      icon: <User className="h-8 w-8 text-yellow-500" />,
      title: "👤 User Profile Dashboard",
      description: "View and manage your profile and preferences.",
      details: [
        "Personal information management",
        "Response style preferences",
        "Chat history settings"
      ]
    },
    {
      icon: <BarChart2 className="h-8 w-8 text-red-500" />,
      title: "📊 Activity Tracking (Optional)",
      description: "Keeps track of last activity for performance insights.",
      details: [
        "Usage statistics",
        "Response quality metrics",
        "Personalized improvement suggestions"
      ]
    }
  ];

  return (
    <div className="bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
            Powerful Features
          </h2>
          <p className="mt-4 max-w-2xl text-xl text-gray-600 dark:text-gray-300 mx-auto">
            Everything you need for an exceptional AI chat experience
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard 
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              modes={feature.modes}
              details={feature.details}
            />
          ))}
        </div>

        {/* Tech Highlights */}
        <div className="mt-20 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            Under the Hood
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <TechHighlight 
              icon={<Sparkles className="h-6 w-6 text-blue-500" />}
              title="Advanced AI"
              description="Gemini & OpenAI integration"
            />
            <TechHighlight 
              icon={<Smartphone className="h-6 w-6 text-purple-500" />}
              title="Responsive"
              description="Works on all devices"
            />
            <TechHighlight 
              icon={<Zap className="h-6 w-6 text-yellow-500" />}
              title="Fast"
              description="Optimized performance"
            />
            <TechHighlight 
              icon={<Shield className="h-6 w-6 text-green-500" />}
              title="Secure"
              description="Enterprise-grade security"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const FeatureCard = ({ icon, title, description, modes, details }) => {
  const [expanded, setExpanded] = React.useState(false);

  return (
    <div 
      className={`bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden border border-gray-200 dark:border-gray-700 transition-all duration-300 ${expanded ? 'md:col-span-2' : ''}`}
    >
      <div className="p-6">
        <div className="flex items-start">
          <div className="flex-shrink-0 bg-blue-50 dark:bg-gray-700 p-3 rounded-lg">
            {icon}
          </div>
          <div className="ml-4 flex-1">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">{title}</h3>
            <p className="mt-1 text-gray-600 dark:text-gray-300">{description}</p>
            
            {modes && (
              <div className="mt-4 grid grid-cols-2 gap-2">
                {modes.map((mode, i) => (
                  <div key={i} className="bg-gray-50 dark:bg-gray-700 p-2 rounded-lg">
                    <div className="flex items-center">
                      <span className="text-lg mr-2">{mode.emoji}</span>
                      <span className="font-medium text-gray-800 dark:text-white">{mode.name}</span>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{mode.desc}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {(details || expanded) && (
          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <ul className="space-y-2">
              {details?.map((detail, i) => (
                <li key={i} className="flex items-start">
                  <ChevronRight className="h-4 w-4 text-blue-500 mt-0.5 mr-2 flex-shrink-0" />
                  <span className="text-gray-700 dark:text-gray-300">{detail}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      
      {details && (
        <div 
          className="bg-gray-50 dark:bg-gray-700 px-6 py-3 text-center cursor-pointer"
          onClick={() => setExpanded(!expanded)}
        >
          <div className="flex items-center justify-center text-blue-600 dark:text-blue-400 font-medium">
            {expanded ? 'Show Less' : 'Learn More'}
          </div>
        </div>
      )}
    </div>
  );
};

const TechHighlight = ({ icon, title, description }) => {
  return (
    <div className="text-center">
      <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-700 mb-3">
        {icon}
      </div>
      <h4 className="text-lg font-medium text-gray-900 dark:text-white">{title}</h4>
      <p className="mt-1 text-gray-600 dark:text-gray-400">{description}</p>
    </div>
  );
};

export default FeaturesPage;