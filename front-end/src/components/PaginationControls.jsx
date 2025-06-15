import React from 'react';

const PaginationControls = ({ page, setPage }) => (
  <div className="mt-6 flex justify-between">
    <button
      onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
      disabled={page === 1}
      className="px-3 py-1 border rounded"
    >
      Prev
    </button>
    <span>Page {page}</span>
    <button
      onClick={() => setPage((prev) => prev + 1)}
      className="px-3 py-1 border rounded"
    >
      Next
    </button>
  </div>
);

export default PaginationControls;