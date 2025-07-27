import React from 'react';

const NotesDisplay = ({ notes }) => {
  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white p-6 rounded-xl shadow-md border border-gray-200">
      <h2 className="text-xl font-bold mb-4">📝 Summarized Notes</h2>
      <pre className="whitespace-pre-wrap text-gray-700">{notes}</pre>
    </div>
  );
};

export default NotesDisplay;
