import React, { useState } from 'react';

import Banner from './Banner.jsx';

// import Logo from "../assets/logo.png"
import './colors.css';

const Home = () => {
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [notes, setNotes] = useState('');

  const handleGenerateNotes = () => {
    if (!inputText.trim()) {
      alert('Please paste text or upload PDF first.');
      return;
    }
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setNotes(`🔹 Summary 1\n🔹 Summary 2\n🔹 Summary 3`);
      setIsLoading(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen  px-4 py-12 text-gray-100">
    
      <Banner/>
    </div>
  );
};

export default Home;