// SearchBar.jsx
import React from 'react';

function SearchBar({ searchText, onSearch }) {
    return (
        <input
            type="text"
            placeholder="検索..."
            value={searchText}
            onChange={(e) => onSearch(e.target.value)}
            className="w-full px-3 py-2 mb-6 text-base border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
    );
}

export default SearchBar;
