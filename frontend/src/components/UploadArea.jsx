import React from 'react';

const UploadArea = ({ inputText, setInputText }) => {
  const handleTextChange = (e) => {
    setInputText(e.target.value);
  };

  return (
    <div className="max-w-3xl mx-auto mb-6">
      <label className="block font-semibold mb-2">Paste Text:</label>
      <textarea
        value={inputText}
        onChange={handleTextChange}
        rows={8}
        placeholder="Paste lecture notes, articles, or any text here..."
        className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      {/* PDF upload (no backend yet) */}
      <div className="mt-4">
        <label className="block font-semibold mb-2">Or Upload PDF:</label>
        <input
          type="file"
          accept=".pdf"
          className="border border-gray-300 p-2 rounded-lg"
        />
        <p className="text-sm text-gray-500 mt-1">PDF support coming soon!</p>
      </div>
    </div>
  );
};

export default UploadArea;
