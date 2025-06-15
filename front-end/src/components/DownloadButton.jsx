import React from 'react';

const DownloadButton = ({ selectedCount, handleDownload }) => (
  <div className="mt-6 flex items-center justify-between">
    <p className="text-lg">Selected: {selectedCount} images</p>
    <button
      onClick={handleDownload}
      disabled={selectedCount === 0}
      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:bg-gray-400"
    >
      Download ZIP
    </button>
  </div>
);

export default DownloadButton;