import React from 'react';

const SearchBar = ({ query, setQuery, fetchImages, perPage, setPerPage }) => (
  <div className="flex justify-between items-center mb-4">
    <input
      type="text"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      onKeyDown={(e) => e.key === 'Enter' && fetchImages()}
      placeholder="Search images..."
      className="border p-2 w-full mr-4 rounded shadow"
    />
    <select
      value={perPage}
      onChange={(e) => setPerPage(Number(e.target.value))}
      className="border p-2 rounded shadow"
    >
      {[5, 15, 25, 50, 100].map((n) => (
        <option key={n} value={n}>{n}</option>
      ))}
    </select>
  </div>
);

export default SearchBar;