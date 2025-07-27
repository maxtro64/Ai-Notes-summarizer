import React, { useState } from 'react';
import UploadArea from './UploadArea';
import NotesDisplay from './NotesDisplay';
import Loader from './Loader';
import Logo from "../assets/logo.png"
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
      <div className="max-w-3xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          
           <img className='inline-flex items-center justify-center w-16 h-16  rounded-full mb-4' src={Logo} alt="" />
          
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-300 mb-3">
            AI Notes Generator
          </h1>
          <p className="text-lg text-gray-400">
            Transform lengthy content into concise, smart summaries
          </p>
        </div>

        {/* Main Content */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 shadow-xl border border-gray-700/50">
          <UploadArea inputText={inputText} setInputText={setInputText} />

          <div className="flex justify-center mt-6">
            <button
            onClick={handleGenerateNotes}
              type="button" class="text-white bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </span>
              ) : (
                'Generate Notes'
              )}
            </button>
          </div>
        </div>

        {/* Results Section */}
        <div className="mt-10 transition-all duration-500">
          {isLoading && <Loader />}
          {!isLoading && notes && (
            <div className="bg-gray-800/70 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 animate-fadeIn">
              <NotesDisplay notes={notes} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;